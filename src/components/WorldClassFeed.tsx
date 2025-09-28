import React from 'react';
import { useWorldSearch } from '../hooks/useWorldSearch';
import { FeedCard } from './FeedCard';

export function WorldClassFeed({ onlyFeeds, personalized, trending }: {
  onlyFeeds?: boolean; personalized?: boolean; trending?: boolean;
}) {
  const { results, loading } = useWorldSearch({ onlyFeeds, personalized, trending });

  return (
    <div>
      {loading && <div className="loader">Loading...</div>}
      <div className="feed-grid">
        {results.map(item => (
          <FeedCard key={item.id} item={item} onOpen={() => window.open(item.url, '_blank')} />
        ))}
      </div>
    </div>
  );
}