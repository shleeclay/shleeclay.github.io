// Generates a 1200×630 Open Graph share banner (public/og-image.jpg).
//
// Composition: deep boreal-green gradient + honey-gold accents (site palette),
// name / title / focus on the left, circular profile photo with a gold ring on
// the right. English text only (avoids missing-Korean-font issues in librsvg).
//
// Run:  node scripts/make-og.mjs   (re-run whenever the profile photo changes)

import sharp from 'sharp';

const W = 1200, H = 630;
const PROFILE = 'public/profile.jpg';
const OUT = 'public/og-image.jpg';

// ── circular profile photo ──
const D = 408;                       // photo diameter
const CX = 952, CY = 314;            // photo centre on the canvas
const mask = Buffer.from(
  `<svg width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}"/></svg>`
);
const profile = await sharp(PROFILE)
  .resize(D, D, { fit: 'cover', position: 'top' })
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

// ── background + text ──
const bg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1a14"/>
      <stop offset="0.55" stop-color="#16291f"/>
      <stop offset="1" stop-color="#1e3a2f"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>

  <!-- subtle grid texture -->
  <g opacity="0.05" stroke="#ffffff" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${H}"/>`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<line x1="0" y1="${i * 100}" x2="${W}" y2="${i * 100}"/>`).join('')}
  </g>

  <!-- eyebrow + gold accent -->
  <text x="84" y="178" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="5" fill="#e0b941" font-weight="700">RESEARCH PORTFOLIO</text>
  <rect x="86" y="196" width="58" height="5" rx="2.5" fill="#e0b941"/>

  <!-- name -->
  <text x="82" y="276" font-family="Georgia, 'Times New Roman', serif" font-size="70" fill="#ffffff" font-weight="700">Seunghyeon Lee</text>
  <text x="86" y="318" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#9fb8aa" font-weight="600">Clay Lee</text>

  <!-- title + focus -->
  <text x="84" y="384" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#dbe6df">Ph.D. Researcher · Seoul National University</text>
  <text x="84" y="426" font-family="Arial, Helvetica, sans-serif" font-size="25" fill="#a9c6b5">Forest &amp; Urban Ecology · LiDAR / Remote Sensing / GIS</text>

  <!-- url -->
  <text x="84" y="552" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#e0b941" font-weight="600">drseunghyeonlee.com</text>

  <!-- ring around the photo -->
  <circle cx="${CX}" cy="${CY}" r="${D / 2 + 7}" fill="none" stroke="#e0b941" stroke-width="4" opacity="0.9"/>
</svg>`);

await sharp(bg)
  .composite([{ input: profile, left: Math.round(CX - D / 2), top: Math.round(CY - D / 2) }])
  .jpeg({ quality: 90 })
  .toFile(OUT);

console.log(`[make-og] wrote ${OUT} (${W}x${H})`);
