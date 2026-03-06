import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

const RECIPIENT_EMAIL = "adilayroofing@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      serviceArea,
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

    // Logo path for CID attachment
    const logoPath = path.join(process.cwd(), "public", "images", "logo.png");

    // Build the email HTML
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1B1B2F; padding: 24px; text-align: center;">
          <img src="cid:adilay-logo" alt="Adilay Roofing" width="180" style="display: inline-block; max-width: 180px; height: auto;" />
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
          filename: "logo.png",
          path: logoPath,
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
