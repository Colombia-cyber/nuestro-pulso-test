import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  const handleNavigate = (view: string) => {
    console.log(`Navigating to: ${view}`);
    // TODO: Add proper navigation logic
  };

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <HeroSection onNavigate={handleNavigate} />
      </div>
    </div>
  );
}