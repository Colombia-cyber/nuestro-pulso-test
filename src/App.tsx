import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CustomNewsFeed from "./components/CustomNewsFeed";
import Comments from "./components/Comments";
import CommunityHub from "./pages/CommunityHub";
import SearchPage from "./pages/Search";
import Congress from "./pages/Congress";
import Elections from "./pages/Elections";
import LiveChat from "./pages/LiveChat";
import Debates from "./pages/Debates";
import Surveys from "./pages/Surveys";
import SearchResultPage from "./pages/SearchResultPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/congress" element={<Congress />} />
            <Route path="/elections" element={<Elections />} />
            <Route path="/news" element={<CustomNewsFeed />} />
            <Route path="/chat" element={<LiveChat />} />
            <Route path="/debates" element={<Debates />} />
            <Route path="/surveys" element={<Surveys />} />
            <Route path="/community-hub" element={<CommunityHub />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search-result/:id" element={<SearchResultPage />} />
            <Route path="/comments" element={<Comments />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;