import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "adilayroofing@gmail.com";

// Base64-encoded logo-red.png — embedded so it works on Vercel serverless
// (public/ files are served by CDN, not available on the filesystem)
const LOGO_BASE64 = "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";

export async function POST(request: Request) {
  console.log(">>> Quote API hit from:", request.headers.get("user-agent")?.substring(0, 50));
  try {
    const body = await request.json();
    const {
      serviceArea: rawServiceArea,
      customServiceArea,
      propertyType,
      projectType,
      servicesNeeded,
      timeline,
      squareFootage,
      stories,
      knownIssues,
      fullName,
      phone,
      email,
      preferredContact,
    } = body;

    const serviceArea = rawServiceArea === "Other" ? (customServiceArea || "Other") : rawServiceArea;

    // Validate required fields
    if (!fullName || !phone || !email || !serviceArea || !propertyType || !projectType || !timeline || !preferredContact) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!servicesNeeded || servicesNeeded.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one service." },
        { status: 400 }
      );
    }

    // Format labels for readability
    const projectTypeLabel: Record<string, string> = {
      replace: "Roof Replacement",
      repair: "Roof Repair",
      "new-construction": "New Construction",
    };

    const serviceLabels: Record<string, string> = {
      "shingle-roofing": "Shingle Roofing",
      "flat-roofing": "Flat Roofing",
      siding: "Siding",
      windows: "Windows",
      gutters: "Gutters",
    };

    const timelineLabels: Record<string, string> = {
      asap: "As soon as possible",
      "1-2-months": "Within 1-2 months",
      "3-6-months": "Within 3-6 months",
      exploring: "Just exploring options",
    };

    const contactMethodLabels: Record<string, string> = {
      "phone-call": "Phone Call",
      text: "Text Message",
      email: "Email",
    };

    const formattedServices = (servicesNeeded as string[])
      .map((s: string) => serviceLabels[s] || s)
      .join(", ");

    // Logo as base64 buffer for CID attachment (works on Vercel serverless)

    // Build the email HTML
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #ffffff; padding: 24px 24px 16px; text-align: center; border-bottom: 1px solid #e0e0e0;">
          <img src="cid:adilay-logo" alt="Adilay Roofing" width="200" style="display: inline-block; max-width: 200px; height: auto;" />
        </div>
        <div style="background-color: #C41E1E; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">🏠 New FREE Quote Request</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">

          <h2 style="color: #C41E1E; font-size: 16px; margin: 0 0 15px 0; border-bottom: 2px solid #C41E1E; padding-bottom: 8px;">Contact Information</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 160px; vertical-align: top;">Full Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Phone:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Preferred Contact:</td>
              <td style="padding: 8px 0;">${contactMethodLabels[preferredContact] || preferredContact}</td>
            </tr>
          </table>

          <h2 style="color: #C41E1E; font-size: 16px; margin: 0 0 15px 0; border-bottom: 2px solid #C41E1E; padding-bottom: 8px;">Project Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 160px; vertical-align: top;">Service Area:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${serviceArea}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Property Type:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Project Type:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${projectTypeLabel[projectType] || projectType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Services Needed:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${formattedServices}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Timeline:</td>
              <td style="padding: 8px 0;">${timelineLabels[timeline] || timeline}</td>
            </tr>
          </table>

          <h2 style="color: #C41E1E; font-size: 16px; margin: 0 0 15px 0; border-bottom: 2px solid #C41E1E; padding-bottom: 8px;">Property Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 160px; vertical-align: top;">Square Footage:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${squareFootage || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; vertical-align: top;">Stories:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${stories || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Known Issues:</td>
              <td style="padding: 8px 0; white-space: pre-wrap;">${knownIssues || "None reported"}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 15px; text-align: center; color: #888; font-size: 12px;">
          This lead was submitted from the Adilay Roofing website FREE quote form.
        </div>
      </div>
    `;

    // Plain text fallback
    const text = `
NEW FREE QUOTE REQUEST
==============================

CONTACT INFORMATION
------------------------------
Full Name: ${fullName}
Phone: ${phone}
Email: ${email}
Preferred Contact: ${contactMethodLabels[preferredContact] || preferredContact}

PROJECT DETAILS
------------------------------
Service Area: ${serviceArea}
Property Type: ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
Project Type: ${projectTypeLabel[projectType] || projectType}
Services Needed: ${formattedServices}
Timeline: ${timelineLabels[timeline] || timeline}

PROPERTY DETAILS
------------------------------
Square Footage: ${squareFootage || "Not provided"}
Stories: ${stories || "Not provided"}
Known Issues: ${knownIssues || "None reported"}

==============================
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

    // Send email with embedded logo
    await transporter.sendMail({
      from: `"Adilay Roofing Website" <${process.env.SMTP_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `🏠 New Quote Request: ${fullName} — ${formattedServices}`,
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "Failed to send your request. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
