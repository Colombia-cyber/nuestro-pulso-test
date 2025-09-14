import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  const handleNavigate = (view: string) => {
    console.log('Navigate to:', view);
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