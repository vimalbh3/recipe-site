import RecipeGrid from "@/components/RecipeGrid";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-10 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-5"
          style={{ color: "var(--accent)" }}
        >
          A Social-to-Kitchen Recipe Library
        </p>
        <h1
          className="text-5xl sm:text-6xl font-bold leading-tight mb-5"
          style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
        >
          Cook the recipes
          <br />
          <span style={{ color: "var(--accent)" }}>you saved.</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "var(--muted)" }}>
          A curated recipe library turning TikTok and Instagram food videos into simple, written
          step-by-step recipes.
        </p>
      </section>

      <RecipeGrid />
    </>
  );
}
