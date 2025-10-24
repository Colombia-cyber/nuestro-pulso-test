import React, { useEffect, useState } from 'react';
/**
 * Replacement: src/components/ReelsSection.tsx
 *
 * Backend-first reels loader with demo-first UI to avoid blank screens.
 * Tries GET {VITE_API_URL}/reels?region=... then falls back to demo reels.
 */

type Reel = {
  id: string;
  title: string;
  thumbnail?: string | null;
  author?: string;
  url?: string;
};

const DEMO_REELS: Reel[] = [
  { id: 'r1', title: 'Reel: Cultura local - Feria', thumbnail: null, author: 'Usuario1', url: '#' },
  { id: 'r2', title: 'Reel: Paisaje colombiano', thumbnail: null, author: 'Usuario2', url: '#' },
];

function viteApiUrl(): string {
  const env = import.meta.env as Record<string, any>;
  return env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : '/api');
}

async function fetchReels(region: 'local' | 'world'): Promise<Reel[]> {
  const api = viteApiUrl().replace(/\/$/, '');
  try {
    const res = await fetch(`${api}/reels?region=${region}`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      const arr = Array.isArray(json) ? json : json?.reels;
      if (Array.isArray(arr) && arr.length) {
        return arr.map((r: any, i: number) => ({
          id: r.id || `s-${i}`,
          title: r.title || r.name || 'Untitled reel',
          thumbnail: r.thumbnail || r.image || null,
          author: r.author || r.user || '',
          url: r.url || '#',
        }));
      }
    }
  } catch (e) {
    // ignore and fallback
    // eslint-disable-next-line no-console
    console.warn('[ReelsSection] backend reels fetch failed:', String(e));
  }
  return DEMO_REELS;
}

export default function ReelsSection({ region }: { region: 'local' | 'world' }) {
  const [reels, setReels] = useState<Reel[]>(() => DEMO_REELS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const data = await fetchReels(region);
      if (!mounted) return;
      setReels(data);
      setLoading(false);
    }
    // keep demo content visible while fetching fresh data in background
    load();
    return () => {
      mounted = false;
    };
  }, [region]);

  return (
    <section aria-labelledby="reels-heading" style={{ marginTop: 18 }}>
      <h2 id="reels-heading">🎞️ Reels</h2>
      {loading && <div style={{ opacity: 0.9 }}>Refreshing reels…</div>}
      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
        {reels.map((r) => (
          <div key={r.id} style={{ minWidth: 220, border: '1px solid #eee', borderRadius: 8, padding: 8, background: '#fff' }}>
            <div style={{ height: 140, background: '#f0f0f0', marginBottom: 8 }}>
              {r.thumbnail ? <img src={r.thumbnail} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6 }} /> : <div style={{ width: '100%', height: 140 }} />}
            </div>
            <strong>{r.title}</strong>
            <div style={{ color: '#666', fontSize: 12 }}>{r.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
