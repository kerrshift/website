import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { Buffer } from 'node:buffer';

export const GET: APIRoute = async () => {
  // Pure Black, Box-Free, Editorial Studio OG Image (1200x630)
  // Deep obsidian background (#060608) with subtle neon atmospheric bloom and pure typography
  // 1. Crisp vector overlay with semi-transparent dark overlay and pure studio typography
  const typographySvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <!-- Transparent black scrim overlay across the gradient for optimal text contrast -->
      <rect width="1200" height="630" fill="#060608" fill-opacity="0.55" />

      <!-- Top Row: Minimal Studio Header Coordinates -->
      <g transform="translate(100, 110)">
        <text font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="24" font-weight="500" fill="#ffffff" letter-spacing="-0.5">KerrShift</text>
        <text x="115" y="-1" font-family="monospace, -apple-system, sans-serif" font-size="14" fill="#a1a1aa">/ studio</text>
        
        <!-- Right side: Founder Signal -->
        <text x="1000" y="0" text-anchor="end" font-family="monospace, -apple-system, sans-serif" font-size="13" fill="#e4e4e7" letter-spacing="1.5">
          SAHIL GANGURDE &#x2022; LOSTMARTIAN.IN
        </text>
      </g>

      <!-- Center Hero: Editorial Pure Typography (Box-Free) -->
      <g transform="translate(100, 275)">
        <!-- Overline -->
        <text font-family="monospace, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#d4d4d8" letter-spacing="3">
          AI &amp; SOFTWARE ENGINEERING STUDIO
        </text>

        <!-- Main Studio Statement -->
        <text y="75" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="58" font-weight="400" fill="#ffffff" letter-spacing="-2">
          Something is shifting in the quiet.
        </text>

        <!-- Subtitle -->
        <text y="135" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="23" font-weight="350" fill="#e4e4e7" letter-spacing="-0.3">
          Architecting production systems, intelligent web applications, and autonomous primitives.
        </text>
      </g>

      <!-- Bottom Baseline: Pure Inline Proof & Coordinates (No Boxes) -->
      <g transform="translate(100, 520)">
        <line x1="0" y1="-30" x2="1000" y2="-30" stroke="#ffffff" stroke-opacity="0.18" stroke-width="1.2" />

        <!-- Left: Flagship Product Citation -->
        <text font-family="monospace, -apple-system, sans-serif" font-size="13" fill="#d4d4d8" letter-spacing="1">
          CREATOR OF <tspan fill="#ffffff" font-weight="600">AGENTDIFF</tspan> &#x2022; TRAJECTORY VERIFICATION ENGINE
        </text>

        <!-- Right: Domain Identifier -->
        <text x="1000" y="0" text-anchor="end" font-family="monospace, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#ffffff" letter-spacing="1">
          kerrshift.com
        </text>
      </g>
    </svg>
  `;

  // 2. High-dynamic-range color mesh base rendered at half scale and heavily blurred by libvips (zero color rings)
  const colorMeshSvg = `
    <svg width="600" height="315" viewBox="0 0 600 315" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="315" fill="#07070a" />
      <circle cx="140" cy="110" r="130" fill="#00FF87" opacity="0.35" />
      <circle cx="260" cy="90" r="140" fill="#60EFFF" opacity="0.30" />
      <circle cx="420" cy="230" r="160" fill="#FF007F" opacity="0.25" />
      <circle cx="510" cy="190" r="140" fill="#FF5E00" opacity="0.22" />
    </svg>
  `;

  // 3. Native raster blur pipeline in Sharp: eliminates all SVG 8-bit banding artifacts
  const blurredBackground = await sharp(Buffer.from(colorMeshSvg, 'utf-8'))
    .resize(1200, 630, { fit: 'fill', kernel: 'lanczos3' })
    .blur(75)
    .toBuffer();

  // 4. Composite crisp typography on top of silky-smooth blurred background
  const finalImage = await sharp(blurredBackground)
    .composite([
      {
        input: Buffer.from(typographySvg, 'utf-8'),
        top: 0,
        left: 0
      }
    ])
    .png({ quality: 100, compressionLevel: 6 })
    .toBuffer();

  return new Response(new Uint8Array(finalImage), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
};
