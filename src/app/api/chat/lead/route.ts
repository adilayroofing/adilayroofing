import { NextResponse } from "next/server";
import { submitContactLead } from "@/lib/contactLead";

// Direct lead submission from the chat widget's "Leave my details" quick
// form. Same validation + mapping as the contact form, source "AI Chat".
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, financingInterested } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(String(email).trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await submitContactLead({
      name: String(name).slice(0, 120),
      email: String(email).trim().slice(0, 160),
      phone: phone ? String(phone).slice(0, 40) : undefined,
      service: String(service).slice(0, 80),
      message: String(message).slice(0, 1500),
      financingInterested: Boolean(financingInterested),
      source: "AI Chat",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chat lead form error:", error);
    return NextResponse.json(
      { error: "Failed to send your details. Please try again or call us." },
      { status: 500 }
    );
  }
}
