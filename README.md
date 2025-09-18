# Nuestro Pulso - Ultimate Power Platform 🚀

## World-Class Colombian News & Community Platform

Nuestro Pulso is now a supercharged civic engagement platform that rivals Google in search capabilities and offers next-level social features for the Colombian community.

## 🌟 New World-Class Features

### 🔍 Google-Style Universal Search
- **Multi-Tab Search Interface**: All, News, Images, Videos, Shopping, Articles, and Local search tabs
- **Real-Time Results**: Lightning-fast search with Google Search & News API integration
- **Colombian Context**: Local search prioritizes Colombian sources and content
- **Advanced Filters**: Time range, region, language, and safety filters
- **Rich Results**: Grid/list views, instant video previews, and detailed result cards
- **Trending Topics**: Real-time trending searches in Colombia

### 👥 Next-Level Social Features  
- **Comunidad Passport**: Branded authentication system with enhanced security
- **Social Community Hub**: Facebook-style interface with feeds, posts, and engagement
- **Cross-Platform Sharing**: Integrate with WhatsApp, Facebook, Twitter, and YouTube
- **Friend Finder**: Connect with other Colombian citizens and activists
- **Community Marketplace**: Share opportunities and community listings
- **Real-Time Engagement**: Likes, comments, shares with social metrics

### ⚡ Performance & UX
- **Lightning-Fast Navigation**: Instant page transitions and component loading
- **Mobile-First Design**: Optimized for mobile, desktop, and tablet experiences  
- **Real-Time Updates**: Live news feeds and trending content
- **Progressive Web App**: Offline capabilities and native app experience

## Setup & Installation

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git
   cd nuestro-pulso-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Add your API keys for enhanced functionality
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables
For full functionality, configure these API keys in your `.env` file:
```env
# Google APIs for enhanced search
REACT_APP_GOOGLE_API_KEY=your_google_api_key
REACT_APP_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id

# News API for real-time news
REACT_APP_NEWS_API_KEY=your_news_api_key

# Firebase for authentication and data
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 🚀 New Features Guide

### Universal Search System
Navigate to the **Búsqueda Universal** section to access:
- **All Search**: Comprehensive results across all content types
- **News Search**: Latest Colombian and international news  
- **Images Search**: Visual content with preview capabilities
- **Videos Search**: Video content with instant previews
- **Local Search**: Colombian-focused results with regional priority
- **Advanced Settings**: Configure region, language, time filters

### Community Features
Access the **Community Hub** for:
- **Comunidad Passport**: Secure login with social integration
- **Feed & Posts**: Share thoughts, news reactions, and community content
- **Friend Network**: Connect with other engaged citizens
- **Cross-Platform Sharing**: Share to WhatsApp, Facebook, Twitter, YouTube
- **Marketplace**: Community-driven opportunities and listings

### Search Tips & Advanced Usage
- Use quotes for exact phrases: `"reforma pensional"`
- Exclude terms with minus: `política -corrupción`  
- Search specific sites: `site:eltiempo.com`
- Use OR for alternatives: `Bogotá OR Medellín`
- Enable **Local** mode for Colombian-priority results
- Use time filters for recent news and trending topics

## 🛠 Development

### Build Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Architecture
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and builds
- **Tailwind CSS** for responsive, mobile-first styling
- **Firebase** for authentication and real-time data
- **Google APIs** for search and news integration

### Component Structure
```
src/
├── components/
│   ├── GoogleStyleSearch.tsx      # Universal search interface
│   ├── SuperchargedCommunityHub.tsx # Social community features  
│   └── ...
├── pages/
│   ├── EnhancedSearch.tsx         # Main search page
│   └── ...
├── services/
│   ├── googleAPIService.ts        # Google API integration
│   ├── searchService.ts           # Enhanced search logic
│   └── ...
```

## 🇨🇴 Colombian Context Features

### Local Search Priority
- **Colombian News Sources**: El Tiempo, Semana, El Espectador, Caracol, RCN
- **Regional Content**: Prioritizes Bogotá, Medellín, Cali, and other major cities
- **Political Context**: Enhanced coverage of Colombian politics and civic engagement
- **Cultural Relevance**: Colombian-specific trending topics and social issues

### Community Engagement
- **Civic Participation**: Tools for democratic engagement and political discourse
- **Local Issues**: Platform for discussing regional challenges and solutions
- **Elections & Politics**: Comprehensive coverage of Colombian electoral processes
- **Social Movements**: Support for civic activism and community organizing

## 📱 Mobile & Cross-Platform

### Progressive Web App Features
- **Offline Access**: Core functionality available without internet
- **Push Notifications**: Real-time alerts for breaking news and community activity
- **Native Integration**: Share directly to device's social apps
- **Responsive Design**: Optimized for all screen sizes and orientations

### Cross-Platform Sharing
- **WhatsApp Integration**: Direct sharing to WhatsApp contacts and groups
- **Facebook Integration**: Post to Facebook feeds and pages
- **Twitter Integration**: Tweet content with hashtags and mentions  
- **YouTube Integration**: Share to YouTube community tabs and comments

## 🔒 Security & Privacy

### Enhanced Security Features
- **Comunidad Passport**: Secure authentication with privacy protection
- **Safe Search**: Configurable content filtering and safety settings
- **Data Protection**: Colombian privacy law compliance
- **Secure APIs**: Encrypted connections and secure API key management

## 🤝 Contributing

We welcome contributions to make Nuestro Pulso even better for the Colombian community:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📞 Support & Community

- **GitHub Issues**: Report bugs and request features
- **Community Hub**: Connect with other users and contributors
- **Documentation**: Comprehensive guides and API documentation
- **Social Media**: Follow us for updates and community highlights

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🇨🇴 About Nuestro Pulso

Nuestro Pulso is Colombia's leading civic engagement platform, empowering citizens to participate in democracy through technology. Our mission is to strengthen Colombian democracy by providing accessible, reliable, and comprehensive civic engagement tools.

**Built with ❤️ for Colombia** 🇨🇴