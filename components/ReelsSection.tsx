import React, { useEffect, useState } from "react";

export interface Reel {
  id: string;
  type: "video" | "image" | "news";
  src: string;
  title: string;
  description?: string;
  link?: string;
  source?: string;
  platform?: string;
  country?: string;
}

const LOCAL_SOURCES = [
  { id: "semana", name: "Semana" },
  { id: "portafolio", name: "Portafolio" },
  { id: "eltiempo", name: "El Tiempo" },
  { id: "elespectador", name: "El Espectador" },
  { id: "caracol", name: "Caracol" },
  { id: "rcn", name: "RCN" },
  { id: "colombia-reports", name: "Colombia Reports" },
  { id: "gov", name: "Government Portals" },
];

const SOCIAL_PLATFORMS = [
  { id: "youtube", name: "YouTube" },
  { id: "tiktok", name: "TikTok" },
  { id: "instagram", name: "Instagram" },
  { id: "facebook", name: "Facebook" },
];

const fetchLocalReels = async (): Promise<Reel[]> => {
  return [
    ...LOCAL_SOURCES.map((src) => ({
      id: src.id,
      type: "news" as const,
      src: "",
      title: `Latest from ${src.name}`,
      description: `Recent reel/news from ${src.name}`,
      link: `https://${src.id}.com/`,
      source: src.name,
      country: "Colombia",
    })),
    ...SOCIAL_PLATFORMS.map((platform) => ({
      id: platform.id,
      type: "video" as const,
      src: `https://www.${platform.id}.com/embed/exampleColombia`,
      title: `Trending ${platform.name} Reel in Colombia`,
      description: `Colombian civic reel on ${platform.name}`,
      link: `https://www.${platform.id}.com/results?search_query=Colombia`,
      platform: platform.name,
      country: "Colombia",
    })),
  ];
};

type Props = {
  context?: "local" | "world";
};

export const ReelsSection: React.FC<Props> = ({ context = "local" }) => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        if (context === "local") {
          const local = await fetchLocalReels();
          if (!cancelled) setReels(local);
        } else {
          const world: Reel[] = [
            {
              id: "bbc",
              type: "news",
              src: "",
              title: "Latest from BBC",
              description: "Global news reel",
              link: "https://bbc.com/",
              source: "BBC",
              country: "Global",
            },
            {
              id: "youtube-world",
              type: "video",
              src: "https://www.youtube.com/embed/exampleGlobal",
              title: "Trending YouTube Reel Worldwide",
              description: "Global trending reel on YouTube",
              link: "https://www.youtube.com/results?search_query=world+news",
              platform: "YouTube",
              country: "Global",
            },
          ];
          if (!cancelled) setReels(world);
        }
      } catch (err) {
        console.warn("ReelsSection: failed to load reels", err);
        if (!cancelled) setReels([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [context]);

  if (loading) {
    return <div>Loading reels...</div>;
  }

  return (
    <section aria-labelledby="reels-title" style={{ margin: "2.5rem 0" }}>
      <h2
        id="reels-title"
        style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}
      >
        Reels — {context === "local" ? "Colombia" : "World"}
      </h2>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {reels.map((reel) => (
          <article
            key={reel.id}
            style={{
              background: "#fff",
              borderRadius: "1.1rem",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              padding: "1.2rem",
              margin: "1rem",
              maxWidth: "340px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "box-shadow 0.2s",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(
                `https://www.google.com/search?q=${encodeURIComponent(
                  `${reel.source || reel.platform} ${context === "local" ? "Colombia" : ""}`
                )}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
            tabIndex={0}
            aria-label={`View topics for ${reel.source || reel.platform}`}
          >
            {reel.type === "video" && reel.src ? (
              <iframe
                src={reel.src}
                title={reel.title}
                width="300"
                height="180"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "0.8rem", marginBottom: "1rem" }}
              />
            ) : null}
            <h3 style={{ margin: "0.5rem 0" }}>{reel.title}</h3>
            <p style={{ margin: "0.25rem 0 0.75rem 0", textAlign: "center" }}>
              {reel.description}
            </p>
            {reel.link ? (
              <a href={reel.link} target="_blank" rel="noopener noreferrer">
                Visit Source
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReelsSection;
