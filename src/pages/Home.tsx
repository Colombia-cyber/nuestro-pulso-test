import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  const handleNavigate = (view: string) => {
    // Navigate to different sections/pages
    console.log(`Navigating to: ${view}`);
    // For now, we'll just log the navigation
    // In a real app, this would use React Router or similar
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