import React, { useState } from 'react';
import { FaExternalLinkAlt, FaGlobe, FaDownload, FaStar, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaIndustry, FaChartLine, FaShare, FaBookmark, FaHeart } from 'react-icons/fa';
import { MdBusiness, MdLanguage, MdTrendingUp, MdNewReleases } from 'react-icons/md';
import { BsArrowRight, BsStarFill } from 'react-icons/bs';
import { KnowledgePanelTopic } from '../data/knowledgeTopics';

interface KnowledgePanelProps {
  topic: KnowledgePanelTopic;
  onSearchRelated?: (query: string) => void;
  className?: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  image: string;
  url: string;
  category: string;
}

const KnowledgePanel: React.FC<KnowledgePanelProps> = ({
  topic,
  onSearchRelated,
  className = ''
}) => {
  const [showAllFacts, setShowAllFacts] = useState(false);
  const [activeNewsTab, setActiveNewsTab] = useState<'featured' | 'recent' | 'trending'>('featured');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Generate mock news based on topic
  const generateMockNews = (category: 'featured' | 'recent' | 'trending'): NewsItem[] => {
    const baseNews: NewsItem[] = [
      {
        id: '1',
        title: `${topic.name} announces major expansion into Latin American markets`,
        summary: `${topic.name} is planning significant investment in Colombia and surrounding regions, focusing on local partnerships and Spanish-language content.`,
        source: 'TechCrunch',
        date: '2 hours ago',
        image: topic.logo,
        url: '#',
        category: 'Business'
      },
      {
        id: '2',
        title: `New privacy features rolling out on ${topic.name} platform`,
        summary: `Users will now have enhanced control over their data and improved transparency about how their information is used across the platform.`,
        source: 'Reuters',
        date: '5 hours ago',
        image: topic.logo,
        url: '#',
        category: 'Technology'
      },
      {
        id: '3',
        title: `${topic.name} partners with Colombian government for digital literacy program`,
        summary: `The initiative aims to provide digital skills training to underserved communities across Colombia, with focus on rural areas.`,
        source: 'El Tiempo',
        date: '1 day ago',
        image: topic.logo,
        url: '#',
        category: 'Social Impact'
      },
      {
        id: '4',
        title: `Q4 earnings: ${topic.name} reports strong growth in emerging markets`,
        summary: `The company exceeded analyst expectations with 15% growth in Latin America, driven by increased mobile adoption.`,
        source: 'Financial Times',
        date: '2 days ago',
        image: topic.logo,
        url: '#',
        category: 'Finance'
      }
    ];

    // Customize based on category
    if (category === 'trending') {
      return baseNews.map(item => ({
        ...item,
        title: `🔥 ${item.title}`,
        summary: `TRENDING: ${item.summary}`
      }));
    }

    if (category === 'recent') {
      return baseNews.map(item => ({
        ...item,
        date: ['30 min ago', '1 hour ago', '3 hours ago', '6 hours ago'][Math.floor(Math.random() * 4)]
      }));
    }

    return baseNews;
  };

  const [featuredNews] = useState<NewsItem[]>(generateMockNews('featured'));
  const [recentNews] = useState<NewsItem[]>(generateMockNews('recent'));
  const [trendingNews] = useState<NewsItem[]>(generateMockNews('trending'));

  const getCurrentNews = (): NewsItem[] => {
    switch (activeNewsTab) {
      case 'recent': return recentNews;
      case 'trending': return trendingNews;
      default: return featuredNews;
    }
  };

  const handleRelatedSearch = (query: string) => {
    if (onSearchRelated) {
      onSearchRelated(query);
    }
  };

  const formatNumber = (num: string): string => {
    if (num.includes('billion') || num.includes('B')) {
      return num;
    }
    if (num.includes('million') || num.includes('M')) {
      return num;
    }
    // Add commas to large numbers
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      {/* Header with Copilot Search Branding */}
      <div 
        className="px-6 py-4 border-b border-gray-100"
        style={{ 
          background: `linear-gradient(135deg, ${topic.colors.primary}15, ${topic.colors.secondary}15)` 
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">🧠</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Copilot Search Knowledge</h3>
              <p className="text-xs text-gray-500">Powered by AI • Real-time data</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-lg transition-colors ${
                isLiked 
                  ? 'bg-red-50 text-red-500' 
                  : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500'
              }`}
              title="Like this topic"
            >
              <FaHeart className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'bg-blue-50 text-blue-500' 
                  : 'bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-500'
              }`}
              title="Bookmark this topic"
            >
              <FaBookmark className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition-colors"
              title="Share this knowledge panel"
            >
              <FaShare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Topic Information */}
      <div className="p-6">
        <div className="flex items-start gap-6 mb-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div 
              className="w-24 h-24 rounded-2xl p-4 flex items-center justify-center shadow-lg"
              style={{ backgroundColor: topic.colors.accent }}
            >
              <img 
                src={topic.logo} 
                alt={`${topic.name} logo`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center text-2xl font-bold" 
                         style="color: ${topic.colors.primary}">
                      ${topic.name.charAt(0)}
                    </div>
                  `;
                }}
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{topic.name}</h1>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                style={{ 
                  backgroundColor: topic.colors.primary + '20',
                  color: topic.colors.primary
                }}
              >
                {topic.type}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              {topic.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <BsStarFill 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(topic.rating.score) 
                            ? 'text-yellow-400' 
                            : 'text-gray-200'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{topic.rating.score}</span>
                  <span className="text-gray-500">({topic.rating.reviews} reviews)</span>
                </div>
              )}
              <div className="text-gray-500">•</div>
              <div className="text-gray-600">
                <FaGlobe className="inline w-4 h-4 mr-1" />
                {topic.website.replace('https://', '')}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">{topic.summary}</p>

            {/* Official Links */}
            <div className="flex flex-wrap gap-2">
              {topic.officialLinks.slice(0, 3).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                    link.type === 'app' || link.type === 'download'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl'
                      : index === 0
                      ? 'text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={
                    index === 0 
                      ? { background: `linear-gradient(135deg, ${topic.colors.primary}, ${topic.colors.secondary})` }
                      : {}
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                  {(link.type === 'app' || link.type === 'download') && (
                    <FaDownload className="w-4 h-4" />
                  )}
                  <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Key Facts Grid */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaChartLine className="w-5 h-5 text-blue-500" />
            Key Facts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showAllFacts ? topic.keyFacts : topic.keyFacts.slice(0, 6)).map((fact, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{fact.icon}</span>
                  <span className="font-medium text-gray-700 text-sm">{fact.label}</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{formatNumber(fact.value)}</div>
              </div>
            ))}
          </div>
          {topic.keyFacts.length > 6 && (
            <button
              onClick={() => setShowAllFacts(!showAllFacts)}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
            >
              {showAllFacts ? 'Show Less' : 'Show More Facts'}
              <BsArrowRight className={`w-3 h-3 transition-transform ${showAllFacts ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>

        {/* Company Details */}
        <div className="border-t border-gray-100 pt-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MdBusiness className="w-5 h-5 text-blue-500" />
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Founded:</span>
                <span className="font-medium">{topic.founded}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Headquarters:</span>
                <span className="font-medium">{topic.headquarters}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaUsers className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Employees:</span>
                <span className="font-medium">{topic.employees}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaIndustry className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Industry:</span>
                <span className="font-medium">{topic.industry}</span>
              </div>
              <div className="flex items-center gap-3">
                <MdLanguage className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Languages:</span>
                <span className="font-medium">{topic.languages.join(', ')}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaGlobe className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Area Served:</span>
                <span className="font-medium">{topic.areaServed}</span>
              </div>
            </div>
          </div>
          
          {/* Founder Information */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-gray-600">Founded by:</span>
              <div className="flex flex-wrap gap-2">
                {topic.founder.map((founder, index) => (
                  <button
                    key={index}
                    onClick={() => handleRelatedSearch(founder)}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                  >
                    {founder}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Information */}
          {(topic.marketCap || topic.revenue) && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topic.marketCap && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">Market Cap:</span>
                    <span className="font-bold text-green-600">{topic.marketCap}</span>
                  </div>
                )}
                {topic.revenue && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-bold text-blue-600">{topic.revenue}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* News Section */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MdNewReleases className="w-5 h-5 text-blue-500" />
              Latest News about {topic.name}
            </h2>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(['featured', 'recent', 'trending'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveNewsTab(tab)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                    activeNewsTab === tab
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'trending' && '🔥 '}
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div className="space-y-4">
            {getCurrentNews().slice(0, 3).map((news) => (
              <article
                key={news.id}
                className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => window.open(news.url, '_blank')}
              >
                <div className="flex-shrink-0">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-16 h-16 rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml;base64,${btoa(
                        `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                          <rect width="64" height="64" fill="${topic.colors.primary}20"/>
                          <text x="32" y="38" text-anchor="middle" fill="${topic.colors.primary}" font-size="24" font-weight="bold">
                            ${topic.name.charAt(0)}
                          </text>
                        </svg>`
                      )}`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{news.summary}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium">{news.source}</span>
                    <span>•</span>
                    <span>{news.date}</span>
                    <span>•</span>
                    <span className="px-2 py-1 bg-gray-200 rounded-full">{news.category}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 self-center">
                  <FaExternalLinkAlt className="w-4 h-4 text-gray-400" />
                </div>
              </article>
            ))}
          </div>

          {/* More News Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => handleRelatedSearch(`${topic.name} news`)}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              Explore More News
            </button>
            <button
              onClick={() => handleRelatedSearch(`${topic.name} analysis`)}
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium"
            >
              Interesting Reads
            </button>
            <button
              onClick={() => handleRelatedSearch(`${topic.name} updates`)}
              className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
            >
              Latest Updates
            </button>
          </div>
        </div>

        {/* Related Searches */}
        <div className="border-t border-gray-100 pt-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MdTrendingUp className="w-5 h-5 text-blue-500" />
            Related Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {topic.relatedSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRelatedSearch(search)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Download Information */}
        {topic.downloads.length > 0 && (
          <div className="border-t border-gray-100 pt-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaDownload className="w-5 h-5 text-blue-500" />
              Download Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.downloads.map((download, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {download.platform.includes('Play') ? '🤖' : '🍎'}
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">{download.platform}</div>
                      <div className="text-sm text-gray-600">{download.count} downloads</div>
                    </div>
                  </div>
                  <FaDownload className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgePanel;