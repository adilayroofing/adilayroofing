"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import InspectionPopup from "@/components/InspectionPopup";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname.startsWith("/lp") || pathname.startsWith("/get-quote-ads") || pathname.startsWith("/admin");
  const isHomePage = pathname === "/";

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>{children}</main>
      <Footer />
      {isHomePage && <InspectionPopup />}
    </>
  );
}
