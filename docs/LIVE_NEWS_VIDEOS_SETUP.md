# Live News Videos Feature - Setup & Deployment Guide

## 🎥 Feature Overview

The Live News Videos feature provides real-time Colombian news videos from YouTube, integrated seamlessly into the Nuestro Pulso platform. Users can browse trending videos or search for specific topics, with a responsive video gallery showing thumbnails, titles, duration, and channel information.

![Live News Videos Feature](https://github.com/user-attachments/assets/8a338605-f8c1-4305-821e-b867a6115ac8)

## ✨ Key Features

- **📺 Trending Videos**: Displays popular Colombian news videos
- **🔍 Smart Search**: Search for specific news topics (e.g., "petro", "congreso", "economía")  
- **🔴 Live Indicators**: Shows live streaming videos with visual badges
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast Loading**: Cached results for optimal performance
- **🎯 Colombian Focus**: Specifically filters for Colombian news channels and content
- **🏢 Professional Sources**: Includes Caracol Noticias, RCN, Semana, El Tiempo, and more

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ 
- YouTube Data API v3 key

### 1. Environment Configuration

Copy the environment template and add your YouTube API key:

```bash
cp .env.example .env
```

Edit `.env` and update:
```bash
# YouTube Data API Configuration
YOUTUBE_API_KEY=your_actual_youtube_api_key_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
# Start both backend and frontend
npm run dev:full

# Or start individually:
npm run server  # Backend on port 3001
npm run dev     # Frontend on port 5173
```

### 4. Access the Feature

1. Open http://localhost:5173
2. Click on "VIDEO VIDEOS" in the navigation
3. Browse trending videos or use the search functionality

## 🔧 API Configuration

### Getting YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Restrict the key to YouTube Data API v3
6. Add your domain to authorized referrers

### API Endpoints

The backend provides these endpoints:

```bash
# Get trending Colombian news videos
GET /api/news-videos/trending?limit=12

# Search Colombian news videos  
GET /api/news-videos?q=search_term&limit=12

# Health check
GET /api/news-videos/health

# Cache management
POST /api/news-videos/cache/clear
GET /api/news-videos/cache/stats
```

## 📦 Deployment

### Deploy to Vercel

1. **Fork/Clone** the repository
2. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   vercel
   ```
3. **Set Environment Variables** in Vercel dashboard:
   ```
   YOUTUBE_API_KEY=your_api_key_here
   ```
4. **Deploy**:
   ```bash
   vercel --prod
   ```

### Deploy to Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Deploy to Netlify**:
   - Connect your GitHub repo to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variable: `YOUTUBE_API_KEY`

### Deploy with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Live News Videos

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## ⚙️ Configuration Options

### Frontend Configuration

Update `src/services/newsVideosService.ts`:

```typescript
// API endpoint
this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Cache timeout (5 minutes default)
this.cacheTimeout = 300000;
```

### Backend Configuration

Update `server/services/youtubeService.js`:

```javascript
// Cache timeout (5 minutes default)
this.cacheTimeout = 300000;

// Demo mode (when no API key)
this.demoMode = !this.apiKey || this.apiKey === 'demo_youtube_key_replace_with_real_key';
```

## 📊 Performance & Caching

- **Frontend Cache**: 5 minutes for API responses
- **Backend Cache**: 5 minutes for YouTube API results  
- **Rate Limiting**: Respects YouTube API quotas
- **Error Handling**: Graceful fallbacks for API failures
- **Demo Mode**: Works without API key for development

## 🔍 API Quota Management

YouTube API has daily quotas. Monitor usage:

```bash
# Check cache stats
GET /api/news-videos/cache/stats

# Clear cache if needed
POST /api/news-videos/cache/clear
```

## 🐛 Troubleshooting

### Common Issues

**"API quota exceeded"**
- Wait for quota reset (daily)
- Implement additional caching
- Consider multiple API keys

**"API not configured properly"**
- Check YouTube API key in `.env`
- Verify API is enabled in Google Cloud Console

**Videos not loading**
- Check network connectivity
- Verify CORS settings
- Check browser console for errors

### Debug Mode

Enable debug logging:

```javascript
// In youtubeService.js
console.log(`🔍 Searching YouTube for: "${searchQuery}"`);
console.log(`✅ Found ${processedVideos.length} Colombian news videos`);
```

## 📋 Testing

```bash
# Run linting
npm run lint

# Build production
npm run build

# Test health endpoint
curl http://localhost:3001/api/news-videos/health

# Test trending videos
curl "http://localhost:3001/api/news-videos/trending?limit=5"

# Test search
curl "http://localhost:3001/api/news-videos?q=petro&limit=5"
```

## 🎯 Feature Customization

### Add New News Channels

Edit `generateDemoVideos()` in `youtubeService.js`:

```javascript
const demoChannels = [
  'Caracol Noticias',
  'Noticias RCN', 
  'Semana',
  'El Tiempo',
  'Your New Channel' // Add here
];
```

### Modify Search Keywords

Update `searchColombianNews()` in `youtubeService.js`:

```javascript
const colombianNewsKeywords = [
  'colombia noticias',
  'noticias colombia',
  'your custom keyword' // Add here
];
```

## 📞 Support

For issues or questions:
1. Check the console logs for errors
2. Verify API key configuration
3. Test with demo mode first
4. Review YouTube API documentation

---

🎉 **Ready to deploy!** The Live News Videos feature is now fully configured and ready for production use.