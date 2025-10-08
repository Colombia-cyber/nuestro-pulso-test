import React, { useState, useEffect } from "react";

const mockLocalNews = [
  { id: 1, title: "Alcaldía de Bogotá lanza nuevo programa social", source: "El Tiempo", time: "hace 1 hora" },
  { id: 2, title: "Medellín refuerza seguridad en el centro", source: "Semana", time: "hace 2 horas" },
  { id: 3, title: "Cali prepara festival cultural 2025", source: "RCN", time: "hace 30 min" }
];

const mockWorldNews = [
  { id: 1, title: "ONU alerta sobre cambio climático", source: "BBC", time: "2h ago" },
  { id: 2, title: "Innovaciones tecnológicas en Asia", source: "CNN", time: "3h ago" },
  { id: 3, title: "Crisis económica en Europa", source: "El País", time: "40m ago" }
];

const NewsCard = ({ title, source, time }) => (
  <div style={{
    background: "#fff", borderRadius: "1rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "1.2rem 1.4rem", marginBottom: "1.2rem"
  }}>
    <div style={{ fontWeight: 700 }}>{title}</div>
    <div style={{ color: "#666", fontSize: "0.9rem" }}>{source} • {time}</div>
  </div>
);

export default function Homepage() {
  const [context, setContext] = useState("local");
  const [localNews, setLocalNews] = useState(mockLocalNews);
  const [worldNews, setWorldNews] = useState(mockWorldNews);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLocalNews(mockLocalNews);
    setWorldNews(mockWorldNews);
  }, []);

  const showNews = context === "local" ? localNews : worldNews;

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <header style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "2rem 0 1rem 0", background: "#fff", boxShadow: "0 1px 8px rgba(0,0,0,0.04)"
      }}>
        <h1 style={{ fontWeight: 900, fontSize: "2.3rem", margin: 0, color: "#2563eb" }}>
          Nuestro Pulso
        </h1>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
          <button
            style={{
              padding: "0.7rem 2.2rem", fontSize: "1.2rem", border: "none", borderRadius: "2rem",
              background: context === "local" ? "#2563eb" : "#e5e7eb",
              color: context === "local" ? "#fff" : "#111", fontWeight: 700, cursor: "pointer",
              boxShadow: context === "local" ? "0 2px 8px rgba(37,99,235,0.13)" : undefined
            }}
            onClick={() => setContext("local")}
          >
            🇨🇴 Colombia
          </button>
          <button
            style={{
              padding: "0.7rem 2.2rem", fontSize: "1.2rem", border: "none", borderRadius: "2rem",
              background: context === "world" ? "#2563eb" : "#e5e7eb",
              color: context === "world" ? "#fff" : "#111", fontWeight: 700, cursor: "pointer",
              boxShadow: context === "world" ? "0 2px 8px rgba(37,99,235,0.13)" : undefined
            }}
            onClick={() => setContext("world")}
          >
            🌎 Mundo
          </button>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Busca noticias, debates, personas, lugares..."
          style={{
            marginTop: "2rem", padding: "0.9rem 2rem", borderRadius: "2rem",
            border: "1px solid #e5e7eb", fontSize: "1.1rem", width: "min(100vw, 490px)"
          }}
        />
      </header>
      <main style={{ maxWidth: 540, margin: "2.5rem auto", padding: "0 1rem" }}>
        <h2 style={{ fontSize: "1.4rem", color: "#2563eb", margin: "1.2rem 0 1rem 0" }}>
          {context === "local" ? "Noticias Colombia" : "Noticias del Mundo"}
        </h2>
        {showNews
          .filter(n => n.title.toLowerCase().includes(search.toLowerCase()))
          .map(n => <NewsCard key={n.id} {...n} />)}
      </main>
    </div>
  );
}