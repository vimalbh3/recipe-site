import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getRecipeBySlug, getRelatedRecipes, recipes } from "@/lib/recipes";
import VideoEmbed from "@/components/VideoEmbed";

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};
  return { title: recipe.seoTitle, description: recipe.seoDescription };
}

const difficultyColor: Record<string, string> = {
  Easy: "#5a8a5a",
  Medium: "#b5714a",
  Hard: "#9b4444",
};

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const related = getRelatedRecipes(recipe.relatedRecipes);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/#recipes" className="hover:underline">Recipes</Link>
        <span>/</span>
        <span style={{ color: "var(--foreground)" }}>{recipe.title}</span>
      </nav>

      {/* Hero grid: video left, info right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
        {/* Video */}
        <div>
          <VideoEmbed
            videoUrl={recipe.videoUrl}
            videoType={recipe.videoType}
            title={recipe.title}
          />
          <p className="mt-3 text-xs" style={{ color: "var(--muted)" }}>
            Original video by{" "}
            <span className="font-medium" style={{ color: "var(--foreground)" }}>
              {recipe.creatorName}
            </span>{" "}
            ({recipe.creatorHandle})
          </p>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span
            className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            {recipe.category}
          </span>

          <h1
            className="text-3xl sm:text-4xl font-bold mb-3 leading-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            {recipe.title}
          </h1>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "var(--muted)" }}>
            {recipe.shortDescription}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Prep", value: recipe.prepTime },
              { label: "Cook", value: recipe.cookTime },
              { label: "Total", value: recipe.totalTime },
              { label: "Servings", value: `${recipe.servings}` },
              {
                label: "Difficulty",
                value: recipe.difficulty,
                color: difficultyColor[recipe.difficulty],
              },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: "var(--accent-light)" }}
              >
                <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
                  {s.label}
                </p>
                <p
                  className="font-semibold text-sm"
                  style={{ color: s.color || "var(--foreground)" }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Macros panel — shown only when data is available */}
          {recipe.calories && (
            <div
              className="rounded-2xl p-5"
              style={{ border: "1.5px solid var(--border)", backgroundColor: "var(--card)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
                Nutrition per serving
              </p>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: "Calories", value: recipe.calories, unit: "kcal" },
                  { label: "Protein", value: recipe.protein, unit: "g" },
                  { label: "Carbs", value: recipe.carbs, unit: "g" },
                  { label: "Fat", value: recipe.fats, unit: "g" },
                ].filter((m) => m.value !== undefined).map((m) => (
                  <div key={m.label}>
                    <p className="text-base font-bold" style={{ color: "var(--accent)" }}>
                      {m.value}{m.unit !== "kcal" ? m.unit : ""}
                    </p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>{m.label}</p>
                  </div>
                ))}
              </div>
              {recipe.fibre && (
                <p className="text-xs mt-3 text-center" style={{ color: "var(--muted)" }}>
                  Fibre: {recipe.fibre}g
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recipe content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Ingredients */}
        <div
          className="lg:col-span-1 rounded-2xl p-7"
          style={{ backgroundColor: "var(--card)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
        >
          <h2 className="text-xl font-bold mb-5">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, i) => {
              const isHeader = ing.startsWith("—");
              return isHeader ? (
                <li key={i} className="pt-2 first:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                    {ing.replace(/^—\s*/, "").replace(/\s*—$/, "")}
                  </p>
                </li>
              ) : (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span
                    className="mt-1.5 w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "var(--accent)", opacity: 0.65 }}
                  />
                  {ing}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Method */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-5">Method</h2>
          <ol className="space-y-5">
            {recipe.method.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>

          {/* Tips */}
          {recipe.tips.length > 0 && (
            <div
              className="mt-10 rounded-2xl p-7"
              style={{ backgroundColor: "var(--accent-light)", border: "1px solid var(--border)" }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--accent)" }}>
                Tips & Notes
              </h2>
              <ul className="space-y-3">
                {recipe.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1 text-base" style={{ color: "var(--accent)" }}>✦</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related recipes */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-7">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/recipes/${r.slug}`}
                className="recipe-card rounded-2xl overflow-hidden block no-underline"
                style={{ backgroundColor: "var(--card)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
              >
                <div className="relative overflow-hidden h-40">
                  <Image
                    src={r.thumbnail}
                    alt={r.title}
                    fill
                    className="card-image object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span
                    className="absolute top-2 left-2 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                  >
                    {r.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1">{r.title}</h3>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{r.totalTime} · {r.difficulty}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
