// Image optimizer — runs before `astro build`.
// Downscales large cover / certificate images to a sensible web size.
//
// Why: high-resolution (2K+) JPG/PNG covers look blurry when displayed in
// small (~290px) cards because the browser performs fractional-ratio
// downsampling that destroys text edges. A pre-scaled image (~1200px) lets
// the browser do at most a clean ~2x downsample → crisp text.
//
// Behavior:
//   - Scans public/papers/covers/, public/patents/certificates/, public/books/covers/
//   - For images wider than TARGET_WIDTH, resizes in-place to TARGET_WIDTH
//   - Uses Lanczos resampling (sharp default) + sets quality 90 for JPG
//   - Idempotent: images already at or below TARGET_WIDTH are skipped
//   - No-op if sharp not installed (graceful)

import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const TARGET_WIDTH = 1200;
const JPG_QUALITY  = 90;
const PNG_COMPRESSION = 8;     // sharp 0..9 (higher = smaller, slower)

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\//, '');
const DIRS = [
  'public/papers/covers',
  'public/patents/certificates',
  'public/books/covers',
];

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('[optimize-images] sharp not available — skipping.');
    return;
  }

  let processed = 0;
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
      if (!SUPPORTED.has(ext)) continue;

      const filePath = join(abs, name);
      const st = await stat(filePath);
      if (!st.isFile()) continue;

      try {
        const img = sharp(filePath);
        const meta = await img.metadata();

        if (!meta.width || meta.width <= TARGET_WIDTH) {
          skipped++;
          continue;
        }

        // Resize (preserving aspect ratio), then write to temp + rename to be safe
        const tmpPath = filePath + '.tmp';
        const pipeline = sharp(filePath).resize({ width: TARGET_WIDTH, withoutEnlargement: true });

        if (ext === '.jpg' || ext === '.jpeg') {
          await pipeline.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(tmpPath);
        } else if (ext === '.png') {
          await pipeline.png({ compressionLevel: PNG_COMPRESSION }).toFile(tmpPath);
        } else if (ext === '.webp') {
          await pipeline.webp({ quality: JPG_QUALITY }).toFile(tmpPath);
        } else {
          await pipeline.toFile(tmpPath);
        }

        // Replace original with optimized
        const { rename } = await import('node:fs/promises');
        await rename(tmpPath, filePath);

        const newMeta = await sharp(filePath).metadata();
        console.log(`  ${dir}/${name}  ${meta.width}px → ${newMeta.width}px`);
        processed++;
      } catch (err) {
        console.warn(`  ⚠ failed: ${dir}/${name} — ${err.message}`);
      }
    }
  }

  console.log(`[optimize-images] done — ${processed} resized, ${skipped} already optimized.`);
}

main().catch((err) => {
  console.error('[optimize-images] error:', err);
  process.exit(0); // never fail the build because of optimization
});
