import { useState } from "react";
import { Layout } from "./components/Layout";
import { YouTubeFeed } from "./components/YouTubeFeed";
import { RSSFeed } from "./components/RSSFeed";
import { FeedSelector } from "./components/FeedSelector";
import { SearchBar } from "./components/SearchBar";
import "./index.css";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || process.env.REACT_APP_YOUTUBE_API_KEY!;
const DEFAULT_CHANNEL_ID = "UC_x5XG1OV2P6uZZ5FSM9Ttw";

export default function App() {
  const [rssUrl, setRssUrl] = useState("https://news.google.com/rss");
  const [search, setSearch] = useState("");

  return (
    <Layout title="My Modern Dashboard">
      <section>
        <h2>YouTube Videos</h2>
        <SearchBar onSearch={setSearch} />
        <YouTubeFeed apiKey={YOUTUBE_API_KEY} channelId={DEFAULT_CHANNEL_ID} search={search} />
      </section>
      <hr />
      <section>
        <FeedSelector onSelect={setRssUrl} />
        <RSSFeed url={rssUrl} />
      </section>
    </Layout>
  );
}