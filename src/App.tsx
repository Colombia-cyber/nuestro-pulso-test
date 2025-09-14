import React from "react";
import Navigation from "./components/Navigation";
import GoogleWebSearchBar from "./components/GoogleWebSearchBar";

function App() {
  return (
    <div>
      <Navigation currentView="home" onNavigate={() => {}} />
      {/* Universal fallback: visible on all routes */}
      <GoogleWebSearchBar />
      {/* ...rest of your app, routes, sections... */}
    </div>
  );
}

export default App;