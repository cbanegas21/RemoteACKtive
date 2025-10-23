import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType = "general" } = body;

    // Create transporter using SendGrid SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let subject = "";
    let htmlContent = "";
    let textContent = "";

    // Generate email content based on form type
    if (formType === "hire-only") {
      const { name, email, company, role, description, referral } = body;
      
      subject = `🎯 Hire-Only Request from ${name}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Hire-Only Service Request</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Role(s) Needed:</strong> ${role}</p>
            <p><strong>Description:</strong></p>
            <p style="white-space: pre-wrap;">${description}</p>
            <p><strong>Referral Source:</strong> ${referral || "Not specified"}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This is a Hire-Only service request.</p>
        </div>
      `;
      textContent = `
New Hire-Only Service Request

Name: ${name}
Email: ${email}
Company: ${company}
Role(s) Needed: ${role}
Description: ${description}
Referral Source: ${referral || "Not specified"}
      `;
    } else if (formType === "hire-manage") {
      const {
        name,
        email,
        company,
        role,
        description,
        hasTools,
        tools,
        timezone,
        teamSize,
        startDate,
        budget,
        referral,
      } = body;

      subject = `🚀 Hire+Manage Request from ${name}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #9333ea;">New Hire+Manage Service Request</h2>
          <div style="background-color: #faf5ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #9333ea; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company}</p>
            
            <h3 style="color: #9333ea; margin-top: 20px;">Role Details</h3>
            <p><strong>Role(s) Needed:</strong> ${role}</p>
            <p><strong>Description:</strong></p>
            <p style="white-space: pre-wrap;">${description}</p>
            
            <h3 style="color: #9333ea; margin-top: 20px;">Operational Details</h3>
            <p><strong>Has Tools:</strong> ${hasTools}</p>
            ${tools ? `<p><strong>Tools Used:</strong> ${tools}</p>` : ""}
            <p><strong>Preferred Timezone:</strong> ${timezone}</p>
            ${teamSize ? `<p><strong>Team Size:</strong> ${teamSize}</p>` : ""}
            ${startDate ? `<p><strong>Desired Start Date:</strong> ${startDate}</p>` : ""}
            ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ""}
            <p><strong>Referral Source:</strong> ${referral || "Not specified"}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This is a Hire+Manage service request (full service).</p>
        </div>
      `;
      textContent = `
New Hire+Manage Service Request

CONTACT INFORMATION
Name: ${name}
Email: ${email}
Company: ${company}

ROLE DETAILS
Role(s) Needed: ${role}
Description: ${description}

OPERATIONAL DETAILS
Has Tools: ${hasTools}
${tools ? `Tools Used: ${tools}` : ""}
Preferred Timezone: ${timezone}
${teamSize ? `Team Size: ${teamSize}` : ""}
${startDate ? `Desired Start Date: ${startDate}` : ""}
${budget ? `Budget Range: ${budget}` : ""}
Referral Source: ${referral || "Not specified"}
      `;
    } else {
      // General contact form
      const { name, email, company, roles, description, referral } = body;
      
      subject = `💬 General Contact from ${name}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">New General Contact Form Submission</h2>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company || "Not provided"}</p>
            <p><strong>Role(s) to Fill:</strong> ${roles}</p>
            <p><strong>Description:</strong></p>
            <p style="white-space: pre-wrap;">${description}</p>
            <p><strong>Referral Source:</strong> ${referral || "Not specified"}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This is a general inquiry.</p>
        </div>
      `;
      textContent = `
New General Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Role(s) to Fill: ${roles}
Description: ${description}
Referral Source: ${referral || "Not specified"}
      `;
    }

    // Email options
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_TO_SALES,
      subject,
      html: htmlContent,
      text: textContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: String(error) },
      { status: 500 }
    );
  }
}