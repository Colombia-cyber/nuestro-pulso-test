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
  },
  'donald trump': {
    id: 'donald-trump',
    name: 'Donald Trump',
    type: 'person',
    summary: 'Donald John Trump is an American politician, media personality, and businessman who served as the 45th president of the United States from 2017 to 2021. He was the Republican Party nominee for president in 2016, 2020, and 2024.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/1200px-Donald_Trump_official_portrait.jpg',
    website: 'https://www.donaldjtrump.com',
    founded: 'Born: June 14, 1946',
    founder: ['Donald Trump Sr.', 'Mary Anne MacLeod Trump'],
    headquarters: 'Mar-a-Lago, Palm Beach, Florida, USA',
    employees: 'Various Trump Organization staff',
    industry: 'Politics, Business, Real Estate',
    languages: ['English'],
    areaServed: 'United States, Global influence',
    rating: {
      score: 3.2,
      source: 'Various polls',
      reviews: 'Mixed public opinion'
    },
    downloads: [],
    marketCap: 'Net worth: $2.6 billion (2024 est.)',
    revenue: 'Trump Organization revenues',
    officialLinks: [
      { label: 'Truth Social', url: 'https://truthsocial.com/@realDonaldTrump', icon: '📱', type: 'social' },
      { label: 'Official Website', url: 'https://www.donaldjtrump.com', icon: '🌐', type: 'website' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Donald_Trump', icon: '📚', type: 'website' },
      { label: 'Trump Organization', url: 'https://www.trump.com', icon: '🏢', type: 'website' },
      { label: 'Presidential Library', url: 'https://www.trumplibrary.gov', icon: '🏛️', type: 'website' }
    ],
    keyFacts: [
      { label: '45th President', value: '2017-2021', icon: '🏛️' },
      { label: 'Age', value: '78 years old', icon: '👤' },
      { label: 'Political Party', value: 'Republican', icon: '🐘' },
      { label: 'Born', value: 'Queens, NY', icon: '🗽' },
      { label: 'Education', value: 'Wharton School', icon: '🎓' },
      { label: 'Children', value: '5 children', icon: '👨‍👩‍👧‍👦' },
      { label: 'Business', value: 'Trump Organization', icon: '🏢' },
      { label: 'TV Show', value: 'The Apprentice', icon: '📺' }
    ],
    relatedSearches: [
      'Donald Trump 2024',
      'Trump legal cases',
      'Trump presidency',
      'Truth Social',
      'Trump Organization',
      'Melania Trump',
      'Trump family',
      'Trump policies',
      'Trump rallies',
      'Trump news'
    ],
    newsKeywords: ['Donald Trump', 'Trump', 'President Trump', '45th President', 'Republican', 'MAGA'],
    colors: {
      primary: '#C41E3A',
      secondary: '#002868',
      accent: '#FFFFFF'
    }
  },
  'elon musk': {
    id: 'elon-musk',
    name: 'Elon Musk',
    type: 'person',
    summary: 'Elon Reeve Musk is a businessman and investor known for his key roles in space company SpaceX and automotive company Tesla, Inc. He is also owner of social media platform X (formerly Twitter) and has interests in artificial intelligence and neural technology.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/1200px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg',
    website: 'https://x.com/elonmusk',
    founded: 'Born: June 28, 1971',
    founder: ['Errol Musk', 'Maye Musk'],
    headquarters: 'Austin, Texas, USA',
    employees: 'Tesla: 140,000+, SpaceX: 13,000+',
    industry: 'Technology, Space, Automotive, AI',
    languages: ['English', 'Afrikaans'],
    areaServed: 'Worldwide',
    rating: {
      score: 4.2,
      source: 'Business leadership ratings',
      reviews: 'Generally positive in tech industry'
    },
    downloads: [],
    marketCap: 'Net worth: $219 billion (2024)',
    revenue: 'Tesla: $96.8B, SpaceX: $8B+ (2023)',
    officialLinks: [
      { label: 'X (Twitter)', url: 'https://x.com/elonmusk', icon: '🐦', type: 'social' },
      { label: 'Tesla', url: 'https://www.tesla.com', icon: '🚗', type: 'website' },
      { label: 'SpaceX', url: 'https://www.spacex.com', icon: '🚀', type: 'website' },
      { label: 'Neuralink', url: 'https://neuralink.com', icon: '🧠', type: 'website' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Elon_Musk', icon: '📚', type: 'website' }
    ],
    keyFacts: [
      { label: 'Net Worth', value: '$219 billion', icon: '💰' },
      { label: 'Age', value: '53 years old', icon: '👤' },
      { label: 'Companies', value: 'Tesla, SpaceX, X', icon: '🏢' },
      { label: 'Born', value: 'Pretoria, South Africa', icon: '🌍' },
      { label: 'Education', value: 'UPenn', icon: '🎓' },
      { label: 'Children', value: '12 children', icon: '👨‍👩‍👧‍👦' },
      { label: 'Citizenship', value: 'US, Canada, South Africa', icon: '🛂' },
      { label: 'Tesla Stock', value: '20.5% ownership', icon: '📈' }
    ],
    relatedSearches: [
      'Elon Musk Tesla',
      'Elon Musk SpaceX',
      'Elon Musk Twitter X',
      'Elon Musk net worth',
      'Elon Musk Neuralink',
      'Elon Musk AI',
      'Elon Musk Mars',
      'Elon Musk news',
      'Elon Musk quotes',
      'Elon Musk biography'
    ],
    newsKeywords: ['Elon Musk', 'Tesla', 'SpaceX', 'X Twitter', 'Neuralink', 'entrepreneur'],
    colors: {
      primary: '#000000',
      secondary: '#E31B23',
      accent: '#FFFFFF'
    }
  },
  'taylor swift': {
    id: 'taylor-swift',
    name: 'Taylor Swift',
    type: 'person',
    summary: 'Taylor Alison Swift is an American singer-songwriter. Known for her autobiographical songwriting, artistic reinventions, and cultural impact, Swift is a leading figure in popular music and the subject of widespread public interest.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_4.png/1200px-Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_4.png',
    website: 'https://www.taylorswift.com',
    founded: 'Born: December 13, 1989',
    founder: ['Scott Swift', 'Andrea Swift'],
    headquarters: 'Nashville, Tennessee / New York, USA',
    employees: 'Large touring and production team',
    industry: 'Music, Entertainment',
    languages: ['English'],
    areaServed: 'Worldwide',
    rating: {
      score: 4.8,
      source: 'Music platforms average',
      reviews: 'Critically acclaimed'
    },
    downloads: [],
    marketCap: 'Net worth: $1.1 billion (2024)',
    revenue: 'Eras Tour: $1+ billion grossed',
    officialLinks: [
      { label: 'Official Website', url: 'https://www.taylorswift.com', icon: '🌐', type: 'website' },
      { label: 'Instagram', url: 'https://www.instagram.com/taylorswift', icon: '📷', type: 'social' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02', icon: '🎵', type: 'website' },
      { label: 'Apple Music', url: 'https://music.apple.com/us/artist/taylor-swift/159260351', icon: '🍎', type: 'website' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Taylor_Swift', icon: '📚', type: 'website' }
    ],
    keyFacts: [
      { label: 'Net Worth', value: '$1.1 billion', icon: '💰' },
      { label: 'Age', value: '35 years old', icon: '👤' },
      { label: 'Albums', value: '11 studio albums', icon: '💿' },
      { label: 'Grammy Awards', value: '14 wins', icon: '🏆' },
      { label: 'Record Sales', value: '200M+ worldwide', icon: '📈' },
      { label: 'Streaming', value: '100B+ streams', icon: '🎧' },
      { label: 'Tours', value: 'Eras Tour record-breaking', icon: '🎤' },
      { label: 'Born', value: 'West Reading, PA', icon: '🏠' }
    ],
    relatedSearches: [
      'Taylor Swift Eras Tour',
      'Taylor Swift boyfriend',
      'Taylor Swift new album',
      'Taylor Swift Travis Kelce',
      'Taylor Swift lyrics',
      'Taylor Swift tickets',
      'Taylor Swift net worth',
      'Taylor Swift songs',
      'Taylor Swift tour dates',
      'Swifties'
    ],
    newsKeywords: ['Taylor Swift', 'Swifties', 'Eras Tour', 'pop music', 'Travis Kelce'],
    colors: {
      primary: '#B784A7',
      secondary: '#F5F5DC',
      accent: '#FFD700'
    }
  }
};

// Enhanced topic detection with better world vs local classification
export const detectTopicFromQuery = (query: string): KnowledgePanelTopic | null => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  // Direct matches first
  if (knowledgeTopics[lowercaseQuery]) {
    return knowledgeTopics[lowercaseQuery];
  }
  
  // More precise keyword matching - only match if the topic name appears as a word
  for (const [key, topic] of Object.entries(knowledgeTopics)) {
    const topicName = topic.name.toLowerCase();
    
    // Check if the query is exactly the topic name or contains the topic name as a whole word
    if (lowercaseQuery === topicName || 
        new RegExp(`\\b${topicName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(lowercaseQuery)) {
      return topic;
    }
    
    // Also check for exact keyword matches (but not partial matches)
    for (const keyword of topic.newsKeywords) {
      const escapedKeyword = keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (lowercaseQuery === keyword.toLowerCase() || 
          new RegExp(`\\b${escapedKeyword}\\b`).test(lowercaseQuery)) {
        return topic;
      }
    }
  }
  
  return null;
};

// Define world topics (global figures, companies, concepts)
const WORLD_TOPICS = new Set([
  'donald trump', 'trump', 'elon musk', 'taylor swift', 'facebook', 'meta',
  'instagram', 'twitter', 'x', 'youtube', 'whatsapp', 'google', 'apple',
  'microsoft', 'amazon', 'tesla', 'spacex', 'netflix', 'tiktok'
]);

// Define local/Colombian topic indicators
const LOCAL_INDICATORS = new Set([
  'colombia', 'colombiano', 'colombiana', 'bogotá', 'medellín', 'cali',
  'barranquilla', 'cartagena', 'gustavo petro', 'petro', 'congreso colombia',
  'gobierno colombia', 'senado colombia', 'cámara representantes',
  'corte constitucional', 'procuraduría', 'fiscalía', 'banco república',
  'ecopetrol', 'avianca', 'grupo aval', 'caracol', 'rcn', 'el tiempo',
  'semana', 'cambio', 'peso colombiano', 'cop'
]);

// Enhanced search mode detection
export const detectSearchMode = (query: string): 'world' | 'local' => {
  const lowercaseQuery = query.toLowerCase().trim();
  
  // Check for explicit local indicators first
  for (const indicator of LOCAL_INDICATORS) {
    if (lowercaseQuery.includes(indicator)) {
      return 'local';
    }
  }
  
  // Check for world topics
  for (const worldTopic of WORLD_TOPICS) {
    if (lowercaseQuery.includes(worldTopic)) {
      return 'world';
    }
  }
  
  // If we have a knowledge panel topic, it's likely a world topic
  if (detectTopicFromQuery(query)) {
    return 'world';
  }
  
  // Default heuristics:
  // - Single words or well-known names tend to be world topics
  // - Phrases with Colombian context words are local
  // - Generic topics default to world for better international coverage
  
  const words = lowercaseQuery.split(/\s+/);
  
  // Single word queries or famous names -> world
  if (words.length === 1 || 
      words.length === 2 && /^[a-z]+\s[a-z]+$/.test(lowercaseQuery)) {
    return 'world';
  }
  
  // Complex phrases default to local unless they contain world indicators
  return 'local';
};

// Check if a query should show knowledge panel (world topics with available data)
export const shouldShowKnowledgePanel = (query: string, searchMode: 'world' | 'local'): boolean => {
  return searchMode === 'world' && detectTopicFromQuery(query) !== null;
};

export const getAllKnowledgeTopics = (): KnowledgePanelTopic[] => {
  return Object.values(knowledgeTopics);
};