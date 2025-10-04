# LiveDashboard - API Configuration Guide

The LiveDashboard component integrates YouTube videos, News articles, and Firebase real-time chat to provide a comprehensive topic-based information hub.

## 🚀 Features

- **Topic Selection**: Choose from 8 categories (Politics, Economy, Security, Environment, Education, Health, Technology, Culture)
- **YouTube Videos**: Live video search results with thumbnails and metadata
- **News Articles**: Latest news articles with images and source links
- **Real-time Chat**: Firebase-powered community discussion per topic
- **Demo Mode**: Works without API keys using sample data
- **Instant Updates**: Topic switching updates all sections in real-time
- **Google-style Layout**: Familiar search results experience

## 📋 Required API Keys

### 1. YouTube Data API v3
**Purpose**: Fetch video search results for selected topics

**How to get:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "YouTube Data API v3"
4. Go to Credentials → Create Credentials → API Key
5. Copy the API key

**Add to `.env`:**
```bash
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
```

**Cost**: Free tier includes 10,000 units/day (100 video searches)

---

### 2. News API
**Purpose**: Fetch latest news articles for selected topics

**How to get:**
1. Go to [NewsAPI.org](https://newsapi.org/register)
2. Sign up for free account
3. Copy your API key from dashboard

**Add to `.env`:**
```bash
VITE_NEWSAPI_KEY=your_newsapi_key_here
```

**Cost**: Free tier includes 100 requests/day, 1000/month

---

### 3. Firebase (Firestore + Authentication)
**Purpose**: Real-time chat messages and user authentication

**How to get:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database (Start in test mode for development)
4. Enable Authentication (Email/Password provider)
5. Go to Project Settings → General → Your apps
6. Copy the Firebase configuration

**Add to `.env`:**
```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

**Cost**: Free tier includes generous limits (50k reads, 20k writes per day)

---

## 🎯 Quick Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your API keys to `.env` file

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Navigate to `/dashboard` in your browser

## 🎭 Demo Mode

The dashboard works without API keys by showing sample/demo data:
- **No YouTube API**: Shows 4 demo videos
- **No News API**: Shows 5 demo articles  
- **No Firebase**: Chat still works locally (no persistence)

This allows you to test the UI and functionality before configuring APIs.

## 🔧 API Configuration Status

The dashboard shows an "⚙️ API Config" button in the top-right corner:
- **Green indicator**: All APIs configured
- Click to see detailed status of each API

## 📁 File Structure

```
src/components/dashboard/
├── README.md                    # This file
├── VideoResults.tsx             # YouTube video display
├── NewsResults.tsx              # News articles display
└── TopicChat.tsx                # Real-time chat interface

src/components/
└── LiveDashboard.tsx            # Main dashboard component

src/services/
├── youtubeService.ts            # YouTube API integration
├── newsAPIService.ts            # News API integration
└── firebaseChatService.ts       # Firebase chat service

src/types/
└── dashboard.ts                 # TypeScript interfaces
```

## 🌐 Usage

Access the dashboard at: `http://localhost:5173/dashboard`

1. **Select a Topic**: Click on any topic button (Politics, Economy, etc.)
2. **Browse Videos**: Scroll through YouTube results on the left
3. **Read News**: Check latest articles in the center
4. **Join Chat**: Enter your name and start chatting on the right
5. **Switch Topics**: Click any other topic to instantly update all sections

## 🔒 Security Notes

- Never commit `.env` file to version control
- Use environment variables for production deployment
- Firebase security rules should be configured for production
- Rotate API keys regularly
- Monitor API usage to avoid quota limits

## 📊 Rate Limits

| API | Free Tier | Limit Type |
|-----|-----------|------------|
| YouTube | 10,000 units/day | Per project |
| News API | 100 requests/day | Per API key |
| Firebase | 50k reads, 20k writes/day | Per project |

## 🐛 Troubleshooting

**Videos not loading?**
- Check YouTube API key in `.env`
- Verify API is enabled in Google Cloud Console
- Check browser console for error messages

**News not showing?**
- Verify News API key is correct
- Check API quota hasn't been exceeded
- Ensure topic search is supported by News API

**Chat not working?**
- Verify Firebase configuration
- Check Firestore is enabled
- Ensure authentication provider is enabled
- Check Firebase security rules

## 🎨 Customization

To add more topics, edit `src/types/dashboard.ts`:

```typescript
export type TopicCategory = 
  | 'politics' 
  | 'economy' 
  | 'security'
  | 'your_new_topic'; // Add here
```

Then update the topic configuration in `LiveDashboard.tsx`.

## 📝 License

This component is part of the Nuestro Pulso project.
