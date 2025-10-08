import React from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";
import ModernNewsGrid from "../components/ModernNewsGrid";
import ReelsSection from "../components/ReelsSection";
import FeaturedTopics from "../components/FeaturedTopics";
import ThankYouSection from "../components/ThankYouSection";

export default function Homepage() {
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
          style={{ marginTop: "1.5rem", maxWidth: "540px", width: "90vw" }}
        />
      </header>
      <main style={{ maxWidth: 960, margin: "2.5rem auto", padding: "0 1rem" }}>
        <section>
          <h2 style={{ color: "#2563eb", marginBottom: 12 }}>Noticias Destacadas</h2>
          <ModernNewsGrid
            onCardClick={url => window.open(url, "_blank")}
            showSource
            showTime
            showReadMore
          />
        </section>
        <section style={{ margin: "2rem 0" }}>
          <h2 style={{ color: "#2563eb", marginBottom: 12 }}>Reels y Videos</h2>
          <ReelsSection
            onReelClick={url => window.open(url, "_blank")}
            showPlayButton
          />
        </section>
        <section style={{ margin: "2rem 0" }}>
          <FeaturedTopics
            onTopicClick={url => window.open(url, "_blank")}
            showTrending
            showCategory
          />
        </section>
        <section style={{ margin: "2rem 0" }}>
          <ThankYouSection
            onCommunityLink={url => window.open(url, "_blank")}
            showShare
            showFeedback
          />
        </section>
      </main>
    </div>
  );
}