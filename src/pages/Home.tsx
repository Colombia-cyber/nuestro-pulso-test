import React from "react";
import GlobalMundoSection from "../components/GlobalMundoSection";
// Import additional components as you build them:
// import ReelsSection from "../components/ReelsSection";
// import PollsSection from "../components/PollsSection";
// import SearchTabs from "../components/SearchTabs";
// import CommunityHubLink from "../components/CommunityHubLink";

const Home: React.FC = () => {
  return (
    <main style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          padding: "2rem 0 1rem",
          background: "linear-gradient(90deg,#4A7AC9 0%,#C94A7F 100%)",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <h1 style={{ fontSize: "2.8rem", fontWeight: 800 }}>
          Nuestro Pulso — Noticias & Tendencias
        </h1>
        <p style={{ fontSize: "1.4rem", marginTop: "0.8rem", opacity: 0.94 }}>
          Descubre el mundo: Noticias, Reels, Encuestas, Comunidad y más.
        </p>
      </header>

      {/* Search Tabs (global/local/help) */}
      {/* <SearchTabs /> */}

      {/* Trending Reels */}
      {/* <ReelsSection /> */}

      {/* Polls */}
      {/* <PollsSection /> */}

      {/* World News Section */}
      <section style={{ margin: "3rem auto", maxWidth: "1200px" }}>
        <GlobalMundoSection />
      </section>

      {/* Community Hub Link */}
      {/* <CommunityHubLink /> */}

      {/* Footer */}
      <footer
        style={{
          marginTop: "3rem",
          padding: "2rem 0",
          background: "#212529",
          color: "#fff",
          textAlign: "center",
          fontSize: "1rem",
          opacity: 0.85,
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Nuestro Pulso. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
};

export default Home;
