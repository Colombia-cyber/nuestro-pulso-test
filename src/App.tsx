import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./HomePage";
import News from "./components/News";
import PulseReels from "./components/PulseReels";
import Debate from "./components/Debate";
import Survey from "./components/Survey";
import LiveChat from "./components/LiveChat";
import CommunityHub from "./components/CommunityHub";
import SearchPage from "./components/SearchPage";
import Settings from "./components/Settings";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pt-16"> {/* Account for fixed navbar */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/inicio" element={<HomePage />} />
              <Route path="/noticias" element={<News />} />
              <Route path="/reels" element={<PulseReels />} />
              <Route path="/debates" element={<Debate />} />
              <Route path="/encuestas" element={<Survey />} />
              <Route path="/chat" element={<LiveChat />} />
              <Route path="/comunidad" element={<CommunityHub />} />
              <Route path="/buscar" element={<SearchPage />} />
              <Route path="/configuracion" element={<Settings />} />
              <Route path="/explorar" element={<SearchPage />} />
              <Route path="/participar" element={<CommunityHub />} />
              <Route path="/acerca" element={<HomePage />} />
              {/* Catch-all route for 404s */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;