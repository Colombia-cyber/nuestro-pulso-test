import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div>
      <NavBar 
        activeModule="home"
        setActiveModule={() => {}}
      />
      <div className="pt-20">
        <HeroSection />
      </div>
    </div>
  );
}