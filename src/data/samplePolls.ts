import { Poll } from '../types/polls';

export const samplePolls: Poll[] = [
  {
    id: 'poll-1',
    title: 'Prioridades de Seguridad Nacional 2024',
    description: 'Ayuda a definir qué aspectos de seguridad requieren mayor atención del gobierno nacional',
    question: '¿Cuál debe ser la principal prioridad en seguridad para Colombia en 2024?',
    options: [
      { id: 'opt-1', text: 'Combate al narcotráfico', votes: 15420 },
      { id: 'opt-2', text: 'Seguridad ciudadana urbana', votes: 12850 },
      { id: 'opt-3', text: 'Protección de líderes sociales', votes: 8930 },
      { id: 'opt-4', text: 'Seguridad en carreteras', votes: 6720 },
      { id: 'opt-5', text: 'Ciberseguridad nacional', votes: 4890 }
    ],
    totalVotes: 48810,
    category: 'seguridad',
    tags: ['narcotráfico', 'seguridad', 'política pública'],
    createdAt: new Date('2024-01-15'),
    endsAt: new Date('2024-02-15'),
    isActive: true,
    isTrending: true,
    createdBy: {
      id: 'user-1',
      name: 'Ministerio del Interior',
      avatar: '/avatars/gobierno.png'
    },
    allowMultiple: false,
    isAnonymous: true,
    region: 'nacional'
  },
  {
    id: 'poll-2',
    title: 'Reforma Educativa - Opinión Ciudadana',
    description: 'Tu voz es importante para moldear el futuro de la educación en Colombia',
    question: '¿Qué aspecto de la educación necesita reforma urgente?',
    options: [
      { id: 'opt-6', text: 'Calidad de la educación pública', votes: 22340 },
      { id: 'opt-7', text: 'Acceso a educación superior', votes: 18670 },
      { id: 'opt-8', text: 'Infraestructura escolar', votes: 16220 },
      { id: 'opt-9', text: 'Capacitación docente', votes: 14580 },
      { id: 'opt-10', text: 'Tecnología en aulas', votes: 9890 }
    ],
    totalVotes: 81700,
    category: 'educacion',
    tags: ['educación', 'reforma', 'calidad educativa'],
    createdAt: new Date('2024-01-10'),
    endsAt: new Date('2024-02-10'),
    isActive: true,
    isTrending: true,
    createdBy: {
      id: 'user-2',
      name: 'Fundación Educación Para Todos',
      avatar: '/avatars/educacion.png'
    },
    allowMultiple: false,
    isAnonymous: true,
    region: 'nacional'
  },
  {
    id: 'poll-3',
    title: 'Transporte Público en Bogotá',
    description: 'Evalúa las mejoras necesarias para el sistema de transporte de la capital',
    question: '¿Cuál es tu experiencia con el transporte público en Bogotá?',
    options: [
      { id: 'opt-11', text: 'Muy deficiente - necesita cambios urgentes', votes: 8920 },
      { id: 'opt-12', text: 'Regular - algunas mejoras necesarias', votes: 12650 },
      { id: 'opt-13', text: 'Bueno - satisfecho en general', votes: 5430 },
      { id: 'opt-14', text: 'Excelente - sin quejas', votes: 1240 }
    ],
    totalVotes: 28240,
    category: 'social',
    tags: ['transporte', 'bogotá', 'transmilenio'],
    createdAt: new Date('2024-01-20'),
    endsAt: new Date('2024-02-05'),
    isActive: true,
    isTrending: false,
    createdBy: {
      id: 'user-3',
      name: 'Observatorio de Movilidad',
      avatar: '/avatars/transporte.png'
    },
    allowMultiple: false,
    isAnonymous: true,
    region: 'bogota'
  },
  {
    id: 'poll-4',
    title: 'Economía Post-Pandemia',
    description: 'Estrategias para la recuperación económica nacional',
    question: '¿Qué sector económico debería recibir mayor apoyo gubernamental?',
    options: [
      { id: 'opt-15', text: 'Pequeñas y medianas empresas (PYMES)', votes: 19850 },
      { id: 'opt-16', text: 'Sector agrícola', votes: 16420 },
      { id: 'opt-17', text: 'Turismo', votes: 12890 },
      { id: 'opt-18', text: 'Tecnología e innovación', votes: 11360 },
      { id: 'opt-19', text: 'Manufactura', votes: 8940 }
    ],
    totalVotes: 69460,
    category: 'economia',
    tags: ['economía', 'covid-19', 'recuperación'],
    createdAt: new Date('2024-01-08'),
    endsAt: new Date('2024-02-20'),
    isActive: true,
    isTrending: true,
    createdBy: {
      id: 'user-4',
      name: 'Cámara de Comercio Nacional',
      avatar: '/avatars/economia.png'
    },
    allowMultiple: false,
    isAnonymous: true,
    region: 'nacional'
  },
  {
    id: 'poll-5',
    title: 'Salud Mental y Bienestar',
    description: 'Identificando necesidades en salud mental para políticas públicas',
    question: '¿Qué servicio de salud mental es más urgente en tu comunidad?',
    options: [
      { id: 'opt-20', text: 'Consulta psicológica accesible', votes: 14670 },
      { id: 'opt-21', text: 'Programas de prevención suicidio', votes: 11230 },
      { id: 'opt-22', text: 'Atención a víctimas de violencia', votes: 9850 },
      { id: 'opt-23', text: 'Rehabilitación por adicciones', votes: 8940 },
      { id: 'opt-24', text: 'Apoyo a adultos mayores', votes: 7320 }
    ],
    totalVotes: 52010,
    category: 'salud',
    tags: ['salud mental', 'bienestar', 'políticas públicas'],
    createdAt: new Date('2024-01-12'),
    endsAt: new Date('2024-02-25'),
    isActive: true,
    isTrending: false,
    createdBy: {
      id: 'user-5',
      name: 'Asociación de Psicólogos de Colombia',
      avatar: '/avatars/salud.png'
    },
    allowMultiple: true,
    isAnonymous: true,
    region: 'nacional'
  },
  {
    id: 'poll-6',
    title: 'Participación Política Juvenil',
    description: 'Cómo incrementar la participación de jóvenes en política',
    question: '¿Qué motiva más a los jóvenes a participar en política?',
    options: [
      { id: 'opt-25', text: 'Candidatos jóvenes y diversos', votes: 8920 },
      { id: 'opt-26', text: 'Plataformas digitales de participación', votes: 7650 },
      { id: 'opt-27', text: 'Temas ambientales y sostenibilidad', votes: 6840 },
      { id: 'opt-28', text: 'Transparencia y rendición de cuentas', votes: 5930 },
      { id: 'opt-29', text: 'Oportunidades de empleo juvenil', votes: 4560 }
    ],
    totalVotes: 33900,
    category: 'politica',
    tags: ['juventud', 'participación', 'democracia'],
    createdAt: new Date('2024-01-18'),
    endsAt: new Date('2024-02-12'),
    isActive: true,
    isTrending: true,
    createdBy: {
      id: 'user-6',
      name: 'Consejo Nacional de Juventud',
      avatar: '/avatars/juventud.png'
    },
    allowMultiple: false,
    isAnonymous: false,
    region: 'nacional'
  }
];

export const getTrendingPolls = (): Poll[] => {
  return samplePolls.filter(poll => poll.isTrending && poll.isActive);
};

export const getActivePolls = (): Poll[] => {
  return samplePolls.filter(poll => poll.isActive);
};

export const getPollsByCategory = (category: Poll['category']): Poll[] => {
  return samplePolls.filter(poll => poll.category === category);
};

export const getFeaturedPoll = (): Poll => {
  return samplePolls[0]; // Return the first poll as featured
};