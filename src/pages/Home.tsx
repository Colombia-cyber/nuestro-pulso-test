import React from "react";
import NavBar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="pt-20">
        <HeroSection />
      </div>
    </div>
  );
}