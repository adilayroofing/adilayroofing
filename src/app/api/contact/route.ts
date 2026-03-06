import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "adilayroofing@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Build the email HTML
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1B1B2F; padding: 24px; text-align: center;">
          <img src="https://www.adilayroofing.com/images/logo.png" alt="Adilay Roofing" width="180" style="display: inline-block; max-width: 180px; height: auto;" />
        </div>
        <div style="background-color: #C41E1E; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 140px; vertical-align: top;">Full Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Service Needed:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 15px; text-align: center; color: #888; font-size: 12px;">
          This lead was submitted from the Adilay Roofing website contact form.
        </div>
      </div>
    `;

    // Plain text fallback
    const text = `
NEW CONTACT FORM SUBMISSION
============================
Full Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service Needed: ${service}
Message: ${message}
============================
Submitted from Adilay Roofing website.
    `.trim();

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Adilay Roofing Website" <${process.env.SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form: ${name} — ${service}`,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
