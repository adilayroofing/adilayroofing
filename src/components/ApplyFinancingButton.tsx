"use client";

// Service Finance Company application launcher.
//
// SFC provisions each dealer an id/key pair that must be POSTed to their
// dealerAuthentication endpoint. These values are dealer-attribution tokens,
// not secrets — SFC's own integration docs put them in page markup, and they
// are visible in page source by design.
//
// Opens in a new tab so the visitor doesn't lose the site mid-application.
const SVCFIN_ACTION = "https://apply.svcfin.com/home/dealerAuthentication";
const SVCFIN_ID = "815133537";
const SVCFIN_KEY = "1742219857";

type Props = {
  /** Button label. */
  label?: string;
  /** Tailwind classes for the button element. */
  className?: string;
  /** Where on the page this button sits — sent to GA4 as click_location. */
  location: string;
};

export default function ApplyFinancingButton({
  label = "Apply Online",
  className = "btn-primary w-full sm:w-auto",
  location,
}: Props) {
  return (
    <form
      action={SVCFIN_ACTION}
      method="post"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full sm:w-auto"
      onSubmit={() => {
        // Mirrors the phone/sms tracking in layout.tsx so financing applies
        // show up alongside the other lead events in GA4.
        if (typeof window.gtag === "function") {
          window.gtag("event", "financing_apply_click", {
            event_category: "engagement",
            event_label: "service_finance_apply",
            click_location: location,
          });
        }
        if (typeof window.fbq === "function") {
          window.fbq("track", "SubmitApplication", {
            content_name: "Roof Financing Application",
          });
        }
      }}
    >
      <input type="hidden" name="id" value={SVCFIN_ID} />
      <input type="hidden" name="key" value={SVCFIN_KEY} />
      <button type="submit" className={className}>
        {label}
      </button>
    </form>
  );
}
