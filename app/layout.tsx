import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "HomeCheck — Property Evaluation & Due-Diligence Workspace",
  description: "Evaluate your shortlisted property in India. Know what you know, what you don't, and what to do next before committing money.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0A0A] text-[#EDEDED] antialiased selection:bg-[#5B8BDF]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
