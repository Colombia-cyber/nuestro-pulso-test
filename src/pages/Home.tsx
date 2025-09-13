import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <HeroSection />
      </div>
    </div>
  );
}