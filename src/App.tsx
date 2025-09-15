import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import GoogleWebSearchBar from "./components/GoogleWebSearchBar";
import HomePage from "./HomePage";
import News from "./components/News";
import CongressTracker from "./components/CongressTracker";
import Debate from "./components/Debate";
import Survey from "./components/Survey";
import PulseReels from "./components/PulseReels";

// Topic detail pages
import TechnologyPage from "./pages/TechnologyPage";
import DonaldTrumpPage from "./pages/DonaldTrumpPage";

// Layout wrapper to apply background conditionally
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Apply different backgrounds based on route
  const getBackgroundClass = () => {
    if (location.pathname === '/') return 'bg-colombia-landscape';
    if (location.pathname.includes('/trump')) return 'bg-colombia-vibrant';
    return 'min-h-screen'; // Default background from body CSS
  };

  return (
    <div className={`${getBackgroundClass()} min-h-screen smooth-transition`}>
      <Navbar />
      <GoogleWebSearchBar />
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/congreso" element={<CongressTracker />} />
          <Route path="/debates" element={<Debate />} />
          <Route path="/encuestas" element={<Survey />} />
          <Route path="/reels" element={<PulseReels />} />
          
          {/* Topic detail pages */}
          <Route path="/tecnologia" element={<TechnologyPage />} />
          <Route path="/trump" element={<DonaldTrumpPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;