import React, { useEffect, useState } from "react";
// Import new dedicated pages
export { default as LeftWing } from './LeftWing';
export { default as RightWing } from './RightWing';
export { default as Home } from './Home';
export { default as Search } from './Search';
export { default as EnhancedSearch } from './EnhancedSearch';
export { default as CommunityHub } from './CommunityHub';

// Replace these imports with actual component paths if needed
// import SectionTabs from "../components/SectionTabs";
// import ReelsFeed from "../components/ReelsFeed";
// import ArticleCard from "../components/ArticleCard";
// import ArticleModal from "../components/ArticleModal";
// import { fetchGoogleNews } from "../lib/googleNews";
// import "../styles/tailwind.css";

const fakeArticles = [
  {
    title: "Bienvenido a Nuestro Pulso",
    description: "Esta es una página de noticias moderna para Colombia.",
    url: "#",
  },
  {
    title: "Ejemplo de titular de noticia",
    description: "¡Aquí verás las noticias más importantes de Colombia y el mundo!",
    url: "#",
  },
];

export default function HomePage() {
  // For now, just show fake articles to make sure it works
  const [articles] = useState(fakeArticles);

  return (
    <div style={{ background: "linear-gradient(135deg, #ffecb3 0%, #ffd54f 100%)", minHeight: "100vh" }}>
      <header style={{ padding: 24, background: "linear-gradient(90deg,#ffe082,#ffb300)", color: "#333", fontWeight: 700, fontSize: 32, display: "flex", alignItems: "center", gap: 16 }}>
        <span role="img" aria-label="flag">🇨🇴</span> Nuestro Pulso
      </header>
      <main style={{ padding: 24 }}>
        {articles.map((article, i) => (
          <div key={i} style={{ background: "#fffde7", marginBottom: 16, padding: 16, borderRadius: 8, boxShadow: "0 2px 6px #fff8e1" }}>
            <h2 style={{ margin: 0, fontSize: 20 }}>{article.title}</h2>
            <p style={{ margin: "8px 0" }}>{article.description}</p>
            <a href={article.url} style={{ color: "#039be5" }}>Leer más</a>
          </div>
        ))}
      </main>
    </div>
  );
}
