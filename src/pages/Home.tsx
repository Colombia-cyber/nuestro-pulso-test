import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view: string) => {
    console.log(`Navigating to: ${view}`);
    setCurrentView(view);
    // TODO: Add proper navigation logic
  };

  return (
    <div>
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <div className="pt-20">
        <HeroSection onNavigate={handleNavigate} />
      </div>
    </div>
  );
}