import React from 'react';

const topics = [
  { label: 'DONALD TRUMP GLOBAL', query: 'Donald Trump global', color: 'linear-gradient(90deg,#d53369 0,#daae51 100%)', icon: '🇺🇸' },
  { label: 'WORLD TERRORISM', query: 'World Terrorism', color: 'linear-gradient(90deg,#ff512f 0,#dd2476 100%)', icon: '⚠️' },
  { label: 'WORLD RIGHT', query: 'World Right', color: 'linear-gradient(90deg,#396afc 0,#2948ff 100%)', icon: '🧑🏽‍💼' },
  { label: 'WORLD LEFT', query: 'World Left', color: 'linear-gradient(90deg,#fc00ff 0,#00dbde 100%)', icon: '✊' },
  { label: 'BEST DESTINATIONS', query: 'Best destinations tourism', color: 'linear-gradient(90deg,#11998e 0,#38ef7d 100%)', icon: '✈️' },
];

const colombiaInfo = [
  { label: 'Congress of Colombia', query: 'Congress of Colombia', color: 'linear-gradient(90deg,#396afc 0,#2948ff 100%)', icon: '🏛️' },
  { label: 'National security', query: 'Colombia national security', color: 'linear-gradient(90deg,#ff512f 0,#dd2476 100%)', icon: '🚓' },
  { label: 'Gustavo Petro', query: 'Gustavo Petro Colombia', color: 'linear-gradient(90deg,#11998e 0,#38ef7d 100%)', icon: '🇨🇴' },
  { label: 'Political Perspectives', query: 'Colombia left right analysis', color: 'linear-gradient(90deg,#fc00ff 0,#00dbde 100%)', icon: '📊' },
];

function openGoogleSearch(query: string) {
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
}

function openYouTubeSearch(query: string) {
  window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
}

function openWikipediaSearch(query: string) {
  window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(query.replace(/\s+/g,'_'))}`, '_blank', 'noopener,noreferrer');
}

export default function GlobalWorldDashboard() {
  return (
    <main>
      <header className="dashboard-header">
        <img src="/logo.png" alt="Our Pulse Logo" className="logo" />
        <h1>GLOBAL/WORLD</h1>
        <div>International trends and news</div>
      </header>
      <section className="topic-section">
        {topics.map(topic => (
          <div
            key={topic.label}
            style={{ background: topic.color, borderRadius: '20px', padding: '2rem', margin: '1rem', cursor: 'pointer', color: '#fff', display: 'inline-block', minWidth: 220 }}
            onClick={() => openGoogleSearch(topic.query)}
            aria-label={`Search Google for ${topic.label}`}
            tabIndex={0}
            role="button"
          >
            <div style={{ fontSize: 32 }}>{topic.icon}</div>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{topic.label}</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>Latest news and analysis</div>
            <div>
              <button onClick={e=>{e.stopPropagation();openGoogleSearch(topic.query)}} style={{marginRight:8}}>Google</button>
              <button onClick={e=>{e.stopPropagation();openYouTubeSearch(topic.query)}} style={{marginRight:8}}>YouTube</button>
              <button onClick={e=>{e.stopPropagation();openWikipediaSearch(topic.label)}}>Wikipedia</button>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h2>Key Information about Colombia</h2>
        <div className="info-section">
          {colombiaInfo.map(info => (
            <div
              key={info.label}
              style={{ background: info.color, borderRadius: '20px', padding: '2rem', margin: '1rem', cursor: 'pointer', color: '#fff', display: 'inline-block', minWidth: 220 }}
              onClick={() => openGoogleSearch(info.query)}
              aria-label={`Search Google for ${info.label}`}
              tabIndex={0}
              role="button"
            >
              <div style={{ fontSize: 32 }}>{info.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: 18 }}>{info.label}</div>
              <div style={{ fontSize: 14 }}>Direct access to latest info</div>
              <div>
                <button onClick={e=>{e.stopPropagation();openGoogleSearch(info.query)}} style={{marginRight:8}}>Google</button>
                <button onClick={e=>{e.stopPropagation();openYouTubeSearch(info.query)}} style={{marginRight:8}}>YouTube</button>
                <button onClick={e=>{e.stopPropagation();openWikipediaSearch(info.label)}}>Wikipedia</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
