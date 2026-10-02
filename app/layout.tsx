import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "HomeCheck — Property Evaluation & Due-Diligence Workspace",
  description:
    "Evaluate your shortlisted property in India. Know what you know, what you don't, and what to do next — before committing money.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
