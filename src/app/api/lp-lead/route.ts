import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { appendToSheet, getESTTimestamp } from "@/lib/googleSheets";

const RECIPIENT_EMAIL = "adilayroofing@gmail.com";

// Base64-encoded logo-red.png — embedded so it works on Vercel serverless
const LOGO_BASE64 = "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";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      service,
      zipCode,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      gclid,
      landingPage,
      message,
      source,
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !service || !zipCode) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Build UTM info string for email
    const utmInfo = [
      utm_source && `Source: ${utm_source}`,
      utm_medium && `Medium: ${utm_medium}`,
      utm_campaign && `Campaign: ${utm_campaign}`,
      utm_content && `Content: ${utm_content}`,
      utm_term && `Term: ${utm_term}`,
      gclid && `GCLID: ${gclid}`,
    ]
      .filter(Boolean)
      .join(" | ");

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ffffff; padding: 24px 24px 16px; text-align: center; border-bottom: 1px solid #e0e0e0;">
          <img src="cid:adilay-logo" alt="Adilay Roofing" width="200" style="display: inline-block; max-width: 200px; height: auto;" />
        </div>
        <div style="background-color: #E43A27; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Landing Page Lead</h1>
          <p style="color: #ffffff; margin: 8px 0 0; font-size: 14px; opacity: 0.9;">From: ${landingPage || "Landing Page"}</p>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 140px; vertical-align: top;">Full Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Service Needed:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Zip Code:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${zipCode}</td>
            </tr>
            ${
              message
                ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Additional Info:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${message}</td>
            </tr>`
                : ""
            }
            ${
              source
                ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top; color: #888;">Lead Source:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #888; font-size: 12px;">${source}</td>
            </tr>`
                : ""
            }
            ${
              utmInfo
                ? `<tr>
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top; color: #888;">Campaign Info:</td>
              <td style="padding: 10px 0; color: #888; font-size: 12px;">${utmInfo}</td>
            </tr>`
                : ""
            }
          </table>
        </div>
        <div style="padding: 15px; text-align: center; color: #888; font-size: 12px;">
          This lead was submitted from a Google Ads landing page on the Adilay Roofing website.
        </div>
      </div>
    `;

    const text = `
NEW LANDING PAGE LEAD
============================
Landing Page: ${landingPage || "Unknown"}
Full Name: ${name}
Phone: ${phone}
Email: ${email}
Service Needed: ${service}
Zip Code: ${zipCode}
${message ? `Additional Info: ${message}` : ""}
${source ? `Lead Source: ${source}` : ""}
${utmInfo ? `Campaign Info: ${utmInfo}` : ""}
============================
Submitted from Adilay Roofing Google Ads landing page.
    `.trim();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Adilay Roofing Website" <${process.env.SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `🔥 New ${source === "meta-ads" ? "Meta Ads" : "LP"} Lead: ${name} — ${service} (${zipCode})`,
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

    // Append to Google Sheet — lp/roof-replacement tab for all LP leads
    // Columns: Lead ID, Timestamp, Name, Email, Phone, Service Needed, Zip Code, Source
    const estTimestamp = getESTTimestamp();
    await appendToSheet("lp/roof-replacement", [
      estTimestamp,
      name,
      email,
      phone,
      service,
      zipCode,
      landingPage || "Landing Page",
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("LP lead form error:", error);
    return NextResponse.json(
      {
        error:
          "Failed to submit. Please try again or call us directly at (267) 255-3620.",
      },
      { status: 500 }
    );
  }
}
