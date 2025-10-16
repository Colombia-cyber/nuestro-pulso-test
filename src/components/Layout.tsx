import React from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Layout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="container">
      <header>
        <h1>{title}</h1>
        <ThemeToggle />
        <hr />
      </header>
      <main>{children}</main>
      <footer>
        <hr />
        <div>
          © {new Date().getFullYear()} Your Site Name — Powered by YouTube & RSS APIs |
          <a href="https://github.com/Colombia-cyber/nuestro-pulso-test" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}