// Internationalization utilities for the Mundo search feature

export interface I18nLabels {
  searchTabs: {
    all: string;
    images: string;
    news: string;
    videos: string;
    shortVideos: string;
    shopping: string;
    forums: string;
    more: string;
    tools: string;
  };
  sections: {
    topStories: string;
    alsoInNews: string;
    peopleAlsoAsk: string;
    relatedSearches: string;
    feedback: string;
  };
  actions: {
    search: string;
    back: string;
    share: string;
    save: string;
    yes: string;
    no: string;
  };
  placeholders: {
    searchWorld: string;
  };
  feedback: {
    helpful: string;
  };
}

export const esLabels: I18nLabels = {
  searchTabs: {
    all: 'Todo',
    images: 'Imágenes',
    news: 'Noticias',
    videos: 'Videos',
    shortVideos: 'Videos cortos',
    shopping: 'Shopping',
    forums: 'Foros',
    more: 'Más',
    tools: 'Herramientas'
  },
  sections: {
    topStories: 'Principales noticias',
    alsoInNews: 'También en las noticias',
    peopleAlsoAsk: 'La gente también pregunta',
    relatedSearches: 'Búsquedas relacionadas',
    feedback: 'Feedback'
  },
  actions: {
    search: 'Buscar',
    back: 'Volver',
    share: 'Compartir',
    save: 'Guardar',
    yes: 'Sí',
    no: 'No'
  },
  placeholders: {
    searchWorld: 'Buscar en el mundo...'
  },
  feedback: {
    helpful: '¿Estos resultados te fueron útiles?'
  }
};

export const enLabels: I18nLabels = {
  searchTabs: {
    all: 'All',
    images: 'Images',
    news: 'News',
    videos: 'Videos',
    shortVideos: 'Short videos',
    shopping: 'Shopping',
    forums: 'Forums',
    more: 'More',
    tools: 'Tools'
  },
  sections: {
    topStories: 'Top stories',
    alsoInNews: 'Also in the news',
    peopleAlsoAsk: 'People also ask',
    relatedSearches: 'Related searches',
    feedback: 'Feedback'
  },
  actions: {
    search: 'Search',
    back: 'Back',
    share: 'Share',
    save: 'Save',
    yes: 'Yes',
    no: 'No'
  },
  placeholders: {
    searchWorld: 'Search the world...'
  },
  feedback: {
    helpful: 'Were these results helpful?'
  }
};

export type Language = 'es' | 'en';

export function getLabels(language: Language = 'es'): I18nLabels {
  return language === 'en' ? enLabels : esLabels;
}