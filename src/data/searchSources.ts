export interface SearchSource {
  name: string;
  type: 'news' | 'government' | 'organization' | 'media' | 'global_news' | 'global_org';
  country: 'colombia' | 'global';
  category: 'local' | 'mundo';
  reliability: 'high' | 'medium';
  url: string;
  logo?: string;
}

// Colombian/Local sources - ONLY for Local Colombia search
export const LOCAL_SOURCES: SearchSource[] = [
  // Colombian News Media
  { name: 'El Tiempo', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'eltiempo.com' },
  { name: 'Semana', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'semana.com' },
  { name: 'Caracol Radio', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'caracol.com.co' },
  { name: 'RCN Radio', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'rcnradio.com' },
  { name: 'Blu Radio', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'bluradio.com' },
  { name: 'W Radio', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'wradio.com.co' },
  { name: 'El Espectador', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'elespectador.com' },
  { name: 'El Colombiano', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'elcolombiano.com' },
  { name: 'La República', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'larepublica.co' },
  { name: 'Portafolio', type: 'news', country: 'colombia', category: 'local', reliability: 'high', url: 'portafolio.co' },
  
  // Government Sources
  { name: 'Gov.co', type: 'government', country: 'colombia', category: 'local', reliability: 'high', url: 'gov.co' },
  { name: 'Presidencia de Colombia', type: 'government', country: 'colombia', category: 'local', reliability: 'high', url: 'presidencia.gov.co' },
  { name: 'Congreso de Colombia', type: 'government', country: 'colombia', category: 'local', reliability: 'high', url: 'congreso.gov.co' },
  { name: 'Senado de Colombia', type: 'government', country: 'colombia', category: 'local', reliability: 'high', url: 'senado.gov.co' },
  { name: 'Cámara de Representantes', type: 'government', country: 'colombia', category: 'local', reliability: 'high', url: 'camara.gov.co' },
  { name: 'Corte Constitucional', type: 'government', country: 'colombia', category: 'local', reliability: 'high', url: 'corteconstitucional.gov.co' },
  { name: 'Fiscalía General', type: 'government', country: 'colombia', category: 'local', reliability: 'high', url: 'fiscalia.gov.co' },
  { name: 'Procuraduría General', type: 'government', country: 'colombia', category: 'local', reliability: 'high', url: 'procuraduria.gov.co' },
  
  // Local Organizations and Nuestro Pulso
  { name: 'Nuestro Pulso', type: 'organization', country: 'colombia', category: 'local', reliability: 'high', url: 'nuestro-pulso.vercel.app' },
  { name: 'Transparencia por Colombia', type: 'organization', country: 'colombia', category: 'local', reliability: 'high', url: 'transparenciacolombia.org.co' },
  { name: 'Fundación Paz y Reconciliación', type: 'organization', country: 'colombia', category: 'local', reliability: 'high', url: 'pares.com.co' },
];

// Global/International sources - ONLY for Mundo search
export const GLOBAL_SOURCES: SearchSource[] = [
  // Major International News
  { name: 'BBC News', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'bbc.com' },
  { name: 'CNN', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'cnn.com' },
  { name: 'Reuters', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'reuters.com' },
  { name: 'Associated Press', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'apnews.com' },
  { name: 'The Guardian', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'theguardian.com' },
  { name: 'The New York Times', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'nytimes.com' },
  { name: 'The Washington Post', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'washingtonpost.com' },
  { name: 'Fox News', type: 'global_news', country: 'global', category: 'mundo', reliability: 'medium', url: 'foxnews.com' },
  { name: 'NBC News', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'nbcnews.com' },
  { name: 'ABC News', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'abcnews.go.com' },
  { name: 'Al Jazeera', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'aljazeera.com' },
  { name: 'France 24', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'france24.com' },
  { name: 'Deutsche Welle', type: 'global_news', country: 'global', category: 'mundo', reliability: 'high', url: 'dw.com' },
  
  // International Organizations
  { name: 'United Nations', type: 'global_org', country: 'global', category: 'mundo', reliability: 'high', url: 'un.org' },
  { name: 'World Bank', type: 'global_org', country: 'global', category: 'mundo', reliability: 'high', url: 'worldbank.org' },
  { name: 'International Monetary Fund', type: 'global_org', country: 'global', category: 'mundo', reliability: 'high', url: 'imf.org' },
  { name: 'World Health Organization', type: 'global_org', country: 'global', category: 'mundo', reliability: 'high', url: 'who.int' },
];

// Local Colombia filters and categories
export const LOCAL_FILTERS = {
  categories: [
    { id: 'congress', name: 'Congress of Colombia', icon: '🏢', description: 'Actividad del Congreso de la República' },
    { id: 'drugs-crime', name: 'Drugs & Crime', icon: '🚔', description: 'Narcotráfico y seguridad nacional' },
    { id: 'terror-news', name: 'Terror News', icon: '🚨', description: 'Terrorismo y amenazas de seguridad' },
    { id: 'petro-news', name: 'Gustavo Petro News', icon: '🇨🇴', description: 'Noticias del presidente Gustavo Petro' },
    { id: 'left-wing', name: 'Left Wing', icon: '🌹', description: 'Perspectiva política de izquierda' },
    { id: 'right-wing', name: 'Right Wing', icon: '🗳️', description: 'Perspectiva política de derecha' },
    { id: 'economy', name: 'Economía', icon: '💰', description: 'Economía nacional y finanzas' },
    { id: 'peace-process', name: 'Proceso de Paz', icon: '🕊️', description: 'Paz total y reconciliación' },
    { id: 'education', name: 'Educación', icon: '📚', description: 'Sistema educativo nacional' },
    { id: 'health', name: 'Salud', icon: '🏥', description: 'Sistema de salud pública' },
  ],
  locations: [
    { id: 'nacional', name: 'Nacional', icon: '🇨🇴' },
    { id: 'bogota', name: 'Bogotá', icon: '🏛️' },
    { id: 'medellin', name: 'Medellín', icon: '🏔️' },
    { id: 'cali', name: 'Cali', icon: '🌴' },
    { id: 'barranquilla', name: 'Barranquilla', icon: '🌊' },
    { id: 'cartagena', name: 'Cartagena', icon: '🏰' },
  ]
};

// Global Mundo filters and categories
export const GLOBAL_FILTERS = {
  categories: [
    { id: 'donald-trump', name: 'Donald Trump', icon: '🇺🇸', description: 'US Presidential politics and news' },
    { id: 'politics', name: 'Politics', icon: '🗳️', description: 'Global political developments' },
    { id: 'terror-news', name: 'Terror News', icon: '🚨', description: 'International terrorism and security threats' },
    { id: 'drugs-crime', name: 'Drugs & Crime', icon: '🚔', description: 'Global crime and drug trafficking' },
    { id: 'left-wing', name: 'Left Wing', icon: '🌹', description: 'Progressive and left-wing politics' },
    { id: 'right-wing', name: 'Right Wing', icon: '🏛️', description: 'Conservative and right-wing politics' },
    { id: 'technology', name: 'Technology', icon: '💻', description: 'Global tech developments' },
    { id: 'business', name: 'Business', icon: '💼', description: 'International business and finance' },
    { id: 'climate', name: 'Climate Change', icon: '🌍', description: 'Environmental and climate issues' },
    { id: 'health', name: 'Global Health', icon: '🏥', description: 'International health initiatives' },
  ],
  regions: [
    { id: 'global', name: 'Global', icon: '🌍' },
    { id: 'americas', name: 'Americas', icon: '🌎' },
    { id: 'europe', name: 'Europe', icon: '🇪🇺' },
    { id: 'asia', name: 'Asia', icon: '🌏' },
    { id: 'africa', name: 'Africa', icon: '🌍' },
    { id: 'middle-east', name: 'Middle East', icon: '🕌' },
  ]
};

// Get appropriate sources based on search mode
export const getSourcesForMode = (mode: 'local' | 'mundo'): SearchSource[] => {
  return mode === 'local' ? LOCAL_SOURCES : GLOBAL_SOURCES;
};

// Get appropriate filters based on search mode
export const getFiltersForMode = (mode: 'local' | 'mundo') => {
  return mode === 'local' ? LOCAL_FILTERS : GLOBAL_FILTERS;
};

// Check if a source is appropriate for a search mode
export const isSourceValidForMode = (source: SearchSource, mode: 'local' | 'mundo'): boolean => {
  return source.category === mode;
};

// Generate mode-appropriate search results
export const generateSearchResults = (query: string, mode: 'local' | 'mundo', count: number = 10) => {
  const sources = getSourcesForMode(mode);
  const results = [];
  
  for (let i = 0; i < Math.min(count, sources.length); i++) {
    const source = sources[i % sources.length];
    const result = {
      id: `${mode}-${Date.now()}-${i}`,
      title: `${query} - ${mode === 'local' ? 'Cobertura Nacional' : 'Global Coverage'} ${i + 1}`,
      description: mode === 'local' 
        ? `Análisis completo sobre ${query} en Colombia con perspectiva nacional y contexto local.`
        : `Comprehensive international coverage of ${query} with global perspective and analysis.`,
      url: `https://${source.url}/${encodeURIComponent(query)}`,
      source: source.name,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      type: 'news' as const,
      location: mode === 'local' ? 'Colombia' : 'Global',
      relevanceScore: Math.floor(98 - i * 2),
      category: mode === 'local' ? 'Política Nacional' : 'International News',
      tags: [query.toLowerCase(), mode === 'local' ? 'colombia' : 'global', mode === 'local' ? 'nacional' : 'international'],
      sourceType: source.type,
      reliability: source.reliability
    };
    results.push(result);
  }
  
  return results;
};