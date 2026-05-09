import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/metadata';

export const runtime = 'edge';
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a2a1a 0%, #0f1f0f 60%, #162416 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: '#65A30D',
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 56, color: '#fff', fontWeight: 700 }}>JU</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#65A30D',
            letterSpacing: '-1px',
            marginBottom: 16,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#d1d5db',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Travel diaries, adventures and tips from around the world
        </div>
      </div>
    ),
    { ...size }
  );
}
