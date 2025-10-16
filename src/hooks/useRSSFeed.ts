import { useEffect, useState } from "react";
import { fetchRSS } from "../utils/rss";

interface RSSItem {
  title: string;
  description: string;
  link: string;
  source: string;
}

export function useRSSFeed(url: string) {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchRSS(url)
      .then(data => {
        if (mounted) setItems(data);
      })
      .catch(err => {
        if (mounted) setError(err.message || "Error fetching RSS feed");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [url]);

  return { items, loading, error };
}