export interface KnowledgePanelTopic {
  id: string;
  name: string;
  type: 'company' | 'app' | 'service' | 'platform' | 'organization' | 'person' | 'brand';
  summary: string;
  logo: string;
  website: string;
  founded: string;
  founder: string[];
  headquarters: string;
  employees: string;
  industry: string;
  languages: string[];
  areaServed: string;
  rating: {
    score: number;
    source: string;
    reviews: string;
  };
  downloads: {
    count: string;
    platform: string;
  }[];
  marketCap?: string;
  revenue?: string;
  officialLinks: {
    label: string;
    url: string;
    icon: string;
    type: 'website' | 'app' | 'social' | 'download';
  }[];
  keyFacts: {
    label: string;
    value: string;
    icon: string;
  }[];
  relatedSearches: string[];
  newsKeywords: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const knowledgeTopics: Record<string, KnowledgePanelTopic> = {
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    type: 'platform',
    summary: 'Meta Platforms, Inc., doing business as Meta and formerly named Facebook, Inc., and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California. The company owns Facebook, Instagram, and WhatsApp, among other products and services.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png',
    website: 'https://facebook.com',
    founded: '2004',
    founder: ['Mark Zuckerberg', 'Eduardo Saverin', 'Andrew McCollum', 'Dustin Moskovitz', 'Chris Hughes'],
    headquarters: 'Menlo Park, California, USA',
    employees: '87,314 (2023)',
    industry: 'Social Media, Technology',
    languages: ['100+ languages'],
    areaServed: 'Worldwide',
    rating: {
      score: 4.1,
      source: 'Google Play Store',
      reviews: '15M+'
    },
    downloads: [
      { count: '5B+', platform: 'Google Play' },
      { count: '1B+', platform: 'App Store' }
    ],
    marketCap: '$797.5 billion USD',
    revenue: '$134.9 billion USD (2023)',
    officialLinks: [
      { label: 'Facebook Website', url: 'https://facebook.com', icon: '🌐', type: 'website' },
      { label: 'Facebook App', url: 'https://apps.apple.com/app/facebook/id284882215', icon: '📱', type: 'app' },
      { label: 'Instagram', url: 'https://instagram.com', icon: '📷', type: 'social' },
      { label: 'WhatsApp', url: 'https://whatsapp.com', icon: '💬', type: 'social' },
      { label: 'Meta for Business', url: 'https://business.facebook.com', icon: '💼', type: 'website' }
    ],
    keyFacts: [
      { label: 'Monthly Active Users', value: '3.07 billion', icon: '👥' },
      { label: 'Daily Active Users', value: '2.11 billion', icon: '📈' },
      { label: 'Revenue (2023)', value: '$134.9B', icon: '💰' },
      { label: 'Employees', value: '87,314', icon: '👨‍💼' },
      { label: 'Markets', value: '190+ countries', icon: '🌍' }
    ],
    relatedSearches: [
      'Meta Facebook',
      'Facebook Instagram',
      'Facebook WhatsApp',
      'Mark Zuckerberg',
      'Facebook stock',
      'Facebook advertising',
      'Facebook privacy',
      'Facebook Marketplace'
    ],
    newsKeywords: ['Facebook', 'Meta', 'Mark Zuckerberg', 'social media', 'Meta Platforms'],
    colors: {
      primary: '#1877F2',
      secondary: '#42A5F5',
      accent: '#E3F2FD'
    }
  },
  google: {
    id: 'google',
    name: 'Google',
    type: 'company',
    summary: 'Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
    website: 'https://google.com',
    founded: '1998',
    founder: ['Larry Page', 'Sergey Brin'],
    headquarters: 'Mountain View, California, USA',
    employees: '182,502 (2023)',
    industry: 'Internet, Technology, Artificial Intelligence',
    languages: ['150+ languages'],
    areaServed: 'Worldwide',
    rating: {
      score: 4.3,
      source: 'Google Play Store',
      reviews: '25M+'
    },
    downloads: [
      { count: '10B+', platform: 'Google Play' },
      { count: '2B+', platform: 'App Store' }
    ],
    marketCap: '$1.7 trillion USD',
    revenue: '$307.4 billion USD (2023)',
    officialLinks: [
      { label: 'Google Search', url: 'https://google.com', icon: '🔍', type: 'website' },
      { label: 'Google App', url: 'https://apps.apple.com/app/google/id284815942', icon: '📱', type: 'app' },
      { label: 'Google Workspace', url: 'https://workspace.google.com', icon: '💼', type: 'website' },
      { label: 'Google Cloud', url: 'https://cloud.google.com', icon: '☁️', type: 'website' },
      { label: 'YouTube', url: 'https://youtube.com', icon: '📺', type: 'social' }
    ],
    keyFacts: [
      { label: 'Search Queries/Day', value: '8.5 billion', icon: '🔍' },
      { label: 'Market Share', value: '92% (Search)', icon: '📊' },
      { label: 'Revenue (2023)', value: '$307.4B', icon: '💰' },
      { label: 'Employees', value: '182,502', icon: '👨‍💼' },
      { label: 'Products', value: '100+', icon: '📦' }
    ],
    relatedSearches: [
      'Alphabet Google',
      'Google Search',
      'Google Maps',
      'Google Drive',
      'Google Chrome',
      'Android Google',
      'Google Assistant',
      'Google Cloud'
    ],
    newsKeywords: ['Google', 'Alphabet', 'search engine', 'technology', 'artificial intelligence'],
    colors: {
      primary: '#4285F4',
      secondary: '#34A853',
      accent: '#FBBC04'
    }
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    type: 'app',
    summary: 'WhatsApp Messenger, or simply WhatsApp, is an internationally available American freeware, cross-platform centralized instant messaging and voice-over-IP service owned by Meta Platforms.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png',
    website: 'https://whatsapp.com',
    founded: '2009',
    founder: ['Brian Acton', 'Jan Koum'],
    headquarters: 'Menlo Park, California, USA',
    employees: '2,000+ (estimated)',
    industry: 'Instant Messaging, Communication',
    languages: ['60+ languages'],
    areaServed: 'Worldwide (except China)',
    rating: {
      score: 4.0,
      source: 'Google Play Store',
      reviews: '100M+'
    },
    downloads: [
      { count: '5B+', platform: 'Google Play' },
      { count: '500M+', platform: 'App Store' }
    ],
    officialLinks: [
      { label: 'WhatsApp Web', url: 'https://web.whatsapp.com', icon: '🌐', type: 'website' },
      { label: 'WhatsApp Android', url: 'https://play.google.com/store/apps/details?id=com.whatsapp', icon: '📱', type: 'download' },
      { label: 'WhatsApp iOS', url: 'https://apps.apple.com/app/whatsapp-messenger/id310633997', icon: '🍎', type: 'download' },
      { label: 'WhatsApp Business', url: 'https://business.whatsapp.com', icon: '💼', type: 'website' },
      { label: 'WhatsApp Desktop', url: 'https://www.whatsapp.com/download', icon: '💻', type: 'download' }
    ],
    keyFacts: [
      { label: 'Monthly Users', value: '2.78 billion', icon: '👥' },
      { label: 'Messages/Day', value: '100+ billion', icon: '💬' },
      { label: 'Voice Calls/Day', value: '2+ billion', icon: '📞' },
      { label: 'Countries', value: '180+', icon: '🌍' },
      { label: 'Languages', value: '60+', icon: '🌐' }
    ],
    relatedSearches: [
      'WhatsApp Web',
      'WhatsApp Business',
      'WhatsApp Desktop',
      'WhatsApp status',
      'WhatsApp backup',
      'WhatsApp call',
      'Meta WhatsApp',
      'WhatsApp privacy'
    ],
    newsKeywords: ['WhatsApp', 'instant messaging', 'Meta', 'communication', 'privacy'],
    colors: {
      primary: '#25D366',
      secondary: '#128C7E',
      accent: '#DCF8C6'
    }
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    type: 'platform',
    summary: 'YouTube is an American online video sharing and social media platform owned by Google. Accessible worldwide, it was launched on February 14, 2005, by Steve Chen, Chad Hurley, and Jawed Karim.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png',
    website: 'https://youtube.com',
    founded: '2005',
    founder: ['Steve Chen', 'Chad Hurley', 'Jawed Karim'],
    headquarters: 'San Bruno, California, USA',
    employees: '4,000+ (estimated)',
    industry: 'Video Sharing, Social Media, Entertainment',
    languages: ['80+ languages'],
    areaServed: 'Worldwide (with restrictions)',
    rating: {
      score: 4.2,
      source: 'Google Play Store',
      reviews: '50M+'
    },
    downloads: [
      { count: '10B+', platform: 'Google Play' },
      { count: '1B+', platform: 'App Store' }
    ],
    officialLinks: [
      { label: 'YouTube Website', url: 'https://youtube.com', icon: '🌐', type: 'website' },
      { label: 'YouTube App', url: 'https://apps.apple.com/app/youtube-watch-listen-stream/id544007664', icon: '📱', type: 'app' },
      { label: 'YouTube Studio', url: 'https://studio.youtube.com', icon: '🎬', type: 'website' },
      { label: 'YouTube Music', url: 'https://music.youtube.com', icon: '🎵', type: 'website' },
      { label: 'YouTube TV', url: 'https://tv.youtube.com', icon: '📺', type: 'website' }
    ],
    keyFacts: [
      { label: 'Monthly Users', value: '2.7 billion', icon: '👥' },
      { label: 'Hours Watched/Day', value: '1+ billion', icon: '⏱️' },
      { label: 'Videos Uploaded/Min', value: '500+ hours', icon: '📹' },
      { label: 'Creators with 1M+', value: '2M+', icon: '🌟' },
      { label: 'Countries Available', value: '100+', icon: '🌍' }
    ],
    relatedSearches: [
      'YouTube Music',
      'YouTube TV',
      'YouTube Premium',
      'YouTube Studio',
      'YouTube Shorts',
      'YouTube Kids',
      'Google YouTube',
      'YouTube monetization'
    ],
    newsKeywords: ['YouTube', 'video sharing', 'Google', 'content creators', 'streaming'],
    colors: {
      primary: '#FF0000',
      secondary: '#282828',
      accent: '#FFFFFF'
    }
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    type: 'platform',
    summary: 'Instagram is a photo and video sharing social networking service owned by American company Meta Platforms. The app allows users to upload media that can be edited with filters and organized by hashtags and geographical tagging.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png',
    website: 'https://instagram.com',
    founded: '2010',
    founder: ['Kevin Systrom', 'Mike Krieger'],
    headquarters: 'Menlo Park, California, USA',
    employees: '25,000+ (estimated)',
    industry: 'Social Media, Photo Sharing',
    languages: ['32 languages'],
    areaServed: 'Worldwide',
    rating: {
      score: 4.2,
      source: 'Google Play Store',
      reviews: '80M+'
    },
    downloads: [
      { count: '5B+', platform: 'Google Play' },
      { count: '1B+', platform: 'App Store' }
    ],
    officialLinks: [
      { label: 'Instagram Website', url: 'https://instagram.com', icon: '🌐', type: 'website' },
      { label: 'Instagram App', url: 'https://apps.apple.com/app/instagram/id389801252', icon: '📱', type: 'app' },
      { label: 'Instagram for Business', url: 'https://business.instagram.com', icon: '💼', type: 'website' },
      { label: 'Instagram Reels', url: 'https://help.instagram.com/270963803047681', icon: '🎬', type: 'website' },
      { label: 'Creator Studio', url: 'https://business.facebook.com/creatorstudio', icon: '🎨', type: 'website' }
    ],
    keyFacts: [
      { label: 'Monthly Users', value: '2 billion', icon: '👥' },
      { label: 'Daily Stories', value: '500M+', icon: '📸' },
      { label: 'Daily Active Users', value: '500M+', icon: '📈' },
      { label: 'Business Accounts', value: '200M+', icon: '💼' },
      { label: 'Hashtags/Day', value: '95M+', icon: '#️⃣' }
    ],
    relatedSearches: [
      'Instagram Stories',
      'Instagram Reels',
      'Meta Instagram',
      'Instagram Business',
      'Instagram hashtags',
      'Instagram filters',
      'Instagram shopping',
      'Instagram ads'
    ],
    newsKeywords: ['Instagram', 'social media', 'Meta', 'photo sharing', 'influencers'],
    colors: {
      primary: '#E4405F',
      secondary: '#833AB4',
      accent: '#F77737'
    }
  },
  twitter: {
    id: 'twitter',
    name: 'X (Twitter)',
    type: 'platform',
    summary: 'X, formerly known as Twitter, is a social media platform for sharing short messages called "posts" (formerly "tweets"). Owned by X Corp., it enables real-time communication and news sharing globally.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.svg/2048px-X_logo_2023_%28white%29.svg.png',
    website: 'https://x.com',
    founded: '2006',
    founder: ['Jack Dorsey', 'Noah Glass', 'Biz Stone', 'Evan Williams'],
    headquarters: 'San Francisco, California, USA',
    employees: '2,900+ (2023)',
    industry: 'Social Media, Microblogging',
    languages: ['40+ languages'],
    areaServed: 'Worldwide',
    rating: {
      score: 3.8,
      source: 'Google Play Store',
      reviews: '10M+'
    },
    downloads: [
      { count: '1B+', platform: 'Google Play' },
      { count: '500M+', platform: 'App Store' }
    ],
    officialLinks: [
      { label: 'X Website', url: 'https://x.com', icon: '🌐', type: 'website' },
      { label: 'X App', url: 'https://apps.apple.com/app/x/id333903271', icon: '📱', type: 'app' },
      { label: 'X for Business', url: 'https://business.x.com', icon: '💼', type: 'website' },
      { label: 'X Premium', url: 'https://help.x.com/en/using-x/x-premium', icon: '⭐', type: 'website' },
      { label: 'X Developer', url: 'https://developer.x.com', icon: '💻', type: 'website' }
    ],
    keyFacts: [
      { label: 'Monthly Users', value: '540 million', icon: '👥' },
      { label: 'Daily Posts', value: '500M+', icon: '💬' },
      { label: 'Daily Active Users', value: '250M+', icon: '📈' },
      { label: 'Countries', value: '190+', icon: '🌍' },
      { label: 'Languages', value: '40+', icon: '🌐' }
    ],
    relatedSearches: [
      'X Twitter',
      'Elon Musk Twitter',
      'X Premium',
      'Twitter API',
      'X for Business',
      'Twitter trending',
      'X verification',
      'Twitter spaces'
    ],
    newsKeywords: ['Twitter', 'X', 'Elon Musk', 'social media', 'microblogging'],
    colors: {
      primary: '#000000',
      secondary: '#1DA1F2',
      accent: '#FFFFFF'
    }
  }
};

export const detectTopicFromQuery = (query: string): KnowledgePanelTopic | null => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  // Direct matches
  if (knowledgeTopics[lowercaseQuery]) {
    return knowledgeTopics[lowercaseQuery];
  }
  
  // More precise keyword matching - only match if the topic name appears as a word
  for (const [key, topic] of Object.entries(knowledgeTopics)) {
    const topicName = topic.name.toLowerCase();
    
    // Check if the query is exactly the topic name or contains the topic name as a whole word
    if (lowercaseQuery === topicName || 
        new RegExp(`\\b${topicName}\\b`).test(lowercaseQuery)) {
      return topic;
    }
    
    // Also check for exact keyword matches (but not partial matches)
    for (const keyword of topic.newsKeywords) {
      if (lowercaseQuery === keyword.toLowerCase() || 
          new RegExp(`\\b${keyword.toLowerCase()}\\b`).test(lowercaseQuery)) {
        return topic;
      }
    }
  }
  
  return null;
};

export const getAllKnowledgeTopics = (): KnowledgePanelTopic[] => {
  return Object.values(knowledgeTopics);
};