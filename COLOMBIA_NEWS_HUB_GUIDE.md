# 🌎 Colombia News Hub - Complete Setup Guide

The Colombia News Hub is a comprehensive news aggregation and video platform that pulls the latest Colombia-focused content from multiple international and local sources, plus YouTube integration.

## 🚀 Features

### News Aggregation
- **9 International & Local Sources**: Latin Times, The City Paper Bogotá, AP News, Al Jazeera, BBC, Google News, ColombiaOne, and Colombia Reports
- **Real-time RSS Parsing**: Automated content fetching every 15 minutes
- **Smart Deduplication**: Removes duplicate articles across sources
- **Source Icons & Branding**: Each source has distinct visual identity
- **Caching System**: 15-minute cache for optimal performance

### YouTube Integration
- **4 Content Categories**: News, Culture, Travel, and Food
- **Automatic Video Discovery**: Colombia-focused content identification
- **Video Metadata**: Thumbnails, duration, view counts, channel info
- **Trending Algorithm**: Relevance-based ranking system
- **Play Links**: Direct YouTube integration with embed support

### User Interface
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Filterable Content**: By category, source, and search terms
- **Real-time Updates**: Live content refresh indicators
- **Accessibility**: AAA compliance with screen reader support
- **Dark/Light Modes**: User preference detection

## 📋 Prerequisites

### Required
- Node.js 18+ (pre-installed in most environments)
- NPM or Yarn package manager
- Internet connection for RSS feeds

### Optional (Recommended)
- YouTube Data API v3 key for enhanced video features
- Firebase project for analytics and caching

## 🛠️ Installation & Setup

### Quick Start (3 minutes)
```bash
# 1. Clone and install dependencies
git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
cd nuestro-pulso-test
npm install

# 2. Start development servers
npm run dev:full  # Starts both frontend and backend

# 3. Open browser
# Frontend: http://localhost:5173
# API: http://localhost:3001
```

### Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Configure required variables (optional for basic functionality)
YOUTUBE_API_KEY=your_youtube_api_key_here
FRONTEND_URL=http://localhost:5173
PORT=3001
```

### YouTube API Setup (Optional but Recommended)

1. **Get YouTube API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable YouTube Data API v3
   - Create credentials (API Key)
   - Copy the API key to your `.env` file

2. **API Quota Management**:
   - Free tier: 10,000 units/day
   - Each video search: ~100 units
   - Each video detail: ~1 unit
   - Hub refresh: ~400 units
   - Expected daily usage: ~2,000 units

## 🏗️ Architecture

### Backend Services

#### ColombiaNewsAggregator (`server/services/ColombiaNewsAggregator.js`)
- RSS feed parsing for 8 news sources
- Content deduplication and filtering
- Caching with 15-minute TTL
- Article scoring and trending calculation

#### YouTubeIntegrationService (`server/services/YouTubeIntegrationService.js`)
- YouTube Data API v3 integration
- Video search by category (news, culture, travel, food)
- Metadata extraction and formatting
- Relevance scoring algorithm

#### API Routes (`server/routes/colombia-hub.js`)
- `/api/colombia-hub/news` - Get news articles
- `/api/colombia-hub/videos` - Get YouTube videos
- `/api/colombia-hub/combined` - Get both news and videos
- `/api/colombia-hub/sources` - Get available sources
- `/api/colombia-hub/refresh` - Force content refresh

### Frontend Components

#### ColombiaNewsHub (`src/components/ColombiaNewsHub.tsx`)
- Main hub interface with tabs (News, Videos, Combined)
- Search and filtering functionality
- Responsive news and video cards
- Real-time update indicators

#### Service Layer (`src/services/colombiaHubService.ts`)
- API communication with caching
- Error handling and fallback data
- Type-safe data structures

## 📊 Content Sources

### News Sources
| Source | Type | Category | Update Frequency |
|--------|------|----------|------------------|
| **Colombia Reports** | RSS | Local | 30 minutes |
| **The City Paper Bogotá** | RSS | Local | 1 hour |
| **ColombiaOne** | RSS | Local | 2 hours |
| **Latin Times** | RSS | International | 1 hour |
| **AP News** | RSS | International | 30 minutes |
| **Al Jazeera** | RSS | International | 1 hour |
| **BBC Mundo** | RSS | International | 1 hour |
| **Google News** | RSS | Aggregated | 15 minutes |

### Video Categories
| Category | Search Terms | Max Results | Order By |
|----------|--------------|-------------|----------|
| **News** | "Colombia noticias", "Colombia news" | 25 | Date |
| **Culture** | "Colombia cultura", "tradiciones Colombia" | 20 | Views |
| **Travel** | "Colombia travel", "turismo Colombia" | 20 | Views |
| **Food** | "Colombia comida", "gastronomía Colombia" | 15 | Views |

## 🔧 Configuration Options

### Cache Settings
```javascript
// In .env file
COLOMBIA_HUB_CACHE_TIMEOUT_MINUTES=15  // Cache duration
COLOMBIA_HUB_MAX_NEWS_ITEMS=50         // Max news per request
COLOMBIA_HUB_MAX_VIDEO_ITEMS=20        // Max videos per request
COLOMBIA_HUB_RATE_LIMIT=1000           // Requests per hour
```

### Source Configuration
```javascript
// In ColombiaNewsAggregator.js
this.sources = {
  'source-id': {
    name: 'Source Name',
    url: 'https://source.com/feed.xml',
    icon: '📰',
    category: 'local' | 'international' | 'aggregated',
    filter: 'colombia' // Optional keyword filter
  }
}
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Set environment variables in Vercel dashboard
YOUTUBE_API_KEY=your_key_here
```

### Option 2: Netlify
```bash
# 1. Build project
npm run build

# 2. Deploy dist/ folder to Netlify
# 3. Configure environment variables in Netlify dashboard
```

### Option 3: GitHub Actions (Automated)
- Push to main branch triggers automatic deployment
- Environment variables configured in GitHub Secrets
- Deploys to GitHub Pages automatically

### Environment Variables for Production
```bash
# Required for full functionality
YOUTUBE_API_KEY=your_youtube_api_key
FRONTEND_URL=https://your-domain.com
PORT=3001

# Optional optimization
COLOMBIA_HUB_CACHE_TIMEOUT_MINUTES=30
COLOMBIA_HUB_RATE_LIMIT=2000
```

## 🎯 Usage

### Basic Usage
1. **Navigate to Colombia Hub**: Click "Colombia Hub" in navigation
2. **Browse Content**: View latest news and videos automatically
3. **Search**: Use search bar to find specific topics
4. **Filter**: Select categories or sources to narrow results
5. **View Details**: Click articles/videos to open in new tab

### Advanced Features
1. **Trending Content**: Shows most engaged-with content
2. **Real-time Updates**: Content refreshes automatically
3. **Source Filtering**: Select specific news sources
4. **Category Browsing**: Filter by politics, economy, culture, etc.
5. **Mobile Experience**: Fully responsive design

### API Usage
```javascript
// Get latest news
fetch('/api/colombia-hub/news?limit=20&category=politics')

// Get videos by category
fetch('/api/colombia-hub/videos?categories=news,culture&limit=12')

// Search all content
fetch('/api/colombia-hub/combined?search=petro&newsLimit=10&videoLimit=5')

// Force refresh cache
fetch('/api/colombia-hub/refresh', { method: 'POST' })
```

## 🔍 Troubleshooting

### Common Issues

**1. No videos loading**
- Check YouTube API key in `.env` file
- Verify API quota hasn't been exceeded
- Check console for API errors
- Fallback mock data will load if API fails

**2. News sources not updating**
- Check internet connection
- Verify RSS feed URLs are accessible
- Check console for parsing errors
- Individual source failures won't break entire system

**3. Slow loading times**
- Increase cache timeout in configuration
- Check server resources and bandwidth
- Enable compression in production
- Consider CDN for static assets

**4. Build errors**
- Run `npm install` to ensure dependencies
- Check TypeScript errors with `npm run build`
- Verify all imports are correct
- Check React version compatibility

### Performance Optimization

**Frontend**
- Lazy loading for images
- Virtual scrolling for large lists
- Component memoization
- Bundle splitting

**Backend**
- Aggressive caching (15-30 minutes)
- Parallel API requests
- Response compression
- Rate limiting protection

### Monitoring

**Analytics**
- Track popular content categories
- Monitor source reliability
- Measure user engagement
- API usage statistics

**Error Tracking**
- Failed RSS fetches
- YouTube API errors
- Cache performance
- User error rates

## 📈 Scaling

### Horizontal Scaling
- Load balancer for multiple instances
- Redis for shared caching
- Database for persistent data
- CDN for global distribution

### Vertical Scaling
- Increase cache memory
- Optimize RSS parsing
- Batch YouTube API calls
- Database indexing

## 🤝 Contributing

### Adding New Sources
1. Add source configuration to `ColombiaNewsAggregator.js`
2. Test RSS feed parsing
3. Add source icon and branding
4. Update documentation

### Adding New Features
1. Follow existing code patterns
2. Add TypeScript types
3. Include error handling
4. Add responsive design
5. Test on mobile devices

## 📄 License

MIT License - see LICENSE file for details.

---

**🌟 The Colombia News Hub sets a new standard for news aggregation platforms with its comprehensive source integration, real-time updates, and mobile-first design. Deploy in minutes and serve the latest Colombia content to your users! 🌟**