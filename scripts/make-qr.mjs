// QR code generator — creates KR / EN QR codes as SVG + PNG.
//
// QR codes point to the /go (KR) and /go-en (EN) redirect pages, NOT directly
// to the final URLs. The redirect destination lives in site.json → qrTargets,
// so printed QR codes stay valid even if the destination changes later.
//
// Run:  npm run qr
// Output: public/qr/qr_kr.svg, qr_kr.png, qr_en.svg, qr_en.png

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\//, '');
const OUT  = join(ROOT, 'public/qr');
const SITE = 'https://drseunghyeonlee.com';

// QR points to redirect pages (permanent), not final URLs.
const TARGETS = [
  { name: 'qr_kr', url: `${SITE}/go` },
  { name: 'qr_en', url: `${SITE}/go-en` },
];

// Brand colors — carbon green on transparent/white. High error correction (H)
// so the QR stays scannable even with a bit of print wear or a center logo.
const OPTS = {
  errorCorrectionLevel: 'H',
  margin: 2,
  color: { dark: '#1e3a2f', light: '#ffffff' },
};
const PNG_OPTS = { ...OPTS, width: 1024 };

async function main() {
  let QRCode;
  try {
    QRCode = (await import('qrcode')).default;
  } catch {
    console.error('[make-qr] qrcode not installed. Run: npm install --save-dev qrcode');
    process.exit(1);
  }

  await mkdir(OUT, { recursive: true });

  for (const t of TARGETS) {
    const svg = await QRCode.toString(t.url, { ...OPTS, type: 'svg' });
    await writeFile(join(OUT, `${t.name}.svg`), svg, 'utf8');

    const pngBuf = await QRCode.toBuffer(t.url, { ...PNG_OPTS, type: 'png' });
    await writeFile(join(OUT, `${t.name}.png`), pngBuf);

    console.log(`  ${t.name}  → ${t.url}  (svg + png 1024px)`);
  }
  console.log('[make-qr] done — public/qr/');
}

main().catch((err) => { console.error('[make-qr] error:', err); process.exit(1); });
