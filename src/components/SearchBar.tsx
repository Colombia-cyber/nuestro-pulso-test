import { useState } from "react";

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSearch(query.trim());
      }}
      style={{ margin: "1em 0" }}
    >
      <input
        type="search"
        placeholder="Search YouTube videos…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: "0.5em", width: "60%" }}
      />
      <button type="submit" style={{ marginLeft: 8, padding: "0.5em 1em" }}>
        Search
      </button>
    </form>
  );
}