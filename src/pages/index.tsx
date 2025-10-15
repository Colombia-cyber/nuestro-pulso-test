import React, { useState } from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";
import ModernNewsGrid from "../components/ModernNewsGrid";
import { ReelsSection } from "../components/ReelsSection";
import FeaturedTopics from "../components/FeaturedTopics";
import ThankYouSection from "../components/ThankYouSection";
import { NewsTopic } from "../config/newsTopics";
import { NewsItem } from "../types/news";

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState<'local' | 'world'>('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [newsData] = useState<NewsItem[]>([]);

  const handleSearch = (query: string, category: 'local' | 'world', topic?: NewsTopic) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    // Implement search logic here
    console.log('Searching:', { query, category, topic });
  };

  const handleTopicSelect = (topic: NewsTopic) => {
    console.log('Topic selected:', topic);
  };

  const handleTopicSelectWithCategory = (topic: NewsTopic, category: 'local' | 'world') => {
    setSelectedCategory(category);
    console.log('Topic selected:', topic, 'Category:', category);
  };

  const handleArticleClick = (article: NewsItem) => {
    if (article.shareUrl) {
      window.open(article.shareUrl, "_blank");
    }
  };

  const handleSubmitFeedback = (feedback: any) => {
    console.log('Feedback submitted:', feedback);
  };

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <header style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "2rem 0 1rem 0", background: "#fff", boxShadow: "0 1px 8px rgba(0,0,0,0.04)"
      }}>
        <h1 style={{ fontWeight: 900, fontSize: "2.3rem", margin: 0, color: "#2563eb" }}>
          Nuestro Pulso
        </h1>
        <UniversalSearchBar
          placeholder="Busca noticias, debates, personas, lugares, videos..."
          onSearch={handleSearch}
          onTopicSelect={handleTopicSelect}
          className="mt-6 max-w-[540px] w-[90vw]"
        />
      </header>
      <main style={{ maxWidth: 960, margin: "2.5rem auto", padding: "0 1rem" }}>
        <section>
          <h2 style={{ color: "#2563eb", marginBottom: 12 }}>Noticias Destacadas</h2>
          <ModernNewsGrid
            newsData={newsData}
            searchQuery={searchQuery}
            onArticleClick={handleArticleClick}
          />
        </section>
        <section style={{ margin: "2rem 0" }}>
          <h2 style={{ color: "#2563eb", marginBottom: 12 }}>Reels y Videos</h2>
          <ReelsSection context={selectedCategory} />
        </section>
        <section style={{ margin: "2rem 0" }}>
          <FeaturedTopics
            onTopicSelect={handleTopicSelectWithCategory}
            selectedCategory={selectedCategory}
          />
        </section>
        <section style={{ margin: "2rem 0" }}>
          <button
            onClick={() => setShowFeedback(true)}
            style={{
              padding: "1rem 2rem",
              background: "#2563eb",
              color: "white",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Enviar Retroalimentación
          </button>
          <ThankYouSection
            isOpen={showFeedback}
            onClose={() => setShowFeedback(false)}
            searchQuery={searchQuery}
            searchResults={newsData.length}
            onSubmitFeedback={handleSubmitFeedback}
          />
        </section>
      </main>
    </div>
  );
}