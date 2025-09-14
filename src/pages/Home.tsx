import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

interface HomeProps {
  onNavigate: (view: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div>
      <div className="pt-4">
        <HeroSection onNavigate={onNavigate} />
      </div>
    </div>
  );
}