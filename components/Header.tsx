"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--background)" }}
      className="sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span
            style={{ color: "var(--accent)", fontSize: "1.4rem" }}
            className="font-bold tracking-tight"
          >
            Curated
          </span>
          <span style={{ color: "var(--foreground)", fontSize: "1.4rem" }} className="font-light tracking-tight">
            Recipes
          </span>
        </Link>

        <Link
          href="/#recipes"
          style={{
            color: "var(--accent)",
            border: "1.5px solid var(--accent)",
            borderRadius: "100px",
          }}
          className="text-sm font-medium px-5 py-2 transition-all hover:opacity-80"
        >
          Recipes
        </Link>
      </div>
    </header>
  );
}
