import React from 'react';
import { NewsArticle, DashboardTopic } from '../../types/dashboard';

interface NewsResultsProps {
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  topic: DashboardTopic | null;
}

const NewsResults: React.FC<NewsResultsProps> = ({ news, loading, error, topic }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📰</span>
          Noticias en Tiempo Real
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex gap-4">
              <div className="bg-gray-300 rounded-lg w-32 h-20"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="mr-2">📰</span>
          Noticias en Tiempo Real
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">⚠️ Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="mr-2">📰</span>
          Noticias sobre {topic?.name}
        </h2>
        <span className="text-sm text-gray-500">
          {news.length} artículos
        </span>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No se encontraron noticias</p>
          <p className="text-sm mt-2">Intenta seleccionar otro tema</p>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Article Image */}
              {article.imageUrl && (
                <div className="w-32 h-20 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Article Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {article.description}
                </p>

                <div className="flex items-center text-xs text-gray-500 space-x-3">
                  <span className="font-medium text-blue-600">
                    {article.source}
                  </span>
                  {article.author && (
                    <span>
                      Por {article.author}
                    </span>
                  )}
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* External Link Icon */}
              <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsResults;
