/**
 * Server-side push notification utility using ntfy.sh
 * Sends notifications when pending changes are submitted for approval.
 * NEVER import this on the client — the topic name must stay secret.
 */

const NTFY_TOPIC = process.env.NTFY_TOPIC;

type ChangeType =
  | "meta edit"
  | "content edit"
  | "new page"
  | "canonical change"
  | "link added"
  | "link edit"
  | "blog post";

export async function notifyPendingApproval({
  pageName,
  changeType,
  pendingId,
}: {
  pageName: string;
  changeType: ChangeType;
  pendingId?: string;
}) {
  console.log("[notify] NTFY_TOPIC:", NTFY_TOPIC ? "set" : "NOT SET");

  if (!NTFY_TOPIC) {
    console.warn("[notify] NTFY_TOPIC not set — skipping push notification");
    return;
  }

  const clickUrl = pendingId
    ? `https://www.adilayroofing.com/admin/pending?id=${pendingId}`
    : `https://www.adilayroofing.com/admin/pending`;

  const url = `https://ntfy.sh/${NTFY_TOPIC}`;
  const message = `${changeType} on "${pageName}" — Tap to review`;
  console.log("[notify] Sending to:", url, "Message:", message);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Title: "New Pending Approval",
        Click: clickUrl,
        Priority: "high",
        Tags: "white_check_mark",
      },
      body: message,
    });
    console.log("[notify] ntfy response status:", res.status);
  } catch (err) {
    console.error("[notify] Failed to send push notification:", err);
  }
}
