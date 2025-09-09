import React from "react";
import StickyNavBar from "../components/StickyNavBar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen font-inter">
      <StickyNavBar />
      <HeroSection />
      {/* Add more homepage sections below */}
    </div>
  );
}
