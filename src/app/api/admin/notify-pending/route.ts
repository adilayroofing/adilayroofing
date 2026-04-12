import { NextResponse } from "next/server";
import { notifyPendingApproval } from "@/lib/notify";

export async function POST(request: Request) {
  try {
    const { pageName, changeType, pendingId } = await request.json();

    if (!pageName || !changeType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await notifyPendingApproval({ pageName, changeType, pendingId });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
