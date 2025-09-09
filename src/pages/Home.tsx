import React from "react";
import NavBar from "../components/NavBar";
import HeroSection from "../../HeroSection";

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