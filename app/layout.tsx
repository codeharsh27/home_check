import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "HomeCheck — Property Due-Diligence & Decision Dossier",
  description:
    "Don’t bet your life savings on a builder’s brochure. Uncover the true acquisition cost, EMI stress, and state-specific title checks before paying token money.",
  keywords: [
    "property due diligence India",
    "home buyer checklist",
    "RERA verification",
    "handover cash drain calculator",
    "stamp duty registration India",
    "property legal check",
    "flat buying guide India",
  ],
  authors: [{ name: "Harsh Mule" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://homecheck.in"),
  openGraph: {
    title: "HomeCheck — Don’t Bet Your Life Savings on a Builder’s Brochure",
    description:
      "Uncover your true handover cash outflow, EMI stress test, and state-specific legal checklist before paying token money.",
    url: "https://homecheck.in",
    siteName: "HomeCheck",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/icon.svg?v=2",
    shortcut: "/icon.svg?v=2",
    apple: "/icon.svg?v=2",
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg?v=2" type="image/svg+xml" />
      </head>
      <body className="bg-[#0a0a0a] text-[#fafafa] antialiased selection:bg-[#fafafa]/20 selection:text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
