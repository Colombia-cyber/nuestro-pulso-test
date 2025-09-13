import React, { useState } from 'react';

const GOOGLE_API_KEY = "AIzaSyB1wdNIgV2qUdJ8lUzjhKoRnYHpwi_QAWQ";
const GOOGLE_CX = "b1da68d0c729b40ae";

async function searchGoogleAPI(query: string) {
  const params = new URLSearchParams({
    key: GOOGLE_API_KEY,
    cx: GOOGLE_CX,
    q: query,
  });
  const url = `https://www.googleapis.com/customsearch/v1?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al buscar en Google");
  const data = await res.json();
  return data.items || [];
}

const GoogleWebSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discussId, setDiscussId] = useState<string | null>(null);
  const [threads, setThreads] = useState<{[key: string]: { user: string, text: string }[] }>({});
  const [comment, setComment] = useState('');

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDiscussId(null);
    try {
      const googleResults = await searchGoogleAPI(query);
      setResults(googleResults);
    } catch (err: any) {
      setError("Error al buscar en Google.");
    }
    setLoading(false);
  }

  function handleDiscuss(link: string) {
    setDiscussId(link);
  }

  function postComment(link: string, text: string) {
    setThreads(prev => ({
      ...prev,
      [link]: [...(prev[link] || []), { user: "Tú", text }]
    }));
  }

  return (
    <div style={{
      maxWidth: '700px',
      margin: '2rem auto',
      background: '#fff',
      borderRadius: '16px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
      padding: '2rem'
    }}>
      <form onSubmit={handleSearch} style={{marginBottom: '1.8rem', display: 'flex', gap: '0.7rem'}}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar en Google..."
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: '10px',
            border: '1px solid #eee',
            fontSize: '1.15rem',
          }}
        />
        <button
          type="submit"
          style={{
            background: '#073e8e',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '1rem 2rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >Buscar</button>
      </form>
      {loading && <div>Cargando resultados...</div>}
      {error && <div style={{color: 'red'}}>{error}</div>}
      <div>
        {results.length === 0 && query && !loading && <div>No se encontraron resultados en Google.</div>}
        {results.length > 0 && (
          <ul style={{listStyle: 'none', padding: 0}}>
            {results.map((item) => (
              <li key={item.link} style={{
                background: '#fafafa',
                borderRadius: '10px',
                padding: '1.2rem',
                marginBottom: '1.2rem',
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
              }}>
                <div style={{
                  fontWeight: 700,
                  color: '#073e8e',
                  marginBottom: '0.5rem'
                }}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{color: '#073e8e', textDecoration: 'underline'}}>
                    {item.title}
                  </a>
                </div>
                <div style={{color: '#314e52'}}>{item.snippet}</div>
                <button
                  onClick={() => handleDiscuss(item.link)}
                  style={{
                    marginTop: '0.8rem',
                    background: '#ffe259',
                    color: '#073e8e',
                    border: 'none',
                    borderRadius: '7px',
                    padding: '0.5rem 1.2rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >Discutir</button>
                {/* Discussion Thread */}
                {discussId === item.link && (
                  <div style={{
                    background: '#fffbe8',
                    borderRadius: '7px',
                    padding: '0.7rem',
                    marginTop: '1rem'
                  }}>
                    <div style={{fontWeight: 600, marginBottom: '0.5rem'}}>Discusión sobre este resultado:</div>
                    <ul style={{listStyle: 'none', padding: 0, marginBottom: '0.7rem'}}>
                      {(threads[item.link] || []).map((c, i) => (
                        <li key={i} style={{
                          marginBottom: '0.6rem',
                          padding: '0.4rem 0.8rem',
                          background: '#fafafa',
                          borderRadius: '6px'
                        }}>
                          <strong>{c.user}:</strong> {c.text}
                        </li>
                      ))}
                    </ul>
                    <form onSubmit={e => {
                      e.preventDefault();
                      if (comment.trim()) {
                        postComment(item.link, comment);
                        setComment('');
                      }
                    }}>
                      <input
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Escribe tu comentario..."
                        style={{
                          width: '80%',
                          padding: '0.5rem',
                          borderRadius: '6px',
                          border: '1px solid #eee',
                          fontSize: '1rem',
                          marginRight: '0.7rem'
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          background: '#073e8e',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.5rem 1.2rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >Comentar</button>
                    </form>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GoogleWebSearchBar;