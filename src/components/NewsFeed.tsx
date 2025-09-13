import React, { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNews([
        { id: 1, title: 'Nueva Ley de Educación', summary: 'El Congreso aprobó una nueva ley...' },
        { id: 2, title: 'Reforma Tributaria', summary: 'Debate sobre la reforma tributaria...' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <div>Cargando noticias...</div>;

  return (
    <div>
      <h2>Noticias en Vivo</h2>
      <ul>
        {news.map(item => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;