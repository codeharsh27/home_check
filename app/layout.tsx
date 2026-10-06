import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF8F5",
};

export const metadata: Metadata = {
  title: "HomeCheck — Property Due-Diligence & Decision Dossier",
  description:
    "Institutional property underwriting for home buyers in India. Calculate true handover cash drain, stage-gated legal checks, and micro-market reality before paying token money.",
  keywords: [
    "property due diligence India",
    "home buyer checklist",
    "RERA verification",
    "handover cash drain calculator",
    "stamp duty registration India",
    "property legal check",
    "flat buying guide India",
  ],
  authors: [{ name: "HomeCheck Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://homecheck.in"),
  openGraph: {
    title: "HomeCheck — Never Commit to a Property Blindly",
    description:
      "Calculate your true handover cash drain, stage-gated legal due diligence roadmap, and micro-market transaction reality before paying token advance.",
    url: "https://homecheck.in",
    siteName: "HomeCheck",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-[#FAF8F5] text-stone-900 antialiased selection:bg-blue-600/20 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
