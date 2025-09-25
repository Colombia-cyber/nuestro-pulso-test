# Video Sources Configuration Guide

## Overview

The Robust Reels Hub supports dynamic switching between multiple video sources with automatic fallback mechanisms. This ensures maximum reliability and availability of video content.

## Supported Video Sources

### 1. Primary API (Custom Video Service)
**Description**: Your main custom video API endpoint
**Environment Variables**:
```env
REACT_APP_VIDEO_PRIMARY_API_URL=https://api.nuestropulso.com/reels
REACT_APP_VIDEO_PRIMARY_API_KEY=your_primary_api_key
REACT_APP_ENABLE_PRIMARY_SOURCE=true
```

**API Format Expected**:
```json
{
  "videos": [
    {
      "id": "unique_video_id",
      "title": "Video Title",
      "description": "Video description",
      "videoUrl": "https://example.com/video.mp4",
      "embedUrl": "https://example.com/embed/video_id", 
      "thumbnail": "https://example.com/thumbnail.jpg",
      "duration": "3:45",
      "views": 12500,
      "likes": 890,
      "comments": 45,
      "shares": 23,
      "author": {
        "name": "Channel Name",
        "avatar": "👤",
        "verified": true,
        "followers": "125K"
      },
      "category": "Politics",
      "hashtags": ["#Politics", "#Colombia"],
      "isLive": false,
      "factChecked": true,
      "language": "es",
      "topics": ["Politics", "Government"]
    }
  ]
}
```

### 2. YouTube Data API v3
**Description**: Fetch videos from YouTube channels or search results
**Environment Variables**:
```env
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
REACT_APP_YOUTUBE_CHANNEL_ID=your_channel_id_optional
REACT_APP_ENABLE_YOUTUBE_SOURCE=true
```

**Setup Instructions**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add your API key to the environment variables

**Note**: If `REACT_APP_YOUTUBE_CHANNEL_ID` is provided, videos will be fetched from that specific channel. Otherwise, it will search for "colombia política noticias".

### 3. Google News API
**Description**: Fetch news articles with video content from NewsAPI
**Environment Variables**:
```env
REACT_APP_GOOGLE_NEWS_API_KEY=your_newsapi_key
REACT_APP_GOOGLE_NEWS_API_URL=https://newsapi.org/v2
REACT_APP_ENABLE_GOOGLE_NEWS_SOURCE=true
```

**Setup Instructions**:
1. Sign up at [NewsAPI](https://newsapi.org/)
2. Get your free API key
3. Add the API key to environment variables

### 4. News Feed API
**Description**: Alternative news source API
**Environment Variables**:
```env
REACT_APP_NEWS_FEED_API_URL=https://api.newsfeed.com/v1
REACT_APP_NEWS_FEED_API_KEY=your_newsfeed_api_key
REACT_APP_ENABLE_NEWS_FEED_SOURCE=true
```

**Setup Instructions**:
Replace with your preferred news API service.

### 5. Local Development API
**Description**: Local server for development and testing
**Environment Variables**:
```env
REACT_APP_LOCAL_VIDEO_API_URL=http://localhost:3001/api/videos
REACT_APP_LOCAL_VIDEO_API_KEY=development_key
REACT_APP_ENABLE_LOCAL_SOURCE=true
```

**Setup Instructions**:
Ensure your local development server is running on the specified port.

### 6. Mock Data (Fallback)
**Description**: Static mock data as final fallback
**Environment Variables**:
```env
REACT_APP_ENABLE_MOCK_SOURCE=true
```

**Note**: This should always be enabled as the final fallback option.

## Configuration Options

### Source Priority
Define the order in which sources are tried:
```env
REACT_APP_VIDEO_SOURCE_PRIORITY=primary,youtube,google-news,news-feed,local,mock
```

### Timeout and Retry Settings
```env
REACT_APP_VIDEO_REQUEST_TIMEOUT=10000  # 10 seconds
REACT_APP_VIDEO_RETRY_ATTEMPTS=3       # 3 retry attempts per source
REACT_APP_VIDEO_RETRY_DELAY=2000       # 2 seconds between retries
```

## Complete Environment Configuration

### Minimal Configuration (Mock Data Only)
```env
# Only mock data - works immediately without API keys
REACT_APP_VIDEO_SOURCE_PRIORITY=mock
REACT_APP_ENABLE_MOCK_SOURCE=true
REACT_APP_ENABLE_PRIMARY_SOURCE=false
REACT_APP_ENABLE_YOUTUBE_SOURCE=false
REACT_APP_ENABLE_GOOGLE_NEWS_SOURCE=false
REACT_APP_ENABLE_NEWS_FEED_SOURCE=false
REACT_APP_ENABLE_LOCAL_SOURCE=false
```

### YouTube Only Configuration
```env
# YouTube API only
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
REACT_APP_VIDEO_SOURCE_PRIORITY=youtube,mock
REACT_APP_ENABLE_YOUTUBE_SOURCE=true
REACT_APP_ENABLE_MOCK_SOURCE=true
REACT_APP_ENABLE_PRIMARY_SOURCE=false
REACT_APP_ENABLE_GOOGLE_NEWS_SOURCE=false
REACT_APP_ENABLE_NEWS_FEED_SOURCE=false
REACT_APP_ENABLE_LOCAL_SOURCE=false
```

### Full Configuration (All Sources)
```env
# Primary API
REACT_APP_VIDEO_PRIMARY_API_URL=https://api.nuestropulso.com/reels
REACT_APP_VIDEO_PRIMARY_API_KEY=your_primary_api_key

# YouTube
REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key
REACT_APP_YOUTUBE_CHANNEL_ID=your_channel_id

# Google News
REACT_APP_GOOGLE_NEWS_API_KEY=your_newsapi_key
REACT_APP_GOOGLE_NEWS_API_URL=https://newsapi.org/v2

# News Feed
REACT_APP_NEWS_FEED_API_URL=https://api.newsfeed.com/v1
REACT_APP_NEWS_FEED_API_KEY=your_newsfeed_api_key

# Local Development
REACT_APP_LOCAL_VIDEO_API_URL=http://localhost:3001/api/videos
REACT_APP_LOCAL_VIDEO_API_KEY=development_key

# Source Priority and Settings
REACT_APP_VIDEO_SOURCE_PRIORITY=primary,youtube,google-news,news-feed,local,mock
REACT_APP_ENABLE_PRIMARY_SOURCE=true
REACT_APP_ENABLE_YOUTUBE_SOURCE=true
REACT_APP_ENABLE_GOOGLE_NEWS_SOURCE=true
REACT_APP_ENABLE_NEWS_FEED_SOURCE=true
REACT_APP_ENABLE_LOCAL_SOURCE=true
REACT_APP_ENABLE_MOCK_SOURCE=true

# Performance Settings
REACT_APP_VIDEO_REQUEST_TIMEOUT=10000
REACT_APP_VIDEO_RETRY_ATTEMPTS=3
REACT_APP_VIDEO_RETRY_DELAY=2000
```

## How It Works

### Fallback Mechanism
1. **Primary Source**: Tries your main API first
2. **Secondary Sources**: Falls back to YouTube, Google News, etc.
3. **Local Development**: Uses local server if available
4. **Mock Data**: Final fallback with static content

### Error Handling
- **Automatic Retry**: Each source is retried up to 3 times
- **Source Switching**: If a source fails, automatically tries the next one
- **User Feedback**: Clear error messages and retry options
- **Graceful Degradation**: Always provides some content, even if just mock data

### Video Player Features
- **Multiple Formats**: Supports direct video URLs and embed URLs
- **Auto-Fallback**: If video fails to load, tries alternative sources
- **Error Recovery**: Users can manually retry or switch sources
- **Mobile Compatible**: Works on both desktop and mobile devices

## Troubleshooting

### Common Issues

#### No Videos Loading
**Symptoms**: Empty video list or constant loading
**Solutions**:
1. Check if at least mock data is enabled: `REACT_APP_ENABLE_MOCK_SOURCE=true`
2. Verify API keys are correctly set
3. Check browser console for error messages
4. Ensure source priority includes available sources

#### API Rate Limits
**Symptoms**: Videos load initially but stop after some time
**Solutions**:
1. Check API rate limits for your services
2. Implement request caching
3. Enable multiple sources for redundancy
4. Consider upgrading API plans

#### Video Playback Issues
**Symptoms**: Videos don't play or show errors
**Solutions**:
1. Check video URLs are accessible
2. Verify CORS settings for video sources
3. Test with different video formats
4. Enable embed URLs as fallback

### Debug Mode
Enable verbose logging by setting:
```env
NODE_ENV=development
```

Check browser console for detailed source loading information.

## Security Considerations

### API Key Protection
- Never commit API keys to version control
- Use environment variables only
- Consider server-side proxy for sensitive keys
- Implement API key rotation

### CORS and Security Headers
- Configure proper CORS policies
- Use HTTPS for all API endpoints
- Implement CSP headers for embedded content
- Validate all incoming data

## Testing

### Test Individual Sources
You can test each source independently by temporarily setting:
```env
REACT_APP_VIDEO_SOURCE_PRIORITY=youtube  # Test only YouTube
REACT_APP_VIDEO_SOURCE_PRIORITY=mock     # Test only mock data
```

### Load Testing
- Test with high video volumes
- Verify fallback mechanisms
- Check performance under load
- Monitor API rate limits

## Support

For additional help:
1. Check the browser console for error messages
2. Verify environment variables are loaded correctly
3. Test API endpoints independently
4. Review the source code in `src/services/videoSourcesService.ts`

## Contributing

To add new video sources:
1. Extend the `VideoSourcesService` class
2. Add new source configuration in `.env.example`
3. Update this documentation
4. Add appropriate error handling
5. Test the new source thoroughly