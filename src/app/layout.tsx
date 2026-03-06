import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingQuoteTab from "@/components/FloatingQuoteTab";
import JsonLd from "@/components/JsonLd";
import { company } from "@/data/company";

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

export const metadata: Metadata = {
  title: {
    template: "Adilay Roofing | %s",
    default: "Adilay Roofing | Philadelphia's Trusted Roofing Experts",
  },
  description: company.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: company.name,
    title: "Adilay Roofing | Philadelphia's Trusted Roofing Experts",
    description: company.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
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
