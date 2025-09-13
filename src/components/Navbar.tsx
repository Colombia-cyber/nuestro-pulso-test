import React from "react";
import GoogleWebSearchBar from "./GoogleWebSearchBar";

const Navbar: React.FC = () => (
  <nav style={{padding: '1rem', background: '#073e8e', color: '#fff', display: 'flex', alignItems: 'center', gap: '2rem'}}>
    {/* ...other navbar content... */}
    <img src="/logo.png" alt="Logo" style={{height: 40}} />
    <div style={{flex: 1}}>
      <GoogleWebSearchBar />
    </div>
    {/* ...user profile, links, etc... */}
  </nav>
);

export default Navbar;