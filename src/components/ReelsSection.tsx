import React, { useEffect, useState } from "react";

export interface Reel {
  id: string;
  type: "video" | "image" | "news";
  src: string; // embed url or page url
  title: string;
  description?: string;
  link?: string; // canonical external link
  source?: string;
  platform?: string; // 'YouTube', 'TikTok', etc.
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
      // NOTE: Use real embed links in production. These are demo placeholders.
      src: `https://www.${platform.id}.com/embed/exampleColombia`,
      title: `Trending ${platform.name} Reel in Colombia`,
      description: `Colombian civic reel on ${platform.name}`,
      link: `https://www.${platform.id}.com/results?search_query=Colombia`,
      platform: platform.name,
      country: "Colombia",
    })),
  ];
};

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url, "https://example.com");
    const p = u.pathname.split("/");
    const embedIndex = p.indexOf("embed");
    if (embedIndex >= 0 && p[embedIndex + 1]) return p[embedIndex + 1];
    const v = u.searchParams.get("v");
    if (v) return v;
    if (/^[A-Za-z0-9_-]{11}$/.test(url)) return url;
  } catch (e) {
    // ignore
  }
  return null;
}

function youTubeThumbnailFromSrc(src: string): string | null {
  const id = getYouTubeId(src);
  if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return null;
}

type Props = {
  context?: "local" | "world";
};

export const ReelsSection: React.FC<Props> = ({ context = "local" }) => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [playing, setPlaying] = useState<Reel | null>(null);

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

  if (loading) return <div>Loading reels...</div>;

  return (
    <>
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
          {reels.map((reel) => {
            const ytThumb = youTubeThumbnailFromSrc(reel.src);
            const thumbnail = ytThumb || "/assets/reel-placeholder.png";
            const canInlineEmbed =
              reel.platform?.toLowerCase() === "youtube" && !!getYouTubeId(reel.src);

            return (
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
                }}
                aria-label={`Reel card: ${reel.title}`}
              >
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    borderRadius: "0.8rem",
                    overflow: "hidden",
                    position: "relative",
                    background: "#6c7cff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  <img
                    src={thumbnail}
                    alt={reel.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/assets/reel-placeholder.png";
                    }}
                  />

                  <button
                    onClick={() => {
                      if (canInlineEmbed) {
                        setPlaying(reel);
                      } else {
                        const openTo = reel.link || reel.src;
                        window.open(openTo, "_blank", "noopener,noreferrer");
                      }
                    }}
                    aria-label={`Play ${reel.title}`}
                    style={{
                      position: "absolute",
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      background: "rgba(0,0,0,0.6)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                    </svg>
                  </button>
                </div>

                <div style={{ width: "100%" }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                    {reel.source || reel.platform} · {reel.country || "all"}
                  </div>
                  <h3 style={{ margin: "0 0 8px 0" }}>{reel.title}</h3>
                  <p style={{ margin: "0 0 12px 0", color: "#555" }}>{reel.description}</p>

                  <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
                    <button
                      onClick={() => {
                        if (canInlineEmbed) setPlaying(reel);
                        else window.open(reel.link || reel.src, "_blank", "noopener,noreferrer");
                      }}
                      style={{
                        background: "#0a58ca",
                        color: "#fff",
                        borderRadius: 8,
                        padding: "10px 14px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Watch Now
                    </button>

                    <a
                      href={reel.link || reel.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "#f1f4f8",
                        borderRadius: 8,
                        padding: "10px 12px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        color: "#333",
                      }}
                    >
                      Share
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {playing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${playing.title}`}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 20,
          }}
          onClick={() => setPlaying(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#000",
              maxWidth: "900px",
              width: "100%",
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <button
              onClick={() => setPlaying(null)}
              aria-label="Close player"
              style={{
                position: "absolute",
                right: 8,
                top: 8,
                zIndex: 1010,
                background: "rgba(255,255,255,0.9)",
                border: "none",
                borderRadius: 6,
                padding: "6px 8px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            {getYouTubeId(playing.src) ? (
              <iframe
                src={playing.src}
                title={playing.title}
                width="100%"
                height="500"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: "block", width: "100%", height: 500 }}
              />
            ) : (
              <div style={{ color: "#fff", padding: 24 }}>
                <p>
                  This content cannot be embedded inline.{' '}
                  <a
                    href={playing.link || playing.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#ffd54f" }}
                  >
                    Open in new tab
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReelsSection;