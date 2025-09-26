import React, { useState, useEffect } from 'react';
import { 
  FaShieldAlt, FaExclamationTriangle, FaGlobe, FaClock, FaEye, FaShare,
  FaBookmark, FaPlay, FaExpand, FaTimes, FaArrowLeft, FaFilter
} from 'react-icons/fa';
import { MdSecurity, MdWarning, MdNewReleases, MdLocalFireDepartment } from 'react-icons/md';
import { BiNews, BiTime } from 'react-icons/bi';

interface TerrorNewsHubProps {
  onNavigate: (view: string) => void;
}

interface TerrorNewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  category: 'terrorism' | 'security' | 'international' | 'threats';
  image?: string;
  videoUrl?: string;
  verified: boolean;
  readTime: number;
}

const TerrorNewsHub: React.FC<TerrorNewsHubProps> = ({ onNavigate }) => {
  const [articles, setArticles] = useState<TerrorNewsItem[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<TerrorNewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'terrorism' | 'security' | 'international' | 'threats'>('all');
  const [showModal, setShowModal] = useState(false);

  // Mock data for Terror News
  useEffect(() => {
    const mockArticles: TerrorNewsItem[] = [
      {
        id: '1',
        title: 'International Security Alert: Enhanced Airport Screening Measures',
        summary: 'Global airports implement advanced security protocols following intelligence reports of potential threats.',
        content: 'In response to credible intelligence reports, international aviation authorities have implemented enhanced security screening measures across major airports worldwide. The new protocols include advanced biometric scanning, increased random searches, and enhanced coordination between international security agencies. Officials emphasize that these measures are precautionary and designed to ensure passenger safety while maintaining efficient travel operations.',
        source: 'Global Security Network',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        severity: 'high',
        location: 'International',
        category: 'security',
        verified: true,
        readTime: 3,
        image: '/api/placeholder/400/200'
      },
      {
        id: '2',
        title: 'Cybersecurity Threat Analysis: Critical Infrastructure Protection',
        summary: 'New cybersecurity framework launched to protect critical infrastructure from emerging digital threats.',
        content: 'Government agencies and private sector partners have unveiled a comprehensive cybersecurity framework designed to protect critical infrastructure from increasingly sophisticated digital threats. The initiative includes real-time monitoring systems, automated threat detection, and coordinated response protocols. Industry experts note this represents a significant advancement in national cybersecurity capabilities.',
        source: 'Cybersecurity Today',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        severity: 'medium',
        location: 'Global',
        category: 'security',
        verified: true,
        readTime: 4,
        image: '/api/placeholder/400/200'
      },
      {
        id: '3',
        title: 'Counter-Terrorism Operations: International Cooperation Update',
        summary: 'Multi-national task force reports successful disruption of international criminal networks.',
        content: 'A joint international task force has successfully disrupted several criminal networks operating across multiple continents. The coordinated operation involved law enforcement agencies from 15 countries and resulted in numerous arrests and the seizure of significant assets. Officials highlight the importance of international cooperation in addressing transnational security challenges.',
        source: 'International Justice Bureau',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        severity: 'high',
        location: 'Multiple Countries',
        category: 'terrorism',
        verified: true,
        readTime: 5,
        image: '/api/placeholder/400/200'
      },
      {
        id: '4',
        title: 'Emerging Threats Assessment: Technology and Security',
        summary: 'Annual threat assessment highlights evolving challenges in the digital age.',
        content: 'The annual threat assessment report identifies emerging challenges posed by advancing technology, including artificial intelligence, quantum computing, and distributed networks. Security experts emphasize the need for adaptive defense strategies and international cooperation to address these evolving challenges. The report provides recommendations for both public and private sector responses.',
        source: 'Strategic Security Institute',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        severity: 'medium',
        location: 'Global',
        category: 'threats',
        verified: true,
        readTime: 6,
        image: '/api/placeholder/400/200'
      },
      {
        id: '5',
        title: 'International Maritime Security: Enhanced Patrol Operations',
        summary: 'Naval forces increase patrol operations in strategic maritime corridors.',
        content: 'International naval forces have enhanced patrol operations in key maritime corridors following reports of increased irregular activity. The coordinated effort involves ships and aircraft from multiple nations working together to ensure the security of international shipping lanes. Maritime security officials report improved cooperation and information sharing among participating nations.',
        source: 'Maritime Security Monitor',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        severity: 'low',
        location: 'International Waters',
        category: 'security',
        verified: true,
        readTime: 4,
        image: '/api/placeholder/400/200'
      }
    ];

    setTimeout(() => {
      setArticles(mockArticles);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(article => article.category === filter);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-600 to-red-800';
      case 'high': return 'from-orange-500 to-red-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-yellow-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <MdLocalFireDepartment className="w-4 h-4" />;
      case 'high': return <MdWarning className="w-4 h-4" />;
      case 'medium': return <MdNewReleases className="w-4 h-4" />;
      case 'low': return <MdSecurity className="w-4 h-4" />;
      default: return <BiNews className="w-4 h-4" />;
    }
  };

  const openArticleModal = (article: TerrorNewsItem) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('search')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </button>
          
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">⚠️</div>
                <div>
                  <h1 className="text-4xl font-bold">Terror News Hub</h1>
                  <p className="text-gray-300">Critical security updates and international threat analysis</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-bold">{articles.length}</span> <span className="text-sm">Articles</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-bold">24/7</span> <span className="text-sm">Monitoring</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-bold">100%</span> <span className="text-sm">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Categories', icon: FaGlobe },
              { key: 'terrorism', label: 'Counter-Terrorism', icon: FaShieldAlt },
              { key: 'security', label: 'Security', icon: MdSecurity },
              { key: 'international', label: 'International', icon: FaGlobe },
              { key: 'threats', label: 'Emerging Threats', icon: FaExclamationTriangle }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                  filter === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => openArticleModal(article)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:scale-105"
            >
              {/* Article Image */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-50">📰</div>
                </div>
                
                {/* Severity Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${getSeverityColor(article.severity)} flex items-center gap-1`}>
                  {getSeverityIcon(article.severity)}
                  {article.severity.toUpperCase()}
                </div>

                {/* Verified Badge */}
                {article.verified && (
                  <div className="absolute top-3 right-3 bg-green-600 text-white p-2 rounded-full">
                    <FaShieldAlt className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <BiTime className="w-4 h-4" />
                  <span>{new Date(article.timestamp).toLocaleString()}</span>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <FaGlobe className="w-3 h-3" />
                    <span>{article.location}</span>
                  </div>
                  <div className="text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors">
                    Read More →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              No articles match the selected filter criteria.
            </p>
            <button
              onClick={() => setFilter('all')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All Articles
            </button>
          </div>
        )}
      </div>

      {/* Article Detail Modal */}
      {showModal && selectedArticle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${getSeverityColor(selectedArticle.severity)} p-6 text-white relative`}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{selectedArticle.category === 'terrorism' ? '🛡️' : '⚠️'}</div>
                <div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/20 mb-2`}>
                    {getSeverityIcon(selectedArticle.severity)}
                    {selectedArticle.severity.toUpperCase()} PRIORITY
                  </div>
                  <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <BiTime className="w-4 h-4" />
                  {new Date(selectedArticle.timestamp).toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <FaGlobe className="w-4 h-4" />
                  {selectedArticle.location}
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="w-4 h-4" />
                  {selectedArticle.readTime} min read
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {selectedArticle.summary}
                </p>
                <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {selectedArticle.content}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Source: {selectedArticle.source}
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                    <FaBookmark className="w-4 h-4" />
                    Save
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors">
                    <FaShare className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerrorNewsHub;