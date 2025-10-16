import React from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";
import ModernNewsGrid from "../components/ModernNewsGrid";
import { ReelsSection } from "../components/ReelsSection";
import FeaturedTopics from "../components/FeaturedTopics";
import ThankYouSection from "../components/ThankYouSection";
import { NewsTopic } from "../config/newsTopics";

export default function Homepage() {
  const handleSearch = (query: string, category: 'local' | 'world', topic?: NewsTopic) => {
    console.log("Search:", query, category, topic);
  };

  const handleTopicSelect = (topic: NewsTopic, category?: 'local' | 'world') => {
    console.log("Topic selected:", topic, category);
  };

  const handleFeedbackClose = () => {
    console.log("Feedback closed");
  };

  const handleSubmitFeedback = (feedback: string) => {
    console.log("Feedback submitted:", feedback);
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
        />
      </header>
      <main style={{ maxWidth: 960, margin: "2.5rem auto", padding: "0 1rem" }}>
        <section>
          <h2 style={{ color: "#2563eb", marginBottom: 12 }}>Noticias Destacadas</h2>
          <ModernNewsGrid
            newsData={[]}
          />
        </section>
        <section style={{ margin: "2rem 0" }}>
          <h2 style={{ color: "#2563eb", marginBottom: 12 }}>Reels y Videos</h2>
          <ReelsSection context="local" />
        </section>
        <section style={{ margin: "2rem 0" }}>
          <FeaturedTopics onTopicSelect={handleTopicSelect} selectedCategory="local" />
        </section>
        <section style={{ margin: "2rem 0" }}>
          <ThankYouSection isOpen={false} onClose={handleFeedbackClose} onSubmitFeedback={handleSubmitFeedback} />
        </section>
      </main>
    </div>
  );
}