import { useState, useEffect } from "react";
import { Status } from "./Status";
import { SkeletonList } from "./SkeletonList";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  guid: string;
}

interface RSSFeedProps {
  url: string;
}

export function RSSFeed({ url }: RSSFeedProps) {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      setError(null);
      try {
        // Using rss2json as a CORS proxy for RSS feeds
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error(data.message || "RSS feed error");
        }

        const feedItems: FeedItem[] = data.items?.map((item: any, index: number) => ({
          title: item.title || "Untitled",
          link: item.link || "#",
          pubDate: item.pubDate || new Date().toISOString(),
          description: item.description || "",
          guid: item.guid || `${item.link}-${index}`,
        })) || [];

        setItems(feedItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch RSS feed");
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchFeed();
    }
  }, [url]);

  if (loading) return <SkeletonList count={3} />;
  if (error) return <Status error={error} />;
  if (items.length === 0) return <p>No feed items available.</p>;

  return (
    <div className="rss-feed">
      {items.map((item) => (
        <article key={item.guid} className="feed-item">
          <h3>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </h3>
          {item.description && (
            <p>{item.description.replace(/<[^>]*>/g, '').substring(0, 200)}...</p>
          )}
          <small>{new Date(item.pubDate).toLocaleDateString()}</small>
        </article>
      ))}
    </div>
  );
}