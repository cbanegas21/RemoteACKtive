import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
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

    // Create transporter with your SendGrid SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Determine form type for subject
    let formTypeLabel = 'General Inquiry';
    if (formType === 'hire-only') formTypeLabel = 'Hire-Only Request';
    if (formType === 'hire-manage') formTypeLabel = 'Hire + Manage Request';

    // Email HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .field-label { font-weight: bold; color: #1f2937; margin-bottom: 5px; }
            .field-value { color: #4b5563; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New ${formTypeLabel}</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Name:</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${company ? `
              <div class="field">
                <div class="field-label">Company:</div>
                <div class="field-value">${company}</div>
              </div>
              ` : ''}
              
              ${roles ? `
              <div class="field">
                <div class="field-label">Role(s) to Fill:</div>
                <div class="field-value">${roles}</div>
              </div>
              ` : ''}
              
              ${description ? `
              <div class="field">
                <div class="field-label">Description:</div>
                <div class="field-value">${description.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
              
              ${referral ? `
              <div class="field">
                <div class="field-label">How they heard about us:</div>
                <div class="field-value">${referral}</div>
              </div>
              ` : ''}
              
              <div class="footer">
                <p>This email was sent from the Remote ACKtive contact form.</p>
                <p>Submitted on: ${new Date().toLocaleString('en-US', { 
                  timeZone: 'America/Chicago',
                  dateStyle: 'full',
                  timeStyle: 'long'
                })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_TO_SALES,
      replyTo: email,
      subject: `New ${formTypeLabel} from ${name}`,
      html: htmlContent,
      text: `
New ${formTypeLabel}

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${roles ? `Role(s): ${roles}` : ''}
${description ? `Description: ${description}` : ''}
${referral ? `Referral Source: ${referral}` : ''}
      `.trim(),
    });

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