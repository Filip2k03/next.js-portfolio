import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Rendered at build time so social previews match the site without a stored bitmap.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #08090b 0%, #14171b 60%, #1b1f24 100%)',
          color: '#ecebe7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, letterSpacing: 6, color: '#c8a56b' }}>
          <span>THU YA KYAW</span>
          <span>PORTFOLIO / 2026</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
            BUILDING THE SYSTEMS BEHIND AMBITIOUS PRODUCTS.
          </div>
          <div style={{ fontSize: 26, letterSpacing: 4, color: '#9a9b98' }}>CTO · SYSTEMS ARCHITECT · PRODUCT ENGINEER</div>
        </div>
        <div style={{ height: 2, width: '100%', background: 'linear-gradient(90deg, #c8a56b, transparent)' }} />
      </div>
    ),
    size,
  );
}
