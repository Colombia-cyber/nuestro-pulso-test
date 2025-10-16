import { useState } from "react";
import { Layout } from "./components/Layout";
import { YouTubeFeed } from "./components/YouTubeFeed";
import { RSSFeed } from "./components/RSSFeed";
import { FeedSelector } from "./components/FeedSelector";
import { SearchBar } from "./components/SearchBar";
import { RefreshButton } from "./components/RefreshButton";
import "./index.css";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "";
const DEFAULT_CHANNEL_ID = "UC_x5XG1OV2P6uZZ5FSM9Ttw";

export default function App() {
  const [rssUrl, setRssUrl] = useState("https://news.google.com/rss");
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Layout title="Nuestro Pulso - Modern News Dashboard">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0 }}>Stay Informed</h2>
        <RefreshButton onRefresh={handleRefresh} />
      </div>
      
      <section>
        <h3>YouTube Videos</h3>
        <SearchBar onSearch={setSearch} />
        <YouTubeFeed key={`youtube-${refreshKey}`} apiKey={YOUTUBE_API_KEY} channelId={DEFAULT_CHANNEL_ID} search={search} />
      </section>
      
      <hr />
      
      <section>
        <h3>News Feed</h3>
        <FeedSelector onSelect={setRssUrl} />
        <RSSFeed key={`rss-${refreshKey}`} url={rssUrl} />
      </section>
    </Layout>
  );
}