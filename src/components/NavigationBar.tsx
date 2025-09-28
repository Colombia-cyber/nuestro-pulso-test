import { WorldClassTabs } from './WorldClassTabs';

export function NavigationBar() {
  return (
    <nav className="main-nav">
      <input type="search" placeholder="Search global news, videos, images..." className="search-bar" />
      <WorldClassTabs />
    </nav>
  );
}