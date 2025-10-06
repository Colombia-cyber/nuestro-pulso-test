import React, { useState, useEffect } from "react";

// Environment keys (replace with process.env if using Node, or import.meta.env for Vite/React)
const NEWS_API_KEY = process.env.NEWSAPI_KEY || import.meta.env.NEWSAPI_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || import.meta.env.GOOGLE_API_KEY;
const GOOGLE_CSE_ID = process.env.GOOGLE_CSE_ID || import.meta.env.GOOGLE_CSE_ID;

const LOCAL_SOURCES = [
  { id: "semana", name: "Semana", url: "https://www.semana.com/", description: "Revista semanal con análisis político y social de Colombia" },
  { id: "portafolio", name: "Portafolio", url: "https://www.portafolio.co/", description: "Noticias económicas y financieras de Colombia" },
  { id: "colombia-reports", name: "Colombia Reports", url: "https://colombiareports.com/", description: "Independent English news from Colombia" }
];

function fetchGoogleResults(query: string, local: boolean) {
  // Uses Google Custom Search API if keys are set
  if (!GOOGLE_API_KEY || !GOOGLE_CSE_ID) return Promise.resolve([]);
  const cx = GOOGLE_CSE_ID;
  const q = local ? `${query} Colombia` : query;
  return fetch(
    `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${cx}&q=${encodeURIComponent(q)}&num=10`
  )
    .then((res) => res.json())
    .then((data) => data.items || []);
}

function fetchNewsApiResults(query: string, local: boolean) {
  if (!NEWS_API_KEY) return Promise.resolve([]);
  const q = local ? `${query} Colombia` : query;
  return fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${NEWS_API_KEY}&language=es&sortBy=publishedAt&pageSize=10`
  )
    .then((res) => res.json())
    .then((data) => data.articles || []);
}

function fetchLocalSourceArticles(query: string) {
  // Simulates fetching from local RSS or APIs
  // In production, replace this with actual API fetches
  return Promise.resolve(
    LOCAL_SOURCES.map((src) => ({
      title: `${query} en ${src.name}`,
      description: src.description,
      url: src.url
    }))
  );
}

export default function HomeSearchBar() {
  const [mode, setMode] = useState<"local" | "world">("local");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResults([]);
  }, [mode]);

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);
    const local = mode === "local";
    const [googleResults, newsApiResults, localArticles] = await Promise.all([
      fetchGoogleResults(query, local),
      fetchNewsApiResults(query, local),
      local ? fetchLocalSourceArticles(query) : Promise.resolve([])
    ]);
    setResults([
      ...googleResults.map(item => ({
        type: "google",
        title: item.title,
        description: item.snippet,
        url: item.link
      })),
      ...newsApiResults.map(article => ({
        type: "newsapi",
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source?.name
      })),
      ...localArticles.map(article => ({
        type: "local",
        title: article.title,
        description: article.description,
        url: article.url
      }))
    ]);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <button
          style={{
            background: mode === "local" ? "#11998e" : "#eee",
            color: mode === "local" ? "#fff" : "#333",
            padding: "0.5rem 1rem",
            borderRadius: 8,
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => setMode("local")}
        >
          Local
        </button>
        <button
          style={{
            background: mode === "world" ? "#396afc" : "#eee",
            color: mode === "world" ? "#fff" : "#333",
            padding: "0.5rem 1rem",
            borderRadius: 8,
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => setMode("world")}
        >
          World
        </button>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={`Search ${mode === "local" ? "locally (Colombia)" : "worldwide"}...`}
          style={{ flex: 1, padding: "0.75rem", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: "#2948ff",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Search
        </button>
      </div>
      <div style={{ marginTop: "2rem" }}>
        {loading && <div>Loading...</div>}
        {!loading && results.length === 0 && <div>No results yet.</div>}
        {results.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((res, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  borderRadius: 12,
                  background: res.type === "local" ? "#e3ffe8" : res.type === "newsapi" ? "#e8f0fe" : "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                }}
              >
                <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold", fontSize: 18, color: "#2948ff" }}>
                  {res.title}
                </a>
                <div style={{ fontSize: 15, marginTop: 4 }}>{res.description}</div>
                {res.source && <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Source: {res.source}</div>}
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>Type: {res.type}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}