import React from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";

interface SearchPageProps {
  onNavigate?: (view: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onNavigate }) => (
  <div className="container mx-auto px-4 py-8">
    <UniversalSearchBar onNavigate={onNavigate} />
  </div>
);

export default SearchPage;