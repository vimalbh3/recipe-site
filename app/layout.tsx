import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Curated Recipes",
  description: "A curated recipe library turning TikTok and Instagram food videos into simple, written step-by-step recipes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }} className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer style={{ borderTop: "1px solid var(--border)" }} className="py-8 text-center text-sm" >
          <span style={{ color: "var(--muted)" }}>© {new Date().getFullYear()} Curated Recipes</span>
        </footer>
      </body>
    </html>
  );
}
