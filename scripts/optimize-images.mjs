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

// Target width — sized for HiDPI/Retina (cards display ~290px wide → 2x = 580px).
// 800 leaves margin for larger viewports while staying close to display size,
// which minimises browser downsampling and keeps text edges crisp.
const TARGET_WIDTH = 800;
const JPG_QUALITY  = 95;
const PNG_COMPRESSION = 9;

// Stronger sharpen to compensate for downsampling softness on text.
// sigma 1.0 produces visibly crisper text edges, m2 set lower to enhance
// jagged-area sharpness (text strokes) without too much halo on photos.
const SHARPEN_SIGMA = 1.0;
const SHARPEN_M1    = 0.5;
const SHARPEN_M2    = 2.5;

// --force re-processes images even when they're already at/under TARGET_WIDTH.
// Use after changing TARGET_WIDTH/sharpen settings to apply new parameters.
const FORCE = process.argv.includes('--force');

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

        if (!FORCE && (!meta.width || meta.width <= TARGET_WIDTH)) {
          skipped++;
          continue;
        }

        // Resize (preserving aspect ratio) + sharpen for text crispness,
        // then write to temp + rename to be safe
        const tmpPath = filePath + '.tmp';
        const pipeline = sharp(filePath)
          .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
          .sharpen({ sigma: SHARPEN_SIGMA, m1: SHARPEN_M1, m2: SHARPEN_M2 });

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
