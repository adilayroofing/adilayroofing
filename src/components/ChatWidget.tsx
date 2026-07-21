"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  FormEvent,
  KeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { bookingSchedules } from "@/data/booking";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  /** "trust" renders the licensed & insured proof card (license photo, BBB seal, Google stars) */
  kind?: "trust";
}

interface StoredChat {
  messages: ChatMessage[];
  leadSubmitted: boolean;
}

const STORAGE_KEY = "adilay-chat-v1";
const TEASER_KEY = "adilay-chat-teaser-dismissed";
const MAX_USER_MESSAGES = 20;

// Branded support-rep headshot for the assistant avatar (Cloudinary asset
// "rep_j4mkmn", uploaded 2026-07-21). The slight face zoom keeps his face
// legible in the tiny 28px message avatars.
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const AGENT_PHOTO = CLOUD_NAME
  ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_thumb,g_face,z_0.9,w_160,h_160,q_auto,f_auto/rep_j4mkmn`
  : null;

// Faded backdrop for the messages area — the two branded Adilay vans
// (Cloudinary asset uploaded 2026-07-21). Rendered at low opacity behind
// the bubbles; q_auto:low keeps the download tiny since it's decorative.
const CHAT_BG = CLOUD_NAME
  ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_760,q_auto:low,f_auto/WhatsApp_Image_2026-07-15_at_00.17.00_ylgixy`
  : null;

// Trust-card assets: PA license certificate + Google 5.0 badge (same images
// used on the site), plus the BBB seal hosted by BBB itself.
const CLOUD_FOLDER =
  process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "adilayroofing";
const LICENSE_PHOTO = CLOUD_NAME
  ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_600,q_auto,f_auto/${CLOUD_FOLDER}/images/pa-license`
  : null;
const GOOGLE_STARS_PHOTO = CLOUD_NAME
  ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_300,q_auto,f_auto/${CLOUD_FOLDER}/images/google-business-review-5-stars`
  : null;
const BBB_SEAL_IMG =
  "https://seal-dc-easternpa.bbb.org/seals/blue-seal-160-82-bbb-236104655.png";
const BBB_PROFILE_URL =
  "https://www.bbb.org/us/pa/philadelphia/profile/roofing-contractors/adilay-roofing-llc-0241-236104655/#sealclick";

// Same options as the contact form dropdown — keeps the sheet mapping identical.
const SERVICE_OPTIONS = [
  "Roof Replacement",
  "Roof Repair",
  "Flat Roofing (EPDM)",
  "Shingle Roofing",
  "Siding Installation & Repair",
  "Window Installation & Replacement",
  "Gutter Installation & Repair",
  "Other",
];

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi, I'm Adi — Adilay Roofing's virtual expert! 👋 Ask me anything about roofs, siding, windows or gutters, or let's set up your FREE estimate. How can I help?",
};

