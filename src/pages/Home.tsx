import React from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div>
      <Navigation currentView="home" onNavigate={() => {}} />
      <div className="pt-20">
        <HeroSection />
      </div>
    </div>
  );
}