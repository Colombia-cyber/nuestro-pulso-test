import { useState, useEffect } from 'react';
import { aiVideoSearch } from '../services/aiVideoSearch';

export function useWorldSearch({ onlyFeeds, personalized, trending }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    aiVideoSearch({
      onlyFeeds,
      personalized,
      trending,
      apiKey: import.meta.env.VITE_YOUTUBE_API_KEY,
      endpoint: import.meta.env.VITE_API_URL
    })
      .then(data => {
        setResults(data);
        setLoading(false);
      });
  }, [onlyFeeds, personalized, trending]);
  return { results, loading };
}