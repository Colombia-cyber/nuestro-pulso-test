import React, { useState } from "react";
import { ReelsSection } from "./ReelsSection";

const WorldClassHomepage: React.FC = () => {
  const [context, setContext] = useState<"local" | "world">("local");

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
        <button
          style={{
            padding: "0.7rem 2.2rem",
            fontSize: "1.2rem",
            border: "none",
            borderRadius: "2rem",
            background: context === "local" ? "#2563eb" : "#e5e7eb",
            color: context === "local" ? "#fff" : "#111",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: context === "local" ? "0 2px 8px rgba(37,99,235,0.13)" : undefined
          }}
          onClick={() => setContext("local")}
        >
          🇨🇴 Colombia
        </button>
        <button
          style={{
            padding: "0.7rem 2.2rem",
            fontSize: "1.2rem",
            border: "none",
            borderRadius: "2rem",
            background: context === "world" ? "#2563eb" : "#e5e7eb",
            color: context === "world" ? "#fff" : "#111",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: context === "world" ? "0 2px 8px rgba(37,99,235,0.13)" : undefined
          }}
          onClick={() => setContext("world")}
        >
          🌎 Mundo
        </button>
      </div>
      <ReelsSection context={context} />
    </div>
  );
};

export default WorldClassHomepage;
