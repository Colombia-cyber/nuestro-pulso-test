import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CivicModulesGrid from "./components/CivicModulesGrid";
import NewsFeed from "./components/NewsFeed";
import Footer from "./components/Footer";
import OnboardingTour from "./components/OnboardingTour";

function App() {
  return (
    <div className="min-h-screen bg-colombia-gradient">
      <Navbar />
      <OnboardingTour />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Civic Modules */}
      <CivicModulesGrid />
      
      {/* News Feed */}
      <NewsFeed />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;