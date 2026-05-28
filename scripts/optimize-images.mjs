// Image optimizer — runs before `astro build`.
// Converts cover / certificate images to WebP and downscales to a web size.
//
// Why WebP: best text-edge preservation for the journal-cover / figure mix,
// ~25-35% smaller than JPG at equal quality. Cards display ~290px wide, so a
// pre-scaled 800px WebP gives a clean ~2x downsample → crisp text + small files.
//
// Behavior:
//   - Scans public/papers/covers/, public/patents/certificates/, public/books/covers/
//   - JPG/PNG/JPEG → converted to .webp (original deleted), resized to <= TARGET_WIDTH, sharpened
//   - Existing .webp → re-encoded only if wider than TARGET_WIDTH (or --force)
//   - The card components map cover paths to ".webp" automatically, so site.json
//     can keep any extension (e.g. ".jpg") — the served file will be ".webp".
//   - No-op if sharp not installed (graceful)

import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';

// Target width — sized for HiDPI/Retina (cards display ~290px → 2x = 580px).
const TARGET_WIDTH = 800;
// High quality + max effort. Text/line-art docs (certificates) develop
// mosquito-noise on edges at lower quality, so keep this high.
const WEBP_QUALITY = 95;
const WEBP_EFFORT  = 6;

// NOTE: post-resize sharpen was REMOVED. On high-contrast text/line documents
// (e.g. patent certificates) it over-sharpened edges, which then froze into
// compression artifacts under WebP. Lanczos downscale (sharp default) is clean
// enough on its own.

// --force re-encodes images even when already .webp and within TARGET_WIDTH.
const FORCE = process.argv.includes('--force');

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\//, '');
const DIRS = [
  'public/papers/covers',
  'public/patents/certificates',
  'public/books/covers',
];

const CONVERTIBLE = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('[optimize-images] sharp not available — skipping.');
    return;
  }

  let converted = 0;
  let resized   = 0;
  let skipped   = 0;

  for (const dir of DIRS) {
    const abs = join(ROOT, dir);
    let files;
    try {
      files = await readdir(abs);
    } catch {
      continue; // directory missing
    }

    for (const name of files) {
      const ext = extname(name).toLowerCase();
      if (!CONVERTIBLE.has(ext)) continue;

      const filePath = join(abs, name);
      const st = await stat(filePath);
      if (!st.isFile()) continue;

      const isWebp = ext === '.webp';

      try {
        const meta = await sharp(filePath).metadata();
        const needsResize = !!meta.width && meta.width > TARGET_WIDTH;

        // Already-webp + small enough + not forced → leave it
        if (isWebp && !needsResize && !FORCE) {
          skipped++;
          continue;
        }

        const webpPath = filePath.replace(/\.(jpe?g|png|webp)$/i, '.webp');
        const tmpPath  = webpPath + '.tmp';

        let pipeline = sharp(filePath);
        if (needsResize) {
          pipeline = pipeline.resize({ width: TARGET_WIDTH, withoutEnlargement: true });
        }

        await pipeline.webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT }).toFile(tmpPath);
        await rename(tmpPath, webpPath);

        // Remove the original source if it wasn't already the .webp we just wrote
        if (filePath !== webpPath) {
          await unlink(filePath);
        }

        const newMeta = await sharp(webpPath).metadata();
        if (isWebp) {
          console.log(`  ${dir}/${name}  ${meta.width}px → ${newMeta.width}px (webp)`);
          resized++;
        } else {
          console.log(`  ${dir}/${name} → ${name.replace(/\.(jpe?g|png)$/i, '.webp')}  ${meta.width}px → ${newMeta.width}px`);
          converted++;
        }
      } catch (err) {
        console.warn(`  ⚠ failed: ${dir}/${name} — ${err.message}`);
      }
    }
  }

  console.log(`[optimize-images] done — ${converted} converted to webp, ${resized} webp resized, ${skipped} already optimized.`);
}

main().catch((err) => {
  console.error('[optimize-images] error:', err);
  process.exit(0); // never fail the build because of optimization
});
