import { useState } from 'react';
import { FeedCard } from './FeedCard';

const LOCAL_NEWS = [
  { title: 'Congress approves health reform in second debate', source: 'The Weather', timeAgo: '2 hours ago' },
  { title: 'President Petro announces new economic measures', source: 'Week', timeAgo: '3 hours ago' },
  { title: 'Operation against drug trafficking in Antioquia', source: 'RCN', timeAgo: '1 hour ago' },
];

const WORLD_NEWS = [
  { title: 'DONALD TRUMP GLOBAL', description: 'Latest news and analysis on Trump' },
  { title: 'WORLD TERRORISM', description: 'Global Security Event Tracking' },
  { title: 'WORLD RIGHT', description: 'Right-wing movements at a global level' },
  { title: 'WORLD LEFT', description: 'International left-wing movements' },
  { title: 'BEST DESTINATIONS', description: 'Tourism and recommended destinations' },
];

export function MainNewsView() {
  const [tab, setTab] = useState('local');

  return (
    <div>
      <div className="news-tabs" style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button
          className={tab === 'local' ? 'active' : ''}
          onClick={() => setTab('local')}
        >
          LOCAL
        </button>
        <button
          className={tab === 'world' ? 'active' : ''}
          onClick={() => setTab('world')}
        >
          WORLD
        </button>
      </div>

      {tab === 'local' && (
        <div className="local-news">
          {LOCAL_NEWS.map((item, i) => (
            <FeedCard key={i} item={item} />
          ))}
        </div>
      )}

      {tab === 'world' && (
        <div className="world-news">
          {WORLD_NEWS.map((item, i) => (
            <FeedCard key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}