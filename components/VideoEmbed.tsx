"use client";
import { useState } from "react";

interface Props {
  videoUrl: string;
  videoType: "tiktok" | "instagram" | "youtube";
  title: string;
}

export default function VideoEmbed({ videoUrl, videoType, title }: Props) {
  const [loaded, setLoaded] = useState(false);

  const icon =
    videoType === "tiktok" ? "TikTok" : videoType === "instagram" ? "Instagram" : "YouTube";

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        aspectRatio: videoType === "tiktok" ? "9/16" : "16/9",
        backgroundColor: "#1a1a1a",
        maxHeight: videoType === "tiktok" ? "600px" : "400px",
      }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-xs text-white/60">{icon} · {title}</p>
          <button
            onClick={() => setLoaded(true)}
            className="text-xs px-4 py-2 rounded-full font-medium transition-all hover:opacity-80"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            Load video
          </button>
        </div>
      )}
      {loaded && (
        <iframe
          src={videoUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      )}
    </div>
  );
}