// Labels kept short so all chips (plus the gallery link) fit in three rows.
// `trust: true` renders the local licensed & insured proof card instead of
// asking the AI.
const QUICK_REPLIES: { label: string; text: string; trust?: boolean }[] = [
  { label: "Licensed & insured?", text: "Are you licensed & insured?", trust: true },
  { label: "Free estimate", text: "Get a free estimate" },
  { label: "Roof leak", text: "I have a roof leak" },
  { label: "Financing", text: "Financing options" },
  { label: "Working hours", text: "What are your working hours?" },
  { label: "Service areas", text: "What areas do you serve?" },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [teaserVisible, setTeaserVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chipStripRef = useRef<HTMLDivElement>(null);
  const [chipArrows, setChipArrows] = useState({ left: false, right: true });
  const openRef = useRef(open);
  openRef.current = open;

  const bookingSchedule = bookingSchedules.find((s) => s.url.trim());

  /* ── Restore conversation from sessionStorage ── */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored: StoredChat = JSON.parse(raw);
        if (Array.isArray(stored.messages) && stored.messages.length > 0) {
          setMessages(stored.messages);
          setLeadSubmitted(Boolean(stored.leadSubmitted));
        }
      }
    } catch {
      /* corrupted storage — start fresh */
    }
  }, []);

  /* ── Persist conversation ── */
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ messages, leadSubmitted } satisfies StoredChat)
      );
    } catch {
      /* storage full/unavailable — non-critical */
    }
  }, [messages, leadSubmitted]);

  /* ── Teaser bubble appears after a short delay ── */
  useEffect(() => {
    if (sessionStorage.getItem(TEASER_KEY)) return;
    const t = setTimeout(() => {
      if (!openRef.current) setTeaserVisible(true);
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  function dismissTeaser() {
    setTeaserVisible(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      /* non-critical */
    }
  }

  /* ── Scroll to newest content ──
     For assistant replies, anchor to the TOP of the reply so the visitor
     reads the message first and sees the form/booking card begin under it.
     For everything else (user message, typing dots), stick to the bottom. */
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;

    function anchor() {
      if (!el) return;
      const last = messages[messages.length - 1];
      if (last?.role === "assistant" && !isTyping) {
        const rows = el.querySelectorAll("[data-msg-row]");
        // Anchor to the visitor's question (the row before the reply) so the
        // view reads: their question → the answer → the form under it.
        const target = (rows[rows.length - 2] ?? rows[rows.length - 1]) as
          | HTMLElement
          | undefined;
        if (target) {
          el.scrollTop +=
            target.getBoundingClientRect().top -
            el.getBoundingClientRect().top -
            8;
          return;
        }
      }
      el.scrollTop = el.scrollHeight;
    }

    anchor();
    // Entry animations and input refocus can shift layout right after the
    // first anchor — re-anchor once they settle.
    const t = setTimeout(anchor, 350);
    return () => clearTimeout(t);
  }, [messages, isTyping, open, formOpen]);

  /* ── Lock body scroll while open on mobile ── */
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(max-width: 640px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* ── Quick-question strip: arrow state + one-time slide hint ── */
  useEffect(() => {
    if (!open) return;
    const el = chipStripRef.current;
    if (!el) return;

    function updateArrows() {
      const strip = chipStripRef.current;
      if (!strip) return;
      setChipArrows({
        left: strip.scrollLeft > 4,
        right: strip.scrollLeft < strip.scrollWidth - strip.clientWidth - 4,
      });
    }

    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    // Subtle nudge on open so visitors notice the strip slides.
    const hint = setTimeout(() => {
      const strip = chipStripRef.current;
      if (strip && strip.scrollWidth > strip.clientWidth && strip.scrollLeft === 0) {
        strip.scrollTo({ left: 48, behavior: "smooth" });
        setTimeout(() => strip.scrollTo({ left: 0, behavior: "smooth" }), 500);
      }
    }, 800);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
      clearTimeout(hint);
    };
  }, [open]);

  function slideChips(dir: -1 | 1) {
    chipStripRef.current?.scrollBy({ left: dir * 190, behavior: "smooth" });
  }

  /* ── Esc closes the panel ── */
  useEffect(() => {
    if (!open) return;
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // On touch devices programmatic focus pops the keyboard on Android
  // (iOS suppresses it), so only auto-focus when a fine pointer (mouse/
  // trackpad) is present — the keyboard should appear when the visitor
  // taps the input themselves.
  function focusInputIfDesktop() {
    if (window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus();
    }
  }

  function openChat() {
    dismissTeaser();
    setOpen(true);
    setTimeout(focusInputIfDesktop, 250);
  }

  function fireLeadPixels() {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "AI Chat",
        currency: "USD",
        value: 1,
      });
    }
  }

  function showTrustCard(question: string) {
    if (isTyping) return;
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    // Brief typing indicator so the reply feels like the assistant is
    // answering, matching the AI-powered questions.
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          kind: "trust",
          content: `Absolutely — fully licensed and insured! We're a registered PA Home Improvement Contractor (license #${company.license}), BBB accredited, and rated 5.0 stars on Google. Here's the proof:`,
        },
      ]);
      setIsTyping(false);
    }, 1300);
  }

  function handleFormSubmitted(firstName: string) {
    setFormOpen(false);
    setLeadSubmitted(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Thank you${firstName ? `, ${firstName}` : ""}! ✅ Your request was sent to our team — we'll reach out within 24 hours. Want to skip the wait? Book your free 30-minute visit below.`,
      },
    ]);
    fireLeadPixels();
  }

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsgCount = messages.filter((m) => m.role === "user").length;
      if (userMsgCount >= MAX_USER_MESSAGES) {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: trimmed },
          {
            role: "assistant",
            content: `This chat has reached its limit — but I don't want to leave you hanging! Call or text us at ${company.phone} (24/7) and the team will take it from here.`,
          },
        ]);
        setInput("");
        return;
      }

      const nextMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: trimmed },
      ];
      setMessages(nextMessages);
      setInput("");
      setIsTyping(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages, leadSubmitted }),
        });
        const data = await res.json();

        const reply = (data.reply || "").replace(/\[\[FORM\]\]/g, "").trim();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              reply ||
              `Sorry, something went wrong. Please call us at ${company.phone}.`,
          },
        ]);

        if (data.leadSubmitted && !leadSubmitted) {
          setLeadSubmitted(true);
          setFormOpen(false);
          fireLeadPixels();
        } else if (data.showForm) {
          // The assistant just asked for contact details — pop the quick
          // fill-in box right under its message.
          setFormOpen(true);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Hmm, I couldn't connect just now. Please try again in a moment, or call us at ${company.phone} — we're available 24/7.`,
          },
        ]);
      } finally {
        setIsTyping(false);
        focusInputIfDesktop();
      }
    },
    [messages, leadSubmitted, isTyping]
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* ── Launcher button + teaser ── */}
      <div
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2 ${
          open ? "pointer-events-none opacity-0" : ""
        } transition-opacity duration-200`}
      >
        {teaserVisible && (
          <div className="chat-teaser relative bg-white border border-brand-border rounded-lg shadow-lg px-2.5 py-1.5 max-w-[185px] sm:px-4 sm:py-3 sm:max-w-[230px]">
            <button
              type="button"
              onClick={dismissTeaser}
              aria-label="Dismiss chat invitation"
              className="absolute -top-2 -left-2 w-5 h-5 bg-brand-dark text-white rounded-full flex items-center justify-center text-[10px] leading-none cursor-pointer hover:bg-brand-darker"
            >
              ✕
            </button>
            <button
              type="button"
              onClick={openChat}
              className="flex items-center gap-2 sm:gap-2.5 text-left w-full cursor-pointer"
            >
              <AssistantAvatar size="lg" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-brand-dark leading-snug">
                  Roof questions? 👋
                </p>
                <p className="text-[10px] sm:text-xs text-brand-gray mt-0.5 leading-snug">
                  Chat with our roofing expert — free &amp; instant.
                </p>
              </div>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={openChat}
          aria-label="Open chat with Adilay Roofing"
          className="chat-launcher relative w-14 h-14 md:w-16 md:h-16 bg-brand-red rounded-full shadow-xl flex items-center justify-center text-white cursor-pointer hover:bg-brand-red-dark hover:scale-105 active:scale-95 transition-all"
        >
          <span className="chat-pulse-ring" aria-hidden="true" />
          <svg
            className="w-7 h-7 md:w-8 md:h-8 relative"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"
          />
        </button>
        <span className="text-[11px] font-bold text-brand-dark bg-white/90 border border-brand-border rounded-full px-2.5 py-0.5 shadow-sm select-none">
          Chat with us
        </span>
      </div>

      {/* ── Chat panel ── */}
      {open && (
        <div
          role="dialog"
          aria-label="Adilay Roofing chat assistant"
          className="chat-panel fixed z-[60] bg-white flex flex-col overflow-hidden
                     inset-x-0 bottom-0 h-[93dvh] rounded-t-2xl border-t border-brand-border shadow-2xl
                     sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:h-[600px] sm:max-h-[calc(100dvh-48px)]
                     sm:rounded-xl sm:border sm:border-brand-border"
        >
          {/* Header */}
          <div className="shrink-0 bg-white border-b border-brand-border">
            <div className="h-1 bg-brand-red" aria-hidden="true" />
            <div className="flex items-center gap-3 px-4 py-3">
              <Image
                src="/images/logo-new.png"
                alt="Adilay Roofing"
                width={120}
                height={36}
                className="h-8 w-auto"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-brand-dark leading-tight truncate">
                  Roofing Expert Assistant
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-brand-gray leading-tight">
                  <span
                    className="w-2 h-2 bg-green-500 rounded-full shrink-0"
                    aria-hidden="true"
                  />
                  Online — replies instantly
                </p>
              </div>
              <a
                href={`tel:${company.phoneRaw}`}
                aria-label={`Call ${company.phone}`}
                className="w-9 h-9 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors"
              >
                <svg
                  className="w-4.5 h-4.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-9 h-9 rounded-full text-brand-gray flex items-center justify-center hover:bg-brand-light hover:text-brand-dark transition-colors cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="relative flex-1 min-h-0 bg-brand-light/60">
            {CHAT_BG && (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center opacity-[0.22] pointer-events-none"
                style={{ backgroundImage: `url(${CHAT_BG})` }}
              />
            )}
          <div
            ref={scrollRef}
            className="relative h-full overflow-y-auto px-4 py-4 space-y-3"
          >
            {messages.map((msg, i) =>
              msg.kind === "trust" ? (
                <TrustCard key={i} message={msg} />
              ) : (
                <MessageBubble key={i} message={msg} />
              )
            )}

            {leadSubmitted && bookingSchedule && (
              <div className="chat-msg-in flex gap-2">
                <AssistantAvatar />
                <div className="max-w-[85%] bg-white border-2 border-brand-red/25 rounded-2xl rounded-bl-sm p-3.5 shadow-sm">
                  <p className="text-[13px] font-bold text-brand-dark mb-0.5">
                    📅 Book your {bookingSchedule.label.toLowerCase()}
                  </p>
                  <p className="text-xs text-brand-gray mb-3 leading-snug">
                    Pick a day and time that works for you — takes under a
                    minute, instant email confirmation.
                  </p>
                  <a
                    href={bookingSchedule.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-brand-red text-white text-sm font-bold rounded-sm hover:bg-brand-red-dark active:scale-[0.97] transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Book my {bookingSchedule.duration} visit
                  </a>
                </div>
              </div>
            )}

            {formOpen && !leadSubmitted && (
              <LeadForm
                onSubmitted={handleFormSubmitted}
                onCancel={() => setFormOpen(false)}
              />
            )}

            {isTyping && (
              <div className="chat-msg-in flex gap-2 items-end">
                <AssistantAvatar />
                <div className="bg-white border border-brand-border rounded-2xl rounded-bl-sm px-4 py-3">
                  <span className="chat-typing" aria-label="Assistant is typing">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            )}
          </div>
          </div>

          {/* Pinned quick-form action */}
          {!leadSubmitted && !formOpen && (
            <div className="shrink-0 px-4 py-2 bg-brand-light/60 flex items-center justify-between gap-2 border-t border-brand-border/50">
              <p className="text-[11px] text-brand-gray leading-tight">
                In a hurry? Skip the chat:
              </p>
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-brand-dark rounded-full hover:bg-brand-darker active:scale-95 transition-all cursor-pointer"
              >
                📋 Leave my details
              </button>
            </div>
          )}

          {/* Quick questions — sticky one-row strip with slide arrows */}
          <div className="shrink-0 bg-brand-light/60 flex items-center gap-0.5 px-1 py-1.5">
            <button
              type="button"
              onClick={() => slideChips(-1)}
              disabled={!chipArrows.left}
              aria-label="Scroll questions left"
              className="shrink-0 w-7 h-7 rounded-full bg-white border border-brand-border text-brand-dark flex items-center justify-center hover:border-brand-red hover:text-brand-red active:scale-90 transition-all cursor-pointer disabled:opacity-25 disabled:cursor-default"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={chipStripRef}
              className="chat-chip-strip flex-1 grid grid-rows-2 grid-flow-col auto-cols-max gap-1.5 overflow-x-auto px-1"
            >
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() =>
                    q.trust ? showTrustCard(q.text) : sendMessage(q.text)
                  }
                  className="shrink-0 whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-brand-red bg-white border border-brand-red/40 rounded-full hover:bg-brand-red hover:text-white active:scale-95 transition-all cursor-pointer"
                >
                  {q.label}
                </button>
              ))}
              <Link
                href="/gallery"
                onClick={() => setOpen(false)}
                className="shrink-0 whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-brand-red bg-white border border-brand-red/40 rounded-full hover:bg-brand-red hover:text-white active:scale-95 transition-all cursor-pointer"
              >
                📸 Our work
              </Link>
            </div>

            <button
              type="button"
              onClick={() => slideChips(1)}
              disabled={!chipArrows.right}
              aria-label="Scroll questions right"
              className="shrink-0 w-7 h-7 rounded-full bg-white border border-brand-border text-brand-dark flex items-center justify-center hover:border-brand-red hover:text-brand-red active:scale-90 transition-all cursor-pointer disabled:opacity-25 disabled:cursor-default"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 border-t border-brand-border bg-white px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-end gap-2"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              maxLength={1500}
              placeholder="Type your message…"
              aria-label="Type your message"
              className="flex-1 resize-none max-h-24 px-3.5 py-2.5 text-base sm:text-sm border border-brand-border rounded-lg text-brand-dark placeholder:text-brand-gray/60 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="w-11 h-11 shrink-0 bg-brand-red text-white rounded-lg flex items-center justify-center hover:bg-brand-red-dark active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg
                className="w-5 h-5 translate-x-[1px]"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
              </svg>
            </button>
          </form>

          <p className="shrink-0 bg-white text-center text-[10px] text-brand-gray/70 pb-1.5 -mt-0.5 px-4">
            AI assistant — for urgent help call{" "}
            <a href={`tel:${company.phoneRaw}`} className="underline">
              {company.phone}
            </a>
          </p>
        </div>
      )}
    </>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function AssistantAvatar({ size = "sm" }: { size?: "sm" | "lg" }) {
  const cls =
    size === "lg"
      ? "w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-full"
      : "w-9 h-9 shrink-0 rounded-full self-end";
  if (AGENT_PHOTO) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size avatar from Cloudinary CDN; next/image's custom loader would double-prefix the absolute URL
      <img
        src={AGENT_PHOTO}
        alt=""
        aria-hidden="true"
        width={size === "lg" ? 48 : 36}
        height={size === "lg" ? 48 : 36}
        className={`${cls} object-cover border border-brand-border`}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`${cls} bg-brand-red text-white flex items-center justify-center`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </span>
  );
}

