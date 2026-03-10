import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingQuoteTab from "@/components/FloatingQuoteTab";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/company";

const GA_MEASUREMENT_ID = "G-7E3RFPT4LL";
const GOOGLE_ADS_ID = "AW-16713352384";
const META_PIXEL_ID = "1298420842133043";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const BASE_URL = "https://www.adilayroofing.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Adilay Roofing Philadelphia",
    default:
      "Adilay Roofing | #1 Roofing Contractor in Philadelphia, PA — Free Estimates",
  },
  description:
    "Adilay Roofing — Philadelphia's trusted roofing contractor with 20+ years experience. Roof replacement, repair, flat roofing, siding, windows & gutters. Licensed (PA184779), insured, free estimates. Call (888) 823-4766.",
  keywords: [
    "roofing contractor Philadelphia",
    "roof replacement Philadelphia",
    "roof repair Philadelphia PA",
    "flat roofing Philadelphia",
    "Philadelphia roofer",
    "roofing company near me",
    "siding installation Philadelphia",
    "window replacement Philadelphia",
    "gutter installation Philadelphia",
    "licensed roofer PA",
  ],
  authors: [{ name: "Adilay Roofing LLC" }],
  creator: "Adilay Roofing LLC",
  publisher: "Adilay Roofing LLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: company.name,
    title:
      "Adilay Roofing | #1 Roofing Contractor in Philadelphia, PA",
    description:
      "Philadelphia's trusted roofing experts. 20+ years, 2,080+ projects completed. Roof replacement, repair, flat roofing, siding & more. Free estimates!",
    images: [
      {
        url: `${BASE_URL}/images/adilay-van-service-areas.jpg`,
        width: 1534,
        height: 969,
        alt: "Adilay Roofing crew and van completing a roof replacement in Philadelphia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adilay Roofing | Philadelphia's Trusted Roofing Experts",
    description:
      "20+ years of roofing excellence in Philadelphia. Free estimates — call (888) 823-4766.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) - loads via Google Ads ID, configures both GA4 + Ads */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_ADS_ID}');
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className={`${lato.variable} antialiased`}>
        {/* Click-to-call conversion tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function(e) {
                // CTA click tracking
                var cta = e.target.closest('a[href="/contact"], a[href="/get-quote"]');
                if (cta && typeof gtag === 'function') {
                  var loc = 'page';
                  var el = cta;
                  if (el.closest('header')) loc = 'header';
                  else if (el.closest('footer')) loc = 'footer';
                  else if (el.closest('[class*="FloatingQuoteTab"]') || el.closest('[class*="floating"]')) loc = 'floating_tab';
                  else if (el.closest('section:first-of-type')) loc = 'hero';
                  gtag('event', 'cta_click', {
                    cta_text: (cta.textContent || '').trim(),
                    cta_location: loc,
                    link_url: cta.getAttribute('href')
                  });
                }
                // Phone click tracking
                var link = e.target.closest('a[href^="tel:"]');
                if (!link) return;
                if (typeof gtag === 'function') {
                  gtag('event', 'conversion', {
                    send_to: '${GOOGLE_ADS_ID}/call_click',
                    event_category: 'engagement',
                    event_label: 'phone_call'
                  });
                  gtag('event', 'phone_call_click', {
                    event_category: 'engagement',
                    link_url: link.getAttribute('href')
                  });
                }
                if (typeof fbq === 'function') {
                  fbq('track', 'Contact', { content_name: 'Phone Call' });
                }
              });
            `,
          }}
        />
        <JsonLd />
        <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingQuoteTab />
      </body>
    </html>
  );
}
