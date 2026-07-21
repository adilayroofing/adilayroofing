import nodemailer from "nodemailer";
import { appendToSheet, getESTTimestamp } from "@/lib/googleSheets";
import { LOGO_BASE64 } from "@/lib/emailLogo";

const RECIPIENT_EMAIL = "adilayroofing@gmail.com";

export interface ContactLead {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  financingInterested?: boolean;
  /** Where the lead came from — written to the sheet's source column */
  source: "Contact Form" | "AI Chat";
}

/**
 * Sends the notification email and appends the lead to the "Contact Leads"
 * sheet using the exact same column mapping as the contact form:
 * [LeadID(auto), Timestamp, Name, Email, Phone, Service, Message, Source, Financing]
 */
export async function submitContactLead(lead: ContactLead) {
  const { name, email, phone, service, message, financingInterested, source } =
    lead;

  const heading =
    source === "AI Chat" ? "New AI Chat Lead" : "New Contact Form Submission";
  const footerNote =
    source === "AI Chat"
      ? "This lead was captured by the Adilay Roofing website AI chat assistant."
      : "This lead was submitted from the Adilay Roofing website contact form.";
  const subject =
    source === "AI Chat"
      ? `New AI Chat Lead: ${name} — ${service}`
      : `New Contact Form: ${name} — ${service}`;

  // Build the email HTML
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #ffffff; padding: 24px 24px 16px; text-align: center; border-bottom: 1px solid #e0e0e0;">
        <img src="cid:adilay-logo" alt="Adilay Roofing" width="200" style="display: inline-block; max-width: 200px; height: auto;" />
      </div>
      <div style="background-color: #C41E1E; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">${heading}</h1>
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
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; white-space: pre-wrap;">${message}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Financing Interest:</td>
            <td style="padding: 10px 0;">${financingInterested ? '<span style="color: #C41E1E; font-weight: bold;">Yes — Interested in Financing</span>' : "No"}</td>
          </tr>
        </table>
      </div>
      <div style="padding: 15px; text-align: center; color: #888; font-size: 12px;">
        ${footerNote}
      </div>
    </div>
  `;

  // Plain text fallback
  const text = `
${heading.toUpperCase()}
============================
Full Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service Needed: ${service}
Message: ${message}
============================
${footerNote}
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

  // Send email with embedded logo
  await transporter.sendMail({
    from: `"Adilay Roofing Website" <${process.env.SMTP_USER}>`,
    to: RECIPIENT_EMAIL,
    replyTo: email,
    subject,
    text,
    html,
    attachments: [
      {
        filename: "logo-red.png",
        content: Buffer.from(LOGO_BASE64, "base64"),
        cid: "adilay-logo",
      },
    ],
  });

  // Append to Google Sheet (non-blocking — email is primary)
  await appendToSheet("Contact Leads", [
    getESTTimestamp(),
    name,
    email,
    phone || "Not provided",
    service,
    message,
    source,
    financingInterested ? "Yes" : "No",
  ]);
}
