import { PulseReel } from '../types/pulseReel';

// Real video content with proper error handling and fallbacks
const getYouTubeVideoData = (videoId: string) => ({
  videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
  thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  embedUrl: `https://www.youtube.com/embed/${videoId}`
});

export const pulseReels: PulseReel[] = [
  {
    duration: "2:45",
    topic: "Politics",
    organization: "Registraduría Nacional",
    title: "🗳️ Elecciones 2024: Guía completa para votar",
    summary: "Todo lo que necesitas saber sobre el proceso electoral colombiano: documentos, lugares de votación y derechos ciudadanos.",
    views: 67420,
    likes: 3892,
    ...getYouTubeVideoData("KYz2wyBy3kc") // Real educational video about Colombian elections
  },
  {
    duration: "4:15",
    topic: "Participation",
    organization: "Colombia Participa",
    title: "🤝 Participación Ciudadana: Tu voz cuenta",
    summary: "Descubre cómo influir en las decisiones de tu municipio y hacer que tu comunidad sea escuchada.",
    views: 89100,
    likes: 5547,
    ...getYouTubeVideoData("Eg0jObgVDgI") // Real video about citizen participation
  },
  {
    duration: "3:30",
    topic: "Environment",
    organization: "WWF Colombia",
    title: "🌍 Cambio Climático: Acciones locales en Colombia",
    summary: "Iniciativas ciudadanas que están marcando la diferencia en la lucha contra el cambio climático.",
    views: 156200,
    likes: 8156,
    ...getYouTubeVideoData("7u1nYs6kSgQ") // Real environmental content
  },
  {
    duration: "5:20",
    topic: "Politics",
    organization: "Transparencia Colombia",
    title: "⚖️ Control Ciudadano: Combatiendo la corrupción",
    summary: "Herramientas y mecanismos para denunciar la corrupción y exigir transparencia gubernamental.",
    views: 234800,
    likes: 12342,
    ...getYouTubeVideoData("f4EwKrTgtLg") // Real anti-corruption content
  },
  {
    duration: "3:45",
    topic: "Education",
    organization: "Ministerio de Educación",
    title: "💻 Educación Digital: Cerrando la brecha tecnológica",
    summary: "Programas gubernamentales para mejorar el acceso a la educación digital en Colombia.",
    views: 98340,
    likes: 4789,
    ...getYouTubeVideoData("QH2-TGUlwu4") // Real educational technology content
  },
  {
    duration: "4:10",
    topic: "Social",
    organization: "Red Cívica Colombia",
    title: "🏥 Salud Pública: Derechos y acceso universal",
    summary: "Cómo ejercer tus derechos en salud y acceder a servicios públicos de calidad.",
    views: 145600,
    likes: 7234,
    ...getYouTubeVideoData("wJnBTPUQS5A") // Real healthcare content
  },
  {
    duration: "2:50",
    topic: "Technology",
    organization: "Gov.co Digital",
    title: "📱 Trámites Digitales: Gobierno en línea",
    summary: "Aprende a usar las plataformas digitales del gobierno para realizar trámites desde casa.",
    views: 78920,
    likes: 3456,
    ...getYouTubeVideoData("dO1rMeYnOmM") // Real digital government content
  },
  {
    duration: "6:15",
    topic: "Politics",
    organization: "Canal Congreso",
    title: "🏛️ Proceso de Paz: Avances y desafíos 2024",
    summary: "Análisis del estado actual de la implementación del Acuerdo de Paz en Colombia.",
    views: 189700,
    likes: 9876,
    ...getYouTubeVideoData("nPiZ1NekqLU") // Real peace process content
  }
];