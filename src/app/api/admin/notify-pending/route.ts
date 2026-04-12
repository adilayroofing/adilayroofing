import { NextResponse } from "next/server";
import { notifyPendingApproval } from "@/lib/notify";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("[notify-pending] Received:", body);

    const { pageName, changeType, pendingId } = body;

    if (!pageName || !changeType) {
      console.log("[notify-pending] Missing fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await notifyPendingApproval({ pageName, changeType, pendingId });

    console.log("[notify-pending] Notification sent successfully");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify-pending] Error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