const formInputClass =
  "w-full px-3 py-2 text-base sm:text-sm border border-brand-border rounded-md text-brand-dark " +
  "placeholder:text-brand-gray/50 bg-white focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red";

function LeadForm({
  onSubmitted,
  onCancel,
}: {
  onSubmitted: (firstName: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [financingInterested, setFinancingInterested] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const emailValid = /\S+@\S+\.\S+/.test(email.trim());
  const valid =
    name.trim().length > 0 &&
    emailValid &&
    service.length > 0 &&
    message.trim().length > 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setShowErrors(true);
    if (!valid || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          message,
          financingInterested,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to send.");
      onSubmitted(name.trim().split(/\s+/)[0]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong — please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="chat-msg-in flex gap-2">
      <AssistantAvatar />
      <form
        onSubmit={handleSubmit}
        className="flex-1 max-w-[90%] bg-white border-2 border-brand-red/25 rounded-2xl rounded-bl-sm p-3.5 shadow-sm space-y-2.5"
        noValidate
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-bold text-brand-dark leading-snug">
            📋 Leave your details — we&apos;ll take it from here
          </p>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close form"
            className="text-brand-gray hover:text-brand-dark text-sm leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name *"
            aria-label="Full name"
            autoComplete="name"
            className={formInputClass}
          />
          {showErrors && !name.trim() && (
            <p className="text-brand-red text-[11px] mt-0.5">Please enter your name.</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            aria-label="Phone number"
            autoComplete="tel"
            inputMode="tel"
            className={formInputClass}
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address *"
            aria-label="Email address"
            autoComplete="email"
            inputMode="email"
            className={formInputClass}
          />
          {showErrors && !emailValid && (
            <p className="text-brand-red text-[11px] mt-0.5">Please enter a valid email.</p>
          )}
        </div>

        <div>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            aria-label="Service needed"
            className={`${formInputClass} ${service ? "" : "text-brand-gray/60"} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23717171%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-9`}
          >
            <option value="" disabled>
              Service needed *
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {showErrors && !service && (
            <p className="text-brand-red text-[11px] mt-0.5">Please choose a service.</p>
          )}
        </div>

        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            placeholder="What's going on with your roof? Address / area helps too *"
            aria-label="Project description"
            className={`${formInputClass} resize-none`}
          />
          {showErrors && !message.trim() && (
            <p className="text-brand-red text-[11px] mt-0.5">Please tell us a bit about the project.</p>
          )}
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={financingInterested}
            onChange={(e) => setFinancingInterested(e.target.checked)}
            className="mt-0.5 w-3.5 h-3.5 text-brand-red border-brand-border rounded focus:ring-brand-red cursor-pointer"
          />
          <span className="text-[11px] text-brand-dark leading-snug">
            I&apos;m interested in <strong>financing options</strong>
          </span>
        </label>

        {error && (
          <p className="text-[11px] text-red-700 bg-red-50 border border-red-200 rounded-md px-2 py-1.5" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-red text-white text-sm font-bold rounded-md hover:bg-brand-red-dark active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? "Sending…" : "Send my request"}
        </button>
        <p className="text-[10px] text-brand-gray/80 leading-snug">
          By sending, you agree Adilay Roofing may contact you by phone, text, and
          email about your request.
        </p>
      </form>
    </div>
  );
}

// Rich reply for the "Licensed & insured?" quick question — shows the PA
// license certificate (tap to zoom in-chat), the BBB seal (opens the BBB
// profile in a new tab), and the Google 5.0-star badge (opens the Google
// Business profile in a new tab).
function TrustCard({ message }: { message: ChatMessage }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div data-msg-row className="chat-msg-in flex gap-2">
      <AssistantAvatar />
      <div className="max-w-[85%] bg-white border border-brand-border rounded-2xl rounded-bl-sm px-4 py-3 space-y-3">
        <p className="text-sm text-brand-dark leading-relaxed">
          {message.content}
        </p>

        {LICENSE_PHOTO && (
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="block w-full text-left cursor-zoom-in"
            aria-label={`Zoom PA contractor license ${company.license}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- fixed-width chat asset from Cloudinary CDN; the global custom loader would double-prefix the absolute URL */}
            <img
              src={LICENSE_PHOTO}
              alt={`Pennsylvania Home Improvement Contractor license ${company.license}`}
              width={600}
              height={390}
              loading="lazy"
              className="w-full h-auto rounded-md border border-brand-border"
            />
            <span className="block text-[11px] text-brand-gray mt-1">
              PA License <strong>#{company.license}</strong> — tap to zoom
            </span>
          </button>
        )}

        {zoomed && LICENSE_PHOTO && (
          <div
            role="dialog"
            aria-label="PA contractor license, zoomed"
            className="fixed inset-0 z-[90] bg-black/85 flex items-center justify-center p-3 cursor-zoom-out"
            onClick={() => setZoomed(false)}
          >
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label="Close zoomed license"
              className="absolute top-3 right-3 w-10 h-10 bg-white/15 hover:bg-white/30 text-white rounded-full flex items-center justify-center text-xl leading-none cursor-pointer"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element -- zoom overlay for the Cloudinary-hosted license photo */}
            <img
              src={LICENSE_PHOTO}
              alt={`Pennsylvania Home Improvement Contractor license ${company.license}, enlarged`}
              className="max-w-full max-h-[85vh] w-auto h-auto rounded-md shadow-2xl"
            />
            <span className="absolute bottom-4 inset-x-0 text-center text-white/80 text-xs">
              Tap anywhere to close
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <a
            href={BBB_PROFILE_URL}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="Adilay Roofing LLC BBB Business Review"
            className="shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- seal image is hosted by BBB */}
            <img
              src={BBB_SEAL_IMG}
              alt="Adilay Roofing LLC BBB Business Review"
              width={160}
              height={82}
              loading="lazy"
              className="h-12 w-auto"
            />
          </a>
          {GOOGLE_STARS_PHOTO && (
            <a
              href={company.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Adilay Roofing reviews on Google"
              className="shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- fixed-width chat asset from Cloudinary CDN; the global custom loader would double-prefix the absolute URL */}
              <img
                src={GOOGLE_STARS_PHOTO}
                alt="Google Business Review — 5.0 stars"
                width={300}
                height={131}
                loading="lazy"
                className="h-12 w-auto"
              />
            </a>
          )}
        </div>
        <p className="text-[11px] text-brand-gray leading-snug">
          Tap the seals to see our BBB and Google profiles.
        </p>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  if (isUser) {
    return (
      <div data-msg-row className="chat-msg-in flex justify-end">
        <div className="max-w-[85%] bg-brand-red text-white text-sm leading-relaxed rounded-2xl rounded-br-sm px-4 py-2.5 whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    );
  }
  return (
    <div data-msg-row className="chat-msg-in flex gap-2">
      <AssistantAvatar />
      <div className="max-w-[85%] bg-white border border-brand-border text-brand-dark text-sm leading-relaxed rounded-2xl rounded-bl-sm px-4 py-2.5 whitespace-pre-wrap break-words">
        {linkifyPhones(message.content)}
      </div>
    </div>
  );
}

// Turns phone numbers inside assistant text into tap-to-call links,
// e.g. "(267) 255-3620" → <a href="tel:+12672553620">.
const PHONE_RE = /\(?\d{3}\)?[\s.\-–]?\d{3}[\s.\-–]?\d{4}/g;

function linkifyPhones(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(PHONE_RE)) {
    const start = match.index ?? 0;
    if (start > lastIndex) parts.push(text.slice(lastIndex, start));
    const digits = match[0].replace(/\D/g, "");
    parts.push(
      <a
        key={`${start}-${digits}`}
        href={`tel:+1${digits}`}
        className="font-bold text-brand-red underline underline-offset-2 whitespace-nowrap"
      >
        {match[0]}
      </a>
    );
    lastIndex = start + match[0].length;
  }
  if (parts.length === 0) return text;
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
