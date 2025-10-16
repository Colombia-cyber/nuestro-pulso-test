export default function NotFound() {
  return (
    <div className="not-found-page" style={{ textAlign: "center", padding: "4rem 2rem" }}>
      <h1 style={{ fontSize: "6rem", margin: "0" }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <div style={{ marginTop: "2rem" }}>
        <a href="/" style={{ 
          padding: "0.75rem 1.5rem", 
          backgroundColor: "#003087", 
          color: "white", 
          textDecoration: "none", 
          borderRadius: "4px",
          display: "inline-block"
        }}>
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
