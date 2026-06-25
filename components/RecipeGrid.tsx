"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { recipes, Category } from "@/lib/recipes";

const CATEGORIES: Category[] = ["All", "Vegetarian", "Chicken", "Fish", "Lamb", "Dessert"];

const difficultyColor: Record<string, string> = {
  Easy: "#5a8a5a",
  Medium: "#b5714a",
  Hard: "#9b4444",
};

export default function RecipeGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchCat = activeCategory === "All" || r.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.shortDescription.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <section id="recipes" className="max-w-6xl mx-auto px-6 py-14">
      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-lg mx-auto">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            style={{ color: "var(--muted)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search recipes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: "1.5px solid var(--border)",
              backgroundColor: "var(--card)",
              color: "var(--foreground)",
              borderRadius: "100px",
            }}
            className="w-full pl-12 pr-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {CATEGORIES.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="filter-btn px-5 py-2 text-sm font-medium rounded-full border transition-all"
              style={{
                backgroundColor: active ? "var(--accent)" : "var(--card)",
                color: active ? "#fff" : "var(--foreground)",
                border: active ? "1.5px solid var(--accent)" : "1.5px solid var(--border)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center py-20" style={{ color: "var(--muted)" }}>
          No recipes found. Try a different search or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-card fade-in rounded-2xl overflow-hidden"
              style={{ backgroundColor: "var(--card)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden h-52">
                <Image
                  src={recipe.thumbnail}
                  alt={recipe.title}
                  fill
                  className="card-image object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Category tag */}
                <span
                  className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                >
                  {recipe.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1 leading-snug">{recipe.title}</h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
                  {recipe.shortDescription}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-4 text-xs mb-5" style={{ color: "var(--muted)" }}>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {recipe.totalTime}
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: difficultyColor[recipe.difficulty] }}
                  >
                    {recipe.difficulty}
                  </span>
                </div>

                <Link
                  href={`/recipes/${recipe.slug}`}
                  className="block text-center text-sm font-semibold py-2.5 rounded-xl transition-all hover:opacity-85"
                  style={{ backgroundColor: "var(--accent-light)", color: "var(--accent)" }}
                >
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
