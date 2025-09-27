import React, { useState, useEffect } from 'react';
import './MundoSearchInterface.css';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  source: string;
  timeAgo: string;
  imageUrl?: string;
  type: 'news' | 'video' | 'image' | 'general';
}

interface TopStory {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  url: string;
  imageUrl?: string;
}

export const MundoSearchInterface: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [topStories, setTopStories] = useState<TopStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'All', 'Images', 'News', 'Videos', 'Short videos', 
    'Shopping', 'Forums', 'More', 'Tools'
  ];

  const peopleAlsoAsk = [
    "Which country will survive World War III?",
    "What's the biggest war going on right now?", 
    "What is the definition of war?",
    "Is war flop or hit?"
  ];

  const mockTopStories: TopStory[] = [
    {
      id: '1',
      title: "Ukraine war briefing: Trump 'growing incredibly impatient' with Russia over war, warns Vance",
      source: "The Guardian",
      timeAgo: "21 hours ago",
      url: "#",
      imageUrl: "https://via.placeholder.com/80x60"
    },
    {
      id: '2', 
      title: "Volodymyr Zelenskyy says he will step down as president after Ukraine war ends",
      source: "Australian Broadcasting Corporation",
      timeAgo: "9 hours ago",
      url: "#"
    },
    {
      id: '3',
      title: "Russia will expand aggression beyond Ukraine if not stopped, Zelensky warns",
      source: "BBC", 
      timeAgo: "1 day ago",
      url: "#"
    },
    {
      id: '4',
      title: "Russia says no choice but war after Trump U-turn on Ukraine",
      source: "Al Jazeera",
      timeAgo: "1 day ago", 
      url: "#"
    },
    {
      id: '5',
      title: "Ukraine war latest: Russian Iskander missile strike targets Ukrainian training ground, casualties reported",
      source: "The Kyiv Independent",
      timeAgo: "1 day ago",
      url: "#"
    }
  ];

  const mockResults: SearchResult[] = [
    {
      id: 'wiki-1',
      title: 'War',
      url: 'https://en.wikipedia.org/wiki/War',
      description: 'War is an armed conflict between the armed forces of states, or between governmental forces and armed groups that are organized under a certain command...',
      source: 'Wikipedia',
      timeAgo: '',
      type: 'general'
    }
  ];

  useEffect(() => {
    setTopStories(mockTopStories);
    setResults(mockResults);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="mundo-search-container">
      {/* Search Header */}
      <div className="search-header">
        <div className="search-logo">
          <h2>Mundo</h2>
        </div>
        
        <div className="search-box-container">
          <div className="search-box">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              placeholder="Search mundo..."
              className="search-input"
            />
            <button 
              className="search-btn"
              onClick={() => handleSearch(searchQuery)}
            >
              🔍
            </button>
          </div>
        </div>

        <div className="search-tools">
          <button className="tools-btn">⚙️ Tools</button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        <div className="category-scroll">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="search-content">
        <div className="main-results">
          {/* Top Stories */}
          <div className="top-stories-section">
            <h3>Top stories</h3>
            <div className="top-stories-grid">
              {topStories.map((story) => (
                <div key={story.id} className="top-story-card">
                  {story.imageUrl && (
                    <img src={story.imageUrl} alt="" className="story-image" />
                  )}
                  <div className="story-content">
                    <div className="story-source">
                      <span className="source-name">{story.source}</span>
                      <span className="story-time">{story.timeAgo}</span>
                    </div>
                    <h4 className="story-title">
                      <a href={story.url}>{story.title}</a>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Also in the news */}
          <div className="also-news-section">
            <h4>Also in the news</h4>
            <div className="also-news-item">
              <div className="news-source">
                <span className="source-name">The Guardian</span>
              </div>
              <h5><a href="#">Civilian injuries in Gaza similar to those of soldiers in war zones, study finds</a></h5>
              <span className="news-time">1 hour ago</span>
            </div>
            <div className="also-news-item">
              <div className="news-source">
                <span className="source-name">AAPNews</span>
              </div>
              <h5><a href="#">NATO, EU waging war on Russia, Lavrov tells G20 at UN</a></h5>
              <span className="news-time">6 minutes ago</span>
            </div>
            <a href="#" className="more-news-link">More news</a>
          </div>

          {/* People also ask */}
          <div className="people-also-ask">
            <h4>People also ask</h4>
            <div className="questions-list">
              {peopleAlsoAsk.map((question, index) => (
                <div key={index} className="question-item">
                  <button className="question-btn">
                    <span>{question}</span>
                    <span className="expand-icon">▼</span>
                  </button>
                </div>
              ))}
            </div>
            <button className="feedback-btn">Feedback</button>
          </div>

          {/* Search Results */}
          <div className="search-results">
            {results.map((result) => (
              <div key={result.id} className="search-result-item">
                <div className="result-header">
                  <a href={result.url} className="result-url">
                    {result.url}
                  </a>
                </div>
                <h3 className="result-title">
                  <a href={result.url}>{result.title}</a>
                </h3>
                <p className="result-description">{result.description}</p>
                
                {result.source === 'Wikipedia' && (
                  <div className="wiki-links">
                    <a href="#" className="wiki-link">War (disambiguation)</a>
                    <a href="#" className="wiki-link">Total war</a>
                    <a href="#" className="wiki-link">The Apotheosis of War</a>
                    <a href="#" className="wiki-link">Effects of war</a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Results */}
          <div className="additional-results">
            <div className="search-result-item">
              <div className="result-header">
                <a href="#" className="result-url">https://www.awm.gov.au</a>
              </div>
              <h3 className="result-title">
                <a href="#">Australian War Memorial: Home</a>
              </h3>
              <p className="result-description">
                The Memorial's galleries and exhibitions explore Australia's involvement in major conflicts and help to tell Australia's continuing story of service, sacrifice...
              </p>
            </div>

            <div className="search-result-item">
              <div className="result-header">
                <a href="#" className="result-url">https://www.britannica.com › topic › war</a>
              </div>
              <h3 className="result-title">
                <a href="#">War | History, Causes, Types, Meaning, Examples, & Facts</a>
              </h3>
              <p className="result-description">
                War, in the popular sense, a conflict among political groups involving hostilities of considerable duration and magnitude. Learn about the history, causes, and types of war...
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="loading-indicator">
              <div className="loading-spinner"></div>
              <span>Searching...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MundoSearchInterface;