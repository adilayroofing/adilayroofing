import { NextResponse } from "next/server";
import { submitContactLead } from "@/lib/contactLead";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, financingInterested } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    await submitContactLead({
      name,
      email,
      phone,
      service,
      message,
      financingInterested,
      source: "Contact Form",
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
