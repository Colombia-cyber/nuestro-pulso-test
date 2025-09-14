import React, { useEffect, useState } from 'react';
import ContentService, { NewsArticle, SocialMediaPost } from './services/contentService';

const contentService = ContentService.getInstance();

export default function NewsFeed() {
  const [colombianNews, setColombianNews] = useState<NewsArticle[]>([]);
  const [trumpNews, setTrumpNews] = useState<NewsArticle[]>([]);
  const [politicsNews, setPoliticsNews] = useState<NewsArticle[]>([]);
  const [rightWingNews, setRightWingNews] = useState<NewsArticle[]>([]);
  const [terrorNews, setTerrorNews] = useState<NewsArticle[]>([]);
  const [worldNews, setWorldNews] = useState<NewsArticle[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialMediaPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        // Load all news categories
        const [allNews, social] = await Promise.all([
          contentService.fetchNews(),
          contentService.fetchSocialPosts()
        ]);

        // Filter news by different categories and topics
        const colombian = allNews.filter(article => 
          article.content.includes('Gustavo Petro') || 
          article.content.includes('Colombia') ||
          article.source.name.includes('Colombia')
        );

        const trump = allNews.filter(article =>
          article.content.includes('Donald Trump') ||
          article.title.includes('Trump')
        );

        const politics = allNews.filter(article =>
          article.category === 'política' || article.category === 'elecciones'
        );

        const rightWing = allNews.filter(article =>
          article.political_lean === 'right' ||
          article.content.includes('conservador') ||
          article.content.includes('Centro Democrático')
        );

        const terror = allNews.filter(article =>
          article.category === 'seguridad' ||
          article.content.includes('terror') ||
          article.content.includes('atentado')
        );

        const world = allNews.filter(article =>
          article.category === 'internacional' ||
          article.content.includes('mundial') ||
          article.content.includes('internacional')
        );

        setColombianNews(colombian.slice(0, 6));
        setTrumpNews(trump.slice(0, 6));
        setPoliticsNews(politics.slice(0, 6));
        setRightWingNews(rightWing.slice(0, 6));
        setTerrorNews(terror.slice(0, 6));
        setWorldNews(world.slice(0, 6));
        setSocialPosts(social.slice(0, 4));
      } catch (error) {
        console.error('Error loading news feed:', error);
      } finally {
        setLoading(false);
      }
    }
    loadAll();

    // Subscribe to live updates
    const unsubscribe = contentService.subscribeToLiveUpdates((update) => {
      if (update.type === 'news') {
        // Add new article to appropriate category
        const newArticle = update.data as NewsArticle;
        if (newArticle.political_lean === 'right') {
          setRightWingNews(prev => [newArticle, ...prev.slice(0, 5)]);
        }
        if (newArticle.category === 'política') {
          setPoliticsNews(prev => [newArticle, ...prev.slice(0, 5)]);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const renderNewsColumn = (title: string, articles: NewsArticle[], colorClass: string) => (
    <div className="lg:w-1/6 w-full h-[70vh] overflow-y-auto">
      <h2 className="text-lg font-bold mb-2 text-[#0033A0]">{title}</h2>
      {loading && articles.length === 0 ? (
        <div className="text-center py-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-4">
          <span className="text-2xl mb-2 block">📰</span>
          <p className="text-gray-600 text-sm">No hay noticias disponibles</p>
        </div>
      ) : (
        articles.map((article, idx) => (
          <a key={`${article.id}-${idx}`} href={article.url} target="_blank" rel="noopener noreferrer"
            className={`block bg-white hover:bg-${colorClass}-50 rounded-lg p-2 mb-2 shadow transition`}>
            <div className="flex items-center mb-1">
              {article.thumbnail && <span className="text-lg mr-2">{article.thumbnail}</span>}
              <div className="font-semibold text-[#EF3340] text-sm leading-tight">{article.title}</div>
            </div>
            <div className="text-gray-700 text-xs mt-1 line-clamp-2">{article.description}</div>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>{article.source?.name}</span>
              <span>{new Date(article.publishedAt).toLocaleString('es-CO')}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
              <span>👍 {article.engagement?.likes || 0}</span>
              <span>📤 {article.engagement?.shares || 0}</span>
              <span>💬 {article.engagement?.comments || 0}</span>
            </div>
          </a>
        ))
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 sticky top-16 z-40 bg-white/80 p-4 rounded-xl shadow-lg font-['Inter']">
      {renderNewsColumn('Noticias Colombia (Gustavo Petro)', colombianNews, 'blue')}
      {renderNewsColumn('Donald Trump News', trumpNews, 'red')}
      {renderNewsColumn('Right Wing & Elections', rightWingNews, 'orange')}
      {renderNewsColumn('Terror News & Security', terrorNews, 'red')}
      {renderNewsColumn('Major Politics Events', politicsNews, 'blue')}
      {renderNewsColumn('World Headlines', worldNews, 'green')}
      
      {/* Social Media Integration */}
      {socialPosts.length > 0 && (
        <div className="lg:w-1/6 w-full h-[70vh] overflow-y-auto">
          <h2 className="text-lg font-bold mb-2 text-[#0033A0]">Social Media Feed</h2>
          {socialPosts.map((post, idx) => (
            <div key={`${post.id}-${idx}`} className="bg-white hover:bg-purple-50 rounded-lg p-2 mb-2 shadow transition">
              <div className="flex items-center mb-1">
                <span className="text-sm mr-1">
                  {post.platform === 'twitter' ? '🐦' : 
                   post.platform === 'facebook' ? '📘' : 
                   post.platform === 'instagram' ? '📷' : 
                   post.platform === 'youtube' ? '🎥' : '💬'}
                </span>
                <div className="font-semibold text-purple-600 text-xs">{post.author}</div>
              </div>
              <div className="text-gray-700 text-xs mb-1 line-clamp-3">{post.content}</div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span>👍 {post.engagement.likes}</span>
                <span>🔄 {post.engagement.shares}</span>
                <span>💬 {post.engagement.comments}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {post.hashtags.slice(0, 2).map((tag, tagIdx) => (
                  <span key={tagIdx} className="bg-blue-100 text-blue-600 px-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}