import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EnhancedSearchBar from "./components/EnhancedSearchBar";
import Debate from "./components/Debate";
import EnhancedNews from "./components/EnhancedNews";
import CommunityHub from "./components/CommunityHub";
import Settings from "./components/Settings";
import SearchResults from "./components/SearchResults";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);

  const handleNavigate = (view: string) => {
    if (view === 'debates') {
      navigate('/debates');
    } else if (view === 'news') {
      navigate('/news');
    } else if (view === 'community') {
      navigate('/community');
    } else if (view === 'search') {
      setSearchVisible(true);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
      
      {/* Enhanced Universal Search Bar */}
      <EnhancedSearchBar 
        visible={searchVisible || location.pathname === '/search'} 
        onClose={() => setSearchVisible(false)}
        onNavigate={handleNavigate}
      />
      
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/debates" element={<Debate />} />
          <Route path="/news" element={<EnhancedNews />} />
          <Route path="/community" element={<CommunityHub />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;