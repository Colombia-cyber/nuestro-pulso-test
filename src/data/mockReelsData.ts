import { ReelItem } from '../types/news';

export const mockReelsData: Record<string, ReelItem[]> = {
  todos: [],
  politica: [
    {
      id: 1,
      title: 'Cómo participar en el proceso electoral colombiano',
      description: 'Guía rápida sobre tu derecho al voto y los requisitos para participar en las próximas elecciones regionales',
      category: 'politica',
      duration: '2:30',
      views: 15420,
      likes: 892,
      thumbnail: '🗳️',
      author: 'Registraduría Nacional'
    },
    {
      id: 2,
      title: 'Control ciudadano a la corrupción',
      description: 'Herramientas y mecanismos legales para denunciar actos de corrupción en instituciones públicas',
      category: 'politica',
      duration: '4:00',
      views: 19800,
      likes: 1342,
      thumbnail: '⚖️',
      author: 'Veeduría Ciudadana'
    },
    {
      id: 3,
      title: 'Reforma política: Lo que debes saber',
      description: 'Análisis completo de los cambios propuestos al sistema electoral y financiamiento de campañas',
      category: 'politica',
      duration: '6:15',
      views: 28500,
      likes: 1876,
      thumbnail: '🏛️',
      author: 'Congreso Visible'
    },
    {
      id: 4,
      title: 'Presupuestos participativos: Tu voz en las finanzas públicas',
      description: 'Aprende cómo los ciudadanos pueden decidir en qué se invierte el presupuesto municipal',
      category: 'politica',
      duration: '4:20',
      views: 8950,
      likes: 673,
      thumbnail: '💰',
      author: 'Transparencia Colombia'
    }
  ],
  educacion: [
    {
      id: 5,
      title: 'Educación digital: Cerrando la brecha tecnológica',
      description: 'Programas gubernamentales para mejorar el acceso a la educación digital en zonas rurales',
      category: 'educacion',
      duration: '3:45',
      views: 12340,
      likes: 789,
      thumbnail: '💻',
      author: 'MinEducación'
    },
    {
      id: 6,
      title: 'Universidad gratuita: Cómo acceder a las becas 2024',
      description: 'Paso a paso para aplicar al programa de educación superior gratuita para estratos 1 y 2',
      category: 'educacion',
      duration: '5:30',
      views: 45600,
      likes: 3200,
      thumbnail: '🎓',
      author: 'ICETEX'
    },
    {
      id: 7,
      title: 'Reforma educativa: Impacto en colegios públicos',
      description: 'Análisis de los cambios en currículum, infraestructura y capacitación docente',
      category: 'educacion',
      duration: '7:20',
      views: 22100,
      likes: 1567,
      thumbnail: '📚',
      author: 'FECODE'
    }
  ],
  ambiente: [
    {
      id: 8,
      title: 'Cambio climático y acción ciudadana en Colombia',
      description: 'Iniciativas locales que están marcando la diferencia ambiental en diferentes regiones',
      category: 'ambiente',
      duration: '5:10',
      views: 31200,
      likes: 2156,
      thumbnail: '🌍',
      author: 'WWF Colombia'
    },
    {
      id: 9,
      title: 'Deforestación en la Amazonía: Retos y soluciones',
      description: 'Estrategias para combatir la tala ilegal y promover el desarrollo sostenible',
      category: 'ambiente',
      duration: '8:45',
      views: 67800,
      likes: 4321,
      thumbnail: '🌳',
      author: 'SINCHI'
    },
    {
      id: 10,
      title: 'Energías renovables: El futuro de Colombia',
      description: 'Proyectos solares y eólicos que transformarán la matriz energética nacional',
      category: 'ambiente',
      duration: '6:30',
      views: 18900,
      likes: 1234,
      thumbnail: '⚡',
      author: 'MinMinas'
    }
  ],
  participacion: [
    {
      id: 11,
      title: 'El poder de la participación ciudadana en tu municipio',
      description: 'Conoce cómo puedes influir en las decisiones locales de tu comunidad',
      category: 'participacion',
      duration: '3:15',
      views: 23100,
      likes: 1547,
      thumbnail: '🤝',
      author: 'Fundación Corona'
    },
    {
      id: 12,
      title: 'Veedurías ciudadanas: Vigilando el gasto público',
      description: 'Herramientas para crear y liderar veedurías efectivas en tu territorio',
      category: 'participacion',
      duration: '4:50',
      views: 14700,
      likes: 987,
      thumbnail: '👁️',
      author: 'Participación Ciudadana'
    },
    {
      id: 13,
      title: 'Juntas de Acción Comunal: Liderazgo local',
      description: 'Fortalecimiento del tejido social a través de organizaciones comunitarias',
      category: 'participacion',
      duration: '5:25',
      views: 11200,
      likes: 756,
      thumbnail: '🏘️',
      author: 'DIGEP'
    }
  ],
  trump: [
    {
      id: 14,
      title: 'Trump: Impacto en las relaciones Colombia-Estados Unidos',
      description: 'Análisis sobre las políticas comerciales de Trump y su efecto en la economía colombiana',
      category: 'trump',
      duration: '6:30',
      views: 45200,
      likes: 2890,
      thumbnail: '🇺🇸',
      author: 'CNN Colombia'
    },
    {
      id: 15,
      title: 'Aranceles de Trump: ¿Cómo afectarían al café colombiano?',
      description: 'Expertos analizan el impacto de las propuestas proteccionistas en exportaciones',
      category: 'trump',
      duration: '4:45',
      views: 38600,
      likes: 2134,
      thumbnail: '☕',
      author: 'FNC'
    },
    {
      id: 16,
      title: 'Plan Colombia bajo una segunda presidencia Trump',
      description: 'Futuro de la cooperación bilateral en seguridad y lucha antinarcóticos',
      category: 'trump',
      duration: '8:15',
      views: 52300,
      likes: 3456,
      thumbnail: '🤝',
      author: 'Americas Quarterly'
    }
  ],
  congreso: [
    {
      id: 17,
      title: 'Sesión extraordinaria del Congreso sobre reforma tributaria',
      description: 'Cobertura en vivo del debate parlamentario más importante del año',
      category: 'congreso',
      duration: '12:45',
      views: 78900,
      likes: 4560,
      thumbnail: '🏛️',
      author: 'Canal Congreso'
    },
    {
      id: 18,
      title: 'Cómo funciona el proceso legislativo en Colombia',
      description: 'Guía educativa sobre cómo se aprueban las leyes en el Congreso',
      category: 'congreso',
      duration: '7:30',
      views: 25400,
      likes: 1678,
      thumbnail: '📜',
      author: 'Congreso Visible'
    },
    {
      id: 19,
      title: 'Debate sobre inteligencia artificial en el sector público',
      description: 'Senadores y representantes discuten regulación de IA gubernamental',
      category: 'congreso',
      duration: '9:20',
      views: 34500,
      likes: 2234,
      thumbnail: '🤖',
      author: 'Senado República'
    }
  ],
  terror: [
    {
      id: 20,
      title: 'Alerta de seguridad: Amenazas terroristas en fronteras',
      description: 'Informe especial sobre medidas de seguridad en zonas fronterizas con Venezuela',
      category: 'terror',
      duration: '8:20',
      views: 23400,
      likes: 1890,
      thumbnail: '🚨',
      author: 'Caracol Noticias'
    },
    {
      id: 21,
      title: 'Operación militar contra grupos armados ilegales',
      description: 'Cobertura de operativos en Putumayo y Caquetá contra disidencias',
      category: 'terror',
      duration: '6:50',
      views: 41200,
      likes: 2567,
      thumbnail: '⚔️',
      author: 'Ministerio Defensa'
    },
    {
      id: 22,
      title: 'Protección de líderes sociales: Nuevos protocolos',
      description: 'Medidas implementadas para salvaguardar defensores de derechos humanos',
      category: 'terror',
      duration: '5:40',
      views: 18700,
      likes: 1234,
      thumbnail: '🛡️',
      author: 'UNP'
    }
  ],
  tecnologia: [
    {
      id: 23,
      title: 'Revolución digital: Colombia 5G para todos',
      description: 'Cómo la tecnología 5G transformará la conectividad en zonas rurales',
      category: 'tecnologia',
      duration: '4:15',
      views: 34500,
      likes: 2340,
      thumbnail: '💻',
      author: 'TechColombia'
    },
    {
      id: 24,
      title: 'Gobierno Digital: Trámites en línea para todos',
      description: 'Digitalización de servicios públicos y reducción de burocracia',
      category: 'tecnologia',
      duration: '5:55',
      views: 27800,
      likes: 1876,
      thumbnail: '📱',
      author: 'MinTIC'
    },
    {
      id: 25,
      title: 'Ciberseguridad nacional: Protegiendo datos críticos',
      description: 'Estrategias para defenderse de ataques cibernéticos y proteger información',
      category: 'tecnologia',
      duration: '7:10',
      views: 19600,
      likes: 1345,
      thumbnail: '🔐',
      author: 'CSIRT Colombia'
    }
  ]
};

// Populate the 'todos' category with all reels
mockReelsData.todos = Object.values(mockReelsData)
  .flat()
  .filter(reel => reel.category !== 'todos');

export const getReelsByCategory = (category: string): ReelItem[] => {
  return mockReelsData[category] || [];
};

export const getAllReels = (): ReelItem[] => {
  return mockReelsData.todos;
};

export const getTrendingReels = (limit: number = 6): ReelItem[] => {
  return getAllReels()
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};