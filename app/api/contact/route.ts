import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// 5 submissions per IP per hour. Resets on server restart (acceptable for a
// contact form — prevents spam without needing Redis/Upstash).
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const prev = rateLimitStore.get(ip) ?? [];
  const recent = prev.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent); // keep pruned list
    return false; // blocked
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return true; // allowed
}

// Prune stale entries every 30 min to keep memory bounded
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitStore.entries()) {
    const fresh = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (fresh.length === 0) {
      rateLimitStore.delete(ip);
    } else {
      rateLimitStore.set(ip, fresh);
    }
  }
}, 30 * 60 * 1000);

// ─────────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // ── Rate limit check ──────────────────────────────────────────────────────
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please wait an hour before trying again.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, company, roles, description, referral, formType } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Determine form type label
    let formTypeLabel = 'General Inquiry';
    if (formType === 'hire-only') formTypeLabel = 'Hire-Only Request';
    if (formType === 'hire-manage') formTypeLabel = 'Hire + Manage Request';
    if (formType === 'training') formTypeLabel = 'Training Program Inquiry';

    // Email HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #248B93 0%, #1A5538 100%); color: white; padding: 24px 30px; border-radius: 8px 8px 0 0; }
            .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
            .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.85; }
            .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .field { margin-bottom: 18px; }
            .field-label { font-weight: 700; color: #1f2937; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
            .field-value { color: #374151; font-size: 15px; background: white; padding: 10px 14px; border-radius: 6px; border: 1px solid #e5e7eb; }
            .field-value a { color: #248B93; text-decoration: none; }
            .badge { display: inline-block; background: #248B93; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
            .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Lead — Remote ACKtive</h2>
              <p>Someone submitted the contact form on remoteacktive.com</p>
            </div>
            <div class="content">
              <div class="badge">${formTypeLabel}</div>

              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${name}</div>
              </div>

              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>

              ${company ? `
              <div class="field">
                <div class="field-label">Company</div>
                <div class="field-value">${company}</div>
              </div>
              ` : ''}

              ${roles ? `
              <div class="field">
                <div class="field-label">Role(s) to Fill</div>
                <div class="field-value">${roles}</div>
              </div>
              ` : ''}

              ${description ? `
              <div class="field">
                <div class="field-label">Message / Description</div>
                <div class="field-value">${description.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}

              ${referral ? `
              <div class="field">
                <div class="field-label">How They Heard About Us</div>
                <div class="field-value">${referral}</div>
              </div>
              ` : ''}

              <div class="footer">
                <p>Remote ACKtive · remoteacktive.com · admin@remoteacktive.com</p>
                <p>Submitted: ${new Date().toLocaleString('en-US', {
                  timeZone: 'America/Chicago',
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: 'Remote ACKtive <admin@remoteacktive.com>',
      to: ['admin@remoteacktive.com'],
      replyTo: email,
      subject: `🔔 New ${formTypeLabel} from ${name}`,
      html: htmlContent,
      text: `
New ${formTypeLabel} — Remote ACKtive

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${roles ? `Role(s): ${roles}` : ''}
${description ? `Message: ${description}` : ''}
${referral ? `Referral Source: ${referral}` : ''}

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or contact us directly at admin@remoteacktive.com' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly at admin@remoteacktive.com' },
      { status: 500 }
    );
  }
}
