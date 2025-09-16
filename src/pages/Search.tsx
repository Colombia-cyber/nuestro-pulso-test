import React from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";

const SearchPage: React.FC = () => {
  // Get URL parameters for initial search
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  const initialCategory = urlParams.get('category') || 'todos';

  return (
    <div className="container mx-auto px-4 py-8">
      <UniversalSearchBar 
        initialQuery={initialQuery}
        initialCategory={initialCategory}
      />
    </div>
  );
};

export default SearchPage;