import React from "react";
import UniversalSearchBar from "../components/UniversalSearchBar";

interface SearchPageProps {
  initialQuery?: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ initialQuery = '' }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <UniversalSearchBar initialQuery={initialQuery} />
    </div>
  );
};

export default SearchPage;