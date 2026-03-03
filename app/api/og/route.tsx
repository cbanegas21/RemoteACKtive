import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A1628',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px',
          position: 'relative',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Background gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #0D1F35 0%, #0F1926 55%, #0A2020 100%)',
            display: 'flex',
          }}
        />

        {/* Decorative globe ring - large */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -180,
            width: 600,
            height: 600,
            borderRadius: '50%',
            border: '1px solid rgba(87, 197, 207, 0.12)',
            display: 'flex',
          }}
        />
        {/* Decorative globe ring - medium */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 440,
            height: 440,
            borderRadius: '50%',
            border: '1px solid rgba(87, 197, 207, 0.18)',
            display: 'flex',
          }}
        />
        {/* Decorative globe ring - small */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            right: -20,
            width: 280,
            height: 280,
            borderRadius: '50%',
            border: '1px solid rgba(87, 197, 207, 0.25)',
            display: 'flex',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: 'linear-gradient(90deg, #57C5CF 0%, #378B57 50%, #4FFFB0 100%)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Badge pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(87, 197, 207, 0.1)',
              border: '1px solid rgba(87, 197, 207, 0.35)',
              borderRadius: 30,
              padding: '8px 22px',
              marginBottom: 36,
              width: 'fit-content',
            }}
          >
            <span
              style={{
                color: '#57C5CF',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              REMOTE STAFFING &amp; OUTSOURCING
            </span>
          </div>

          {/* Brand name */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
            <span
              style={{
                color: 'white',
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: -1,
              }}
            >
              Remote ACKtive
            </span>
            <span
              style={{
                color: '#57C5CF',
                fontSize: 34,
                fontWeight: 600,
                marginTop: 14,
                letterSpacing: 0.5,
              }}
            >
              Elite Global Talent
            </span>
          </div>

          {/* Tagline */}
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.68)',
              fontSize: 22,
              lineHeight: 1.55,
              marginBottom: 52,
              maxWidth: 680,
            }}
          >
            Stop overpaying for talent. Get U.S.-quality work at 70% less — same skill level, zero compromise.
          </span>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 56 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#4FFFB0', fontSize: 42, fontWeight: 800, lineHeight: 1 }}>
                70%
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginTop: 6 }}>
                Cost Savings
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#4FFFB0', fontSize: 42, fontWeight: 800, lineHeight: 1 }}>
                3–10
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginTop: 6 }}>
                Days to Hire
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#4FFFB0', fontSize: 42, fontWeight: 800, lineHeight: 1 }}>
                18+
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginTop: 6 }}>
                Countries
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#4FFFB0', fontSize: 42, fontWeight: 800, lineHeight: 1 }}>
                500+
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginTop: 6 }}>
                Placements
              </span>
            </div>
          </div>
        </div>

        {/* Bottom domain watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 80,
            display: 'flex',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 17 }}>
            remoteacktive.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
