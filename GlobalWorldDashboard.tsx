import React from 'react';

const topics = [
  { label: 'DONALD TRUMP GLOBAL', query: 'Donald Trump global', icon: '🇺🇸', color: 'linear-gradient(90deg,#d53369 0,#daae51 100%)' },
  { label: 'WORLD TERRORISM', query: 'World Terrorism', icon: '⚠️', color: 'linear-gradient(90deg,#ff512f 0,#dd2476 100%)' },
  { label: 'WORLD RIGHT', query: 'World Right', icon: '🧑🏽‍💼', color: 'linear-gradient(90deg,#396afc 0,#2948ff 100%)' },
  { label: 'WORLD LEFT', query: 'World Left', icon: '✊', color: 'linear-gradient(90deg,#fc00ff 0,#00dbde 100%)' },
  { label: 'BEST DESTINATIONS', query: 'Best destinations tourism', icon: '✈️', color: 'linear-gradient(90deg,#11998e 0,#38ef7d 100%)' },
];

const colombiaInfo = [
  { label: 'Congress of Colombia', query: 'Congress of Colombia', icon: '🏛️', color: 'linear-gradient(90deg,#396afc 0,#2948ff 100%)' },
  { label: 'National security', query: 'Colombia national security', icon: '🚓', color: 'linear-gradient(90deg,#ff512f 0,#dd2476 100%)' },
  { label: 'Gustavo Petro', query: 'Gustavo Petro Colombia', icon: '🇨🇴', color: 'linear-gradient(90deg,#11998e 0,#38ef7d 100%)' },
  { label: 'Political Perspectives', query: 'Colombia left right analysis', icon: '📊', color: 'linear-gradient(90deg,#fc00ff 0,#00dbde 100%)' },
];

function openGoogle(query: string) {
  window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
}

function openYouTube(query: string) {
  window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
}

function openWikipedia(query: string) {
  window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(query.replace(/\s+/g,'_'))}`, '_blank', 'noopener,noreferrer');
}

export default function GlobalWorldDashboard() {
  return (
    <main style={{fontFamily:'Roboto,sans-serif'}}>
      <header style={{textAlign:'center',margin:'2rem 0'}}>
        <img src="/logo.png" alt="Our Pulse Logo" className="logo" />
        <h1>GLOBAL/WORLD</h1>
        <div>International trends and news</div>
      </header>
      <section style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'2rem',marginBottom:'2rem'}}>
        {topics.map(topic => (
          <div
            key={topic.label}
            style={{
              background: topic.color,
              borderRadius: '20px',
              padding: '2rem',
              cursor: 'pointer',
              color: '#fff',
              minWidth: 220,
              maxWidth: 320,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }}
            onClick={() => openGoogle(topic.query)}
            aria-label={`Search Google for ${topic.label}`}
            tabIndex={0}
            role="button"
          >
            <div style={{ fontSize: 32 }}>{topic.icon}</div>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>{topic.label}</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>Latest news and analysis</div>
            <div style={{marginTop:12}}>
              <button onClick={e=>{e.stopPropagation();openGoogle(topic.query)}} style={{marginRight:8}}>Google</button>
              <button onClick={e=>{e.stopPropagation();openYouTube(topic.query)}} style={{marginRight:8}}>YouTube</button>
              <button onClick={e=>{e.stopPropagation();openWikipedia(topic.label)}}>Wikipedia</button>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h2 style={{textAlign:"center"}}>Key Information about Colombia</h2>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'2rem'}}>
          {colombiaInfo.map(info => (
            <div
              key={info.label}
              style={{
                background: info.color,
                borderRadius: '20px',
                padding: '2rem',
                cursor: 'pointer',
                color: '#fff',
                minWidth: 220,
                maxWidth: 320,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
              }}
              onClick={() => openGoogle(info.query)}
              aria-label={`Search Google for ${info.label}`}
              tabIndex={0}
              role="button"
            >
              <div style={{ fontSize: 32 }}>{info.icon}</div>
              <div style={{ fontWeight: 'bold', fontSize: 18 }}>{info.label}</div>
              <div style={{ fontSize: 14 }}>Direct access to latest info</div>
              <div style={{marginTop:12}}>
                <button onClick={e=>{e.stopPropagation();openGoogle(info.query)}} style={{marginRight:8}}>Google</button>
                <button onClick={e=>{e.stopPropagation();openYouTube(info.query)}} style={{marginRight:8}}>YouTube</button>
                <button onClick={e=>{e.stopPropagation();openWikipedia(info.label)}}>Wikipedia</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}