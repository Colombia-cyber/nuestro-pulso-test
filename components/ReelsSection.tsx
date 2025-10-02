import React, { useEffect, useState } from "react";

interface Reel {
  id: string;
  type: "video" | "image" | "news";
  src: string;
  title: string;
  description?: string;
  link?: string;
}

const demoReels: Reel[] = [
  {
    id: "1",
    type: "video",
    src: "https://www.youtube.com/embed/jNQXAC9IVRw",
    title: "Trending Video Reel",
    description: "Lo último en tendencias globales.",
    link: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  },
  {
    id: "2",
    type: "news",
    src: "",
    title: "Noticia Destacada",
    description: "El mundo reacciona a las últimas noticias.",
    link: "https://news.google.com/",
  },
  {
    id: "3",
    type: "image",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Foto Impactante",
    description: "Un vistazo a los eventos recientes.",
    link: "https://unsplash.com/photos/1506744038136-46273834b3fb",
  },
];

const cardStyle: React.CSSProperties = {
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
};

export const ReelsSection: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>(demoReels);

  useEffect(() => {
    // TODO: Fetch live reels from APIs here.
    // setReels(await fetchReelsFromAPI());
  }, []);

  return (
    <section aria-labelledby="reels-title" style={{ margin: "2.5rem 0" }}>
      <h2 id="reels-title" style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
        Reels — Tendencias al Instante
      </h2>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
        {reels.map((reel) => (
          <div key={reel.id} style={cardStyle}>
            {reel.type === "video" && (
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
            )}
            {reel.type === "image" && (
              <img
                src={reel.src}
                alt={reel.title}
                style={{ width: "100%", borderRadius: "0.8rem", marginBottom: "1rem", maxHeight: "180px", objectFit: "cover" }}
              />
            )}
            {reel.type === "news" && (
              <div style={{
                width: "100%",
                height: "180px",
                background: "linear-gradient(45deg,#4A7AC9 30%,#C94A7F 90%)",
                color: "#fff",
                borderRadius: "0.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                marginBottom: "1rem"
              }}>
                📰
              </div>
            )}

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600 }}>{reel.title}</h3>
            <p style={{ fontSize: "0.98rem", opacity: 0.85, margin: "0.5rem 0" }}>{reel.description}</p>
            {reel.link && (
              <a
                href={reel.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "0.3rem",
                  color: "#4A7AC9",
                  fontWeight: 500,
                  textDecoration: "underline",
                  fontSize: "0.95rem"
                }}
              >
                Ver más
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReelsSection;
