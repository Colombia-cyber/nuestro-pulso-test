import React, { useState, useEffect } from 'react';

interface NewsArticle {
  title: string;
  description: string;
  source: string;
  url: string;
  image: string | null;
  publishedDate: string | null;
  provider: string;
}

interface NewsFeedResponse {
  articles: NewsArticle[];
  totalResults: number;
  query: string;
  sources: {
    google: number;
    newsapi: number;
  };
  errors: Array<{
    provider: string;
    error: string;
  }>;
  timestamp: string;
}

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('Colombia news');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsFeedData, setNewsFeedData] = useState<NewsFeedResponse | null>(null);

  const fetchNews = async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/news-feed?q=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: NewsFeedResponse = await response.json();
      setNewsFeedData(data);
      setArticles(data.articles);
      setQuery(searchTerm);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(query);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchNews(searchQuery.trim());
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="flex space-x-4">
            <div className="w-24 h-24 bg-gray-300 rounded-lg flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="flex space-x-2">
                <div className="h-3 bg-gray-300 rounded w-16"></div>
                <div className="h-3 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const ErrorState = () => (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Unable to load news</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      
      {newsFeedData?.errors && newsFeedData.errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-red-800 mb-2">API Issues:</h4>
          <ul className="text-sm text-red-700 space-y-1">
            {newsFeedData.errors.map((err, index) => (
              <li key={index}>• {err.provider}: {err.error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">Setup Required:</h4>
        <p className="text-sm text-blue-700">
          To use the news feed, you need to configure API keys in your .env file:
        </p>
        <ul className="text-sm text-blue-700 mt-2 text-left">
          <li>• <strong>GOOGLE_API_KEY</strong> - Get from Google Cloud Console</li>
          <li>• <strong>GOOGLE_CSE_ID</strong> - Create a Custom Search Engine</li>
          <li>• <strong>NEWSAPI_KEY</strong> - Get from newsapi.org</li>
        </ul>
      </div>
      
      <button 
        onClick={() => fetchNews(query)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  const NoResults = () => (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="text-6xl mb-4">📰</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">No news found</h3>
      <p className="text-gray-600 mb-6">
        No articles found for "{query}". Try searching for different topics.
      </p>
      <button 
        onClick={() => {
          setSearchQuery('Colombia politics');
          fetchNews('Colombia politics');
        }}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-3"
      >
        Try "Colombia politics"
      </button>
      <button 
        onClick={() => {
          setSearchQuery('technology news');
          fetchNews('technology news');
        }}
        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Try "technology news"
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">📰 Combined News Feed</h1>
              <p className="text-gray-600">
                Latest news from Google Search and NewsAPI • Real-time updates
              </p>
            </div>
            
            {/* Search Box */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news topics..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-64"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              >
                {loading ? '...' : 'Search'}
              </button>
            </form>
          </div>
          
          {/* Stats */}
          {newsFeedData && !loading && (
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <span>🔍 Searching: "{query}"</span>
              <span>📊 Total: {newsFeedData.totalResults} articles</span>
              <span>🌐 Google: {newsFeedData.sources.google}</span>
              <span>📡 NewsAPI: {newsFeedData.sources.newsapi}</span>
              <span>⏰ Updated: {formatDate(newsFeedData.timestamp)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState />
        ) : articles.length === 0 ? (
          <NoResults />
        ) : (
          <div className="space-y-6">
            {articles.map((article, index) => (
              <article key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex gap-4">
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <span className={`px-2 py-1 rounded text-white text-xs font-medium ${
                          article.provider === 'Google Search' ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {article.provider}
                        </span>
                        <span>{article.source}</span>
                        {article.publishedDate && (
                          <>
                            <span>•</span>
                            <span>{formatDate(article.publishedDate)}</span>
                          </>
                        )}
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600">
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {article.title}
                        </a>
                      </h2>
                      
                      {article.description && (
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {article.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                        >
                          Read full article
                          <span>↗</span>
                        </a>
                        
                        <div className="flex gap-3 text-sm text-gray-500">
                          <button className="hover:text-blue-600 flex items-center gap-1">
                            📤 Share
                          </button>
                          <button className="hover:text-green-600 flex items-center gap-1">
                            🔖 Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;