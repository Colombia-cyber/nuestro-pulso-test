import React, { useState } from 'react';
import { searchGoogleAPI, SearchResult } from '../utils/search.ts';
import { saveFavorite } from '../firebase.js';

const GoogleWebSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discussId, setDiscussId] = useState<string | null>(null);
  const [threads, setThreads] = useState<{[key: string]: { user: string, text: string }[] }>({});
  const [comment, setComment] = useState('');
  const [savingFavorites, setSavingFavorites] = useState<Set<string>>(new Set());

  const handleSaveFavorite = async (result: SearchResult) => {
    setSavingFavorites(prev => new Set([...prev, result.link]));
    
    try {
      const saveResult = await saveFavorite({
        type: 'search',
        title: result.title,
        url: result.link,
        snippet: result.snippet
      });
      
      if (saveResult.success) {
        alert('Resultado guardado en favoritos!');
      } else {
        alert(saveResult.message || 'Error al guardar en favoritos');
      }
    } catch (error) {
      console.error('Error saving favorite:', error);
      alert('Error al guardar en favoritos');
    } finally {
      setSavingFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(result.link);
        return newSet;
      });
    }
  };

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    setDiscussId(null);
    setResults([]);
    
    try {
      const googleResults = await searchGoogleAPI(query.trim());
      setResults(googleResults);
    } catch (err: any) {
      console.error('Search failed:', err);
      setError(err.message || "Error al buscar en Google. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function handleDiscuss(link: string) {
    setDiscussId(discussId === link ? null : link);
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
      
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#073e8e]"></div>
          <span className="ml-3 text-[#073e8e] font-medium">Buscando resultados...</span>
        </div>
      )}
      
      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: '10px',
          marginBottom: '1rem',
          border: '1px solid #fecaca'
        }}>
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Reintentar
            </button>
          </div>
        </div>
      )}
      
      <div>
        {!loading && results.length === 0 && query && !error && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            background: '#f8fafc',
            borderRadius: '10px',
            color: '#64748b'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>
              No se encontraron resultados
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              No pudimos encontrar resultados para "<strong>{query}</strong>"
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              Intenta con términos de búsqueda diferentes o más específicos.
            </p>
          </div>
        )}
        
        {results.length > 0 && (
          <div>
            <div style={{ 
              marginBottom: '1.5rem', 
              padding: '0.75rem', 
              background: '#f0f9ff', 
              borderRadius: '8px',
              color: '#0369a1',
              fontSize: '0.875rem'
            }}>
              Se encontraron {results.length} resultados para "{query}"
            </div>
            
            <ul style={{listStyle: 'none', padding: 0}}>
              {results.map((item) => (
                <li key={item.link} style={{
                  background: '#fafafa',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #f1f5f9',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 700,
                        color: '#073e8e',
                        marginBottom: '0.75rem',
                        fontSize: '1.1rem',
                        lineHeight: '1.4'
                      }}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
                          color: '#073e8e', 
                          textDecoration: 'none'
                        }}>
                          {item.title}
                        </a>
                      </div>
                      
                      <div style={{
                        color: '#475569',
                        marginBottom: '0.75rem',
                        lineHeight: '1.5'
                      }}>
                        {item.snippet}
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                      }}>
                        <span style={{
                          fontSize: '0.875rem',
                          color: '#059669',
                          background: '#ecfdf5',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontWeight: 500
                        }}>
                          {new URL(item.link).hostname}
                        </span>
                        
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            background: '#073e8e',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'background-color 0.2s'
                          }}
                        >
                          Visitar sitio
                        </a>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                          onClick={() => handleDiscuss(item.link)}
                          style={{
                            background: '#ffe259',
                            color: '#073e8e',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.75rem 1.5rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {discussId === item.link ? 'Ocultar discusión' : 'Iniciar discusión'}
                        </button>
                        
                        <button
                          onClick={() => handleSaveFavorite(item)}
                          disabled={savingFavorites.has(item.link)}
                          style={{
                            background: savingFavorites.has(item.link) ? '#fbbf24' : '#f59e0b',
                            color: '#92400e',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.75rem 1.5rem',
                            fontWeight: 600,
                            cursor: savingFavorites.has(item.link) ? 'not-allowed' : 'pointer',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {savingFavorites.has(item.link) ? 'Guardando...' : '⭐ Favorito'}
                        </button>
                      </div>
                    </div>
                  </div>
                  
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
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleWebSearchBar;