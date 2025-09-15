// Comprehensive reels data for the application
export interface PulseReel {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  views: number;
  likes: number;
  thumbnail: string;
  author: string;
  videoUrl?: string;
  isLive?: boolean;
  tags?: string[];
}

export const pulseReels: PulseReel[] = [
  {
    id: 1,
    title: 'Cómo participar en el proceso electoral colombiano',
    description: 'Guía rápida sobre tu derecho al voto y los requisitos para participar',
    category: 'politica',
    duration: '2:30',
    views: 15420,
    likes: 892,
    thumbnail: '🗳️',
    author: 'Registraduría Nacional',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['voto', 'democracia', 'elecciones']
  },
  {
    id: 2,
    title: 'Terror en las fronteras: Situación actual en Norte de Santander',
    description: 'Reporte especial sobre las amenazas terroristas en zonas fronterizas y medidas de seguridad',
    category: 'terror',
    duration: '4:45',
    views: 45600,
    likes: 2340,
    thumbnail: '🚨',
    author: 'Caracol Noticias',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['seguridad', 'frontera', 'terrorismo']
  },
  {
    id: 3,
    title: 'Trump vs Colombia: Análisis de las nuevas políticas comerciales',
    description: 'Expertos analizan el impacto de las propuestas de Trump sobre aranceles a productos colombianos',
    category: 'trump',
    duration: '6:20',
    views: 78900,
    likes: 3456,
    thumbnail: '🇺🇸',
    author: 'CNN en Español',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['comercio', 'aranceles', 'diplomacia']
  },
  {
    id: 4,
    title: 'Sesión en vivo: Debate sobre reforma pensional en el Congreso',
    description: 'Transmisión en directo del debate parlamentario sobre la reforma al sistema pensional',
    category: 'congreso',
    duration: '45:30',
    views: 123400,
    likes: 5670,
    thumbnail: '🏛️',
    author: 'Canal Congreso',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    isLive: true,
    tags: ['pensiones', 'reforma', 'debate']
  },
  {
    id: 5,
    title: 'Revolución 5G: Colombia se conecta al futuro digital',
    description: 'Cómo la tecnología 5G transformará la conectividad y la economía digital en Colombia',
    category: 'tecnologia',
    duration: '5:15',
    views: 34500,
    likes: 1890,
    thumbnail: '💻',
    author: 'MinTIC',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['5G', 'tecnología', 'innovación']
  },
  {
    id: 6,
    title: 'Operación Libertad: Desmantelamiento de célula terrorista del ELN',
    description: 'Reporte exclusivo sobre la operación militar que capturó a 12 terroristas en Arauca',
    category: 'terror',
    duration: '7:30',
    views: 67800,
    likes: 4230,
    thumbnail: '⚔️',
    author: 'Noticias RCN',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['operativo', 'ELN', 'captura']
  },
  {
    id: 7,
    title: 'El poder de la participación ciudadana en tu municipio',
    description: 'Conoce cómo puedes influir en las decisiones locales de tu comunidad',
    category: 'participacion',
    duration: '3:15',
    views: 23100,
    likes: 1547,
    thumbnail: '🤝',
    author: 'Fundación Corona',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['participación', 'comunidad', 'gobierno local']
  },
  {
    id: 8,
    title: 'Trump y la inmigración: Propuestas que afectarían a colombianos',
    description: 'Análisis de las políticas migratorias propuestas por Trump y su impacto en la comunidad colombiana',
    category: 'trump',
    duration: '8:45',
    views: 98700,
    likes: 5670,
    thumbnail: '🛂',
    author: 'Univisión',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['inmigración', 'TPS', 'deportación']
  },
  {
    id: 9,
    title: 'Alerta máxima: Amenaza terrorista en el TransMilenio',
    description: 'Detalles del operativo que frustró un atentado terrorista en Bogotá',
    category: 'terror',
    duration: '5:50',
    views: 156000,
    likes: 8900,
    thumbnail: '💥',
    author: 'City TV',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['atentado', 'transporte', 'seguridad']
  },
  {
    id: 10,
    title: 'Congreso aprueba ley de inteligencia artificial',
    description: 'Cobertura completa de la votación histórica sobre regulación de IA en el sector público',
    category: 'congreso',
    duration: '6:30',
    views: 45600,
    likes: 2890,
    thumbnail: '🤖',
    author: 'El Tiempo',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['IA', 'regulación', 'tecnología']
  }
];

// Generate additional reels programmatically to reach 50+ reels
export const generateAdditionalReels = (): PulseReel[] => {
  const additionalReels: PulseReel[] = [];
  const baseCategories = ['terror', 'trump', 'congreso', 'tecnologia', 'politica', 'educacion', 'ambiente', 'participacion'];
  
  for (let i = 11; i <= 60; i++) {
    const category = baseCategories[i % baseCategories.length];
    const isLive = i % 12 === 0; // Make every 12th reel "live"
    
    additionalReels.push({
      id: i,
      title: generateReelTitle(category, i, isLive),
      description: generateReelDescription(category, i),
      category,
      duration: generateReelDuration(isLive),
      views: Math.floor(Math.random() * 200000) + 5000,
      likes: Math.floor(Math.random() * 10000) + 100,
      thumbnail: generateReelThumbnail(category),
      author: generateReelAuthor(category),
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      isLive,
      tags: generateReelTags(category)
    });
  }
  
  return additionalReels;
};

function generateReelTitle(category: string, id: number, isLive: boolean): string {
  const livePrefix = isLive ? "🔴 EN VIVO: " : "";
  
  const titles = {
    terror: [
      "Operativo antiterrorista en el Pacífico colombiano",
      "Desmantelada red terrorista que operaba desde Venezuela",
      "Amenazas terroristas en temporada navideña: Medidas preventivas",
      "Fuerzas Especiales neutralizan célula del ELN en Chocó",
      "Capturados terroristas con explosivos en zona fronteriza"
    ],
    trump: [
      "Trump critica acuerdos comerciales con Colombia",
      "Nuevas propuestas migratorias afectarían a latinos",
      "Trump promete endurecer políticas antidrogas",
      "Impacto de las políticas de Trump en Latinoamérica",
      "Comunidad colombiana reacciona a propuestas de Trump"
    ],
    congreso: [
      "Debate sobre presupuesto nacional 2025",
      "Senadores aprueban reforma a la salud",
      "Discusión sobre militarización de territorios",
      "Votación histórica sobre paz total",
      "Congresistas analizan crisis migratoria venezolana"
    ],
    tecnologia: [
      "Lanzamiento del primer satélite colombiano",
      "Inteligencia artificial en hospitales públicos",
      "Ciberseguridad: Protegiendo la infraestructura crítica",
      "Blockchain en elecciones: Mayor transparencia",
      "Colombia lidera innovación en América Latina"
    ],
    politica: [
      "Alcaldes se reúnen por seguridad ciudadana",
      "Pacto anticorrupción entre partidos políticos",
      "Gobierno presenta plan estratégico nacional",
      "Oposición denuncia irregularidades fiscales",
      "Mesa de diálogo sobre reforma constitucional"
    ],
    educacion: [
      "Reforma educativa: Nuevos enfoques pedagógicos",
      "Tecnología en el aula: Experiencias exitosas",
      "Programa de becas beneficia a estudiantes rurales",
      "Universidades públicas en crisis presupuestal",
      "Educación digital: Cerrando brechas sociales"
    ],
    ambiente: [
      "Reforestación masiva en la Amazonía colombiana",
      "Energías renovables: El futuro de Colombia",
      "Protección de páramos y fuentes hídricas",
      "Cambio climático: Adaptación en ciudades",
      "Reciclaje: Iniciativas comunitarias exitosas"
    ],
    participacion: [
      "Presupuestos participativos en municipios",
      "Control ciudadano a la gestión pública",
      "Veedurías ciudadanas: Casos de éxito",
      "Participación juvenil en política local",
      "Mecanismos de participación ciudadana"
    ]
  };
  
  const categoryTitles = titles[category as keyof typeof titles] || titles.politica;
  const baseTitle = categoryTitles[id % categoryTitles.length];
  
  return `${livePrefix}${baseTitle} - Episodio ${id}`;
}

function generateReelDescription(category: string, id: number): string {
  const descriptions = {
    terror: "Cobertura exclusiva de operaciones antiterroristas y medidas de seguridad implementadas por las autoridades colombianas.",
    trump: "Análisis del impacto de las políticas y declaraciones del expresidente estadounidense en las relaciones Colombia-Estados Unidos.",
    congreso: "Seguimiento detallado de los debates parlamentarios y decisiones legislativas que afectan el futuro del país.",
    tecnologia: "Exploración de los avances tecnológicos y la transformación digital que está revolucionando Colombia.",
    politica: "Análisis político de los acontecimientos que marcan la agenda nacional y las decisiones gubernamentales.",
    educacion: "Reportajes sobre innovación educativa, políticas públicas y el futuro de la educación en Colombia.",
    ambiente: "Documentales sobre conservación ambiental, sostenibilidad y acciones contra el cambio climático.",
    participacion: "Historias de participación ciudadana, democracia local y empoderamiento comunitario."
  };
  
  return descriptions[category as keyof typeof descriptions] || descriptions.politica;
}

function generateReelDuration(isLive: boolean): string {
  if (isLive) {
    const hours = Math.floor(Math.random() * 3) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:00`;
  }
  
  const minutes = Math.floor(Math.random() * 15) + 2; // 2-17 minutes
  const seconds = Math.floor(Math.random() * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function generateReelThumbnail(category: string): string {
  const thumbnails = {
    terror: ['🚨', '⚔️', '💥', '🛡️', '🚁'],
    trump: ['🇺🇸', '🛂', '💼', '📢', '🗳️'],
    congreso: ['🏛️', '📊', '⚖️', '📋', '🤝'],
    tecnologia: ['💻', '🚀', '🔬', '📱', '🌐'],
    politica: ['🏛️', '📰', '🗳️', '🤝', '📊'],
    educacion: ['📚', '🎓', '💡', '🖥️', '📝'],
    ambiente: ['🌱', '🌍', '♻️', '🌳', '💧'],
    participacion: ['🤝', '👥', '🗣️', '💬', '✊']
  };
  
  const categoryThumbnails = thumbnails[category as keyof typeof thumbnails] || thumbnails.politica;
  return categoryThumbnails[Math.floor(Math.random() * categoryThumbnails.length)];
}

function generateReelAuthor(category: string): string {
  const authors = {
    terror: ['Caracol Noticias', 'RCN Televisión', 'Noticias Uno', 'City TV', 'Canal Capital'],
    trump: ['CNN en Español', 'BBC Mundo', 'Univisión', 'Telemundo', 'NTN24'],
    congreso: ['Canal Congreso', 'El Tiempo', 'El Espectador', 'Semana', 'La Silla Vacía'],
    tecnologia: ['MinTIC', 'TechColombia', 'Revista Sistemas', 'Portafolio', 'Dinero'],
    politica: ['El Colombiano', 'La República', 'El Heraldo', 'Vanguardia', 'El Universal'],
    educacion: ['MinEducación', 'Universidad Nacional', 'ICFES', 'SENA', 'Maloka'],
    ambiente: ['MinAmbiente', 'WWF Colombia', 'Fundación ProAves', 'SINCHI', 'IDEAM'],
    participacion: ['Transparencia Colombia', 'Fundación Corona', 'Veeduría Distrital', 'PNUD', 'USAID']
  };
  
  const categoryAuthors = authors[category as keyof typeof authors] || authors.politica;
  return categoryAuthors[Math.floor(Math.random() * categoryAuthors.length)];
}

function generateReelTags(category: string): string[] {
  const tags = {
    terror: ['seguridad', 'terrorismo', 'operativo', 'fuerzas militares', 'frontera'],
    trump: ['Estados Unidos', 'política exterior', 'comercio', 'inmigración', 'diplomacia'],
    congreso: ['legislación', 'debate', 'votación', 'reforma', 'política'],
    tecnologia: ['innovación', 'digital', 'IA', '5G', 'transformación'],
    politica: ['gobierno', 'democracia', 'elecciones', 'partidos', 'ciudadanía'],
    educacion: ['aprendizaje', 'estudiantes', 'profesores', 'innovación educativa', 'becas'],
    ambiente: ['sostenibilidad', 'conservación', 'biodiversidad', 'cambio climático', 'ecología'],
    participacion: ['ciudadanía', 'democracia', 'veedurías', 'control social', 'participación']
  };
  
  const categoryTags = tags[category as keyof typeof tags] || tags.politica;
  return categoryTags.slice(0, 3); // Return first 3 tags
}

// Combine all reels
export const allPulseReels = [...pulseReels, ...generateAdditionalReels()];