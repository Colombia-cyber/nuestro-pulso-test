// Comprehensive news data for the application
export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  fullContent: string;
  category: string;
  source: string;
  time: string;
  image: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  readTime: string;
  political_lean: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Nuevo programa de becas beneficiará a 50,000 estudiantes colombianos',
    summary: 'El gobierno nacional anunció un programa de becas que cubrirá matrículas universitarias para estudiantes de bajos recursos.',
    fullContent: `El Ministerio de Educación Nacional anunció oficialmente el lanzamiento del programa "Becas Colombia 2024", una iniciativa ambiciosa que beneficiará a 50,000 estudiantes de bajos recursos económicos en todo el territorio nacional.

La ministra de Educación, María Fernanda Campo, explicó durante la rueda de prensa que este programa representa una inversión de 500 mil millones de pesos que se ejecutará durante los próximos cuatro años. "Este es un paso histórico hacia la democratización de la educación superior en Colombia", afirmó la funcionaria.

El programa cubrirá el 100% de la matrícula universitaria para estudiantes cuyos hogares se encuentren en los estratos 1, 2 y 3, y que demuestren excelencia académica mediante un promedio mínimo de 4.0 en bachillerato.

Además de la cobertura de matrícula, las becas incluyen un auxilio alimentario mensual de $400,000 pesos y apoyo para transporte universitario. Los estudiantes beneficiarios también tendrán acceso a programas de mentoría y desarrollo profesional.

Las inscripciones para el programa comenzarán el próximo mes a través de la plataforma digital del Icetex, y los primeros beneficiarios podrán comenzar sus estudios en el semestre académico de 2025.`,
    category: 'educacion',
    source: 'Ministerio de Educación',
    time: '2 horas',
    image: '📚',
    engagement: { likes: 245, shares: 89, comments: 34 },
    readTime: '4 min',
    political_lean: 'independiente'
  },
  {
    id: 2,
    title: 'Alerta terrorista en Norte de Santander: Evacuación preventiva de tres municipios',
    summary: 'Autoridades militares confirman incremento en actividad de grupos armados ilegales cerca de la frontera con Venezuela.',
    fullContent: `El Alto Mando Militar de Colombia confirmó la evacuación preventiva de tres municipios en Norte de Santander tras detectar un incremento significativo en amenazas terroristas provenientes de grupos armados ilegales que operan desde territorio venezolano.

El general Carlos Alberto Patiño, comandante de las Fuerzas Militares, informó que se han identificado al menos 15 atentados contra infraestructura petrolera en los últimos dos meses, además de múltiples intentos de secuestro y extorsión contra la población civil.

"La situación de seguridad en la zona fronteriza se ha deteriorado considerablemente. Tenemos evidencia de que grupos residuales de las FARC y bandas criminales han intensificado sus operaciones terroristas", declaró Patiño durante una conferencia de prensa.

La evacuación preventiva afecta a aproximadamente 12,000 personas de los municipios de Teorama, Convención y El Carmen. Las autoridades han establecido albergues temporales en Cúcuta y Ocaña para atender a las familias desplazadas.

El gobierno ha desplegado 2,500 soldados adicionales en la región y ha activado protocolos de seguridad máxima en coordinación con la Policía Nacional y organismos de inteligencia.

Las autoridades venezolanas han sido notificadas oficialmente sobre estas actividades terroristas, aunque hasta el momento no han respondido a las solicitudes de cooperación binacional para combatir estos grupos.`,
    category: 'terror',
    source: 'Caracol Noticias',
    time: '1 hora',
    image: '🚨',
    engagement: { likes: 156, shares: 298, comments: 189 },
    readTime: '6 min',
    political_lean: 'independiente'
  },
  {
    id: 3,
    title: 'Trump anuncia aranceles del 30% a productos colombianos si es reelegido',
    summary: 'El expresidente estadounidense propone nuevas medidas comerciales que afectarían significativamente las exportaciones de café, flores y banano.',
    fullContent: `Durante un rally en Miami, el expresidente Donald Trump anunció su intención de implementar aranceles del 30% a productos agrícolas colombianos si regresa a la Casa Blanca en 2025, afectando principalmente las exportaciones de café, flores y banano.

La propuesta forma parte de su plataforma de "America First 2.0" y busca, según Trump, "proteger a los trabajadores estadounidenses de la competencia desleal y presionar a países que no cooperan adecuadamente en la lucha contra el narcotráfico".

"Colombia necesita hacer más para detener el flujo de cocaína hacia Estados Unidos. Mientras no vean resultados concretos, sus productos pagarán un precio", declaró Trump ante miles de seguidores en el Hard Rock Stadium.

Los aranceles propuestos tendrían un impacto devastador en la economía colombiana. Estados Unidos importa el 65% del café colombiano, el 80% de las flores y el 45% del banano producido en el país. Analistas económicos estiman pérdidas por $4.2 mil millones anuales.

El embajador de Colombia en Washington, Francisco Santos, emitió una declaración expresando "profunda preocupación" por estas propuestas y recordando que Colombia es el principal aliado de Estados Unidos en la lucha antidrogas en América Latina.

La Asociación Nacional de Exportadores (ANALDEX) convocó a una reunión de emergencia para evaluar estrategias de diversificación comercial y buscar nuevos mercados en Asia y Europa.`,
    category: 'trump',
    source: 'Reuters Colombia',
    time: '3 horas',
    image: '🇺🇸',
    engagement: { likes: 423, shares: 567, comments: 298 },
    readTime: '7 min',
    political_lean: 'independiente'
  },
  {
    id: 4,
    title: 'Congreso aprueba en primer debate la reforma al sistema pensional',
    summary: 'El Senado avanzó en la discusión de la propuesta que busca garantizar pensiones dignas para trabajadores informales.',
    fullContent: `El Senado de la República aprobó en primer debate, con 52 votos a favor y 28 en contra, el proyecto de reforma al sistema pensional que busca garantizar una vejez digna para todos los colombianos, especialmente para quienes han trabajado en la informalidad.

La senadora ponente, Isabel Zuleta del Pacto Histórico, explicó que el nuevo sistema establecería una pensión básica universal de $500,000 pesos mensuales para todos los adultos mayores de 65 años que no tengan acceso a otros mecanismos pensionales.

"No podemos permitir que millones de colombianos que han trabajado toda su vida terminen en la indigencia por no haber podido cotizar formalmente al sistema pensional", declaró Zuleta durante su intervención.

La propuesta incluye la creación de un fondo solidario financiado con aportes del Estado (40%), empleadores (35%) y trabajadores (25%), que garantizaría sostenibilidad financiera a largo plazo según estudios actuariales presentados.

El nuevo sistema mantendría Colpensiones como administrador principal, pero eliminaría gradualmente los fondos privados de pensiones, trasladando esos recursos al sistema público en un periodo de transición de 10 años.

La oposición, liderada por el Centro Democrático, criticó el proyecto por considerar que "destruye el ahorro pensional de los colombianos" y anunció que presentará una demanda ante la Corte Constitucional si es aprobado.

El proyecto ahora pasa a segundo debate en el Senado y posteriormente a la Cámara de Representantes para continuar su trámite legislativo.`,
    category: 'congreso',
    source: 'El Tiempo',
    time: '2 horas',
    image: '🏛️',
    engagement: { likes: 298, shares: 189, comments: 145 },
    readTime: '6 min',
    political_lean: 'izquierda'
  },
  {
    id: 5,
    title: 'Operativo antiterrorista desbarata célula del ELN en Arauca',
    summary: 'Fuerzas Militares capturan a 12 miembros de grupo terrorista que planeaba atentar contra oleoducto Caño Limón-Coveñas.',
    fullContent: `Las Fuerzas Militares de Colombia ejecutaron exitosamente el operativo "Libertad 2024" que resultó en la captura de 12 miembros de una célula terrorista del ELN que planeaba atentar contra el oleoducto Caño Limón-Coveñas en el departamento de Arauca.

El general Eduardo Zapateiro, comandante del Ejército Nacional, informó que la operación se desarrolló durante las primeras horas de la madrugada en zona rural de Arauquita, con apoio de inteligencia proporcionada por comunidades locales.

"Esta célula terrorista tenía como objetivo principal atentar contra la infraestructura petrolera del país, lo que habría causado un daño ambiental incalculable y afectado gravemente el suministro energético nacional", explicó Zapateiro.

Durante el operativo se incautaron 200 kilos de explosivos, 15 fusiles de asalto, 5,000 cartuchos de munición, equipos de comunicación y material de propaganda subversiva. También se decomisaron $500 millones en efectivo provenientes de extorsiones.

Los capturados incluyen al cabecilla alias "El Tuso", quien tenía una recompensa de $300 millones ofrecida por el Ministerio de Defensa por su participación en múltiples actos terroristas en la región.

La operación contó con la participación de 500 efectivos de las Fuerzas Especiales del Ejército, la Policía Nacional y el CTI de la Fiscalía General de la Nación.

El presidente Gustavo Petro felicitó a las Fuerzas Militares por el operativo y reiteró su compromiso con la paz total, pero advirtió que "quienes persistan en el terrorismo enfrentarán todo el peso de la ley".`,
    category: 'terror',
    source: 'Semana',
    time: '4 horas',
    image: '⚔️',
    engagement: { likes: 378, shares: 234, comments: 156 },
    readTime: '5 min',
    political_lean: 'independiente'
  },
  {
    id: 6,
    title: 'Centro Democrático presenta agenda legislativa para fortalecer la seguridad nacional',
    summary: 'El partido de oposición propone endurecer penas por terrorismo y aumentar presupuesto militar en un 40%.',
    fullContent: `El Centro Democrático presentó oficialmente su agenda legislativa para 2024-2025, enfocada en el fortalecimiento de la seguridad nacional y la lucha contra el terrorismo, con propuestas que incluyen el endurecimiento de penas y el aumento significativo del presupuesto militar.

El expresidente Álvaro Uribe, acompañado por la bancada del partido, presentó un paquete de 15 proyectos de ley que buscan "devolver la autoridad del Estado y proteger a los colombianos del flagelo del terrorismo".

La propuesta central contempla aumentar el presupuesto de Defensa y Seguridad de $48 a $67 billones de pesos, incrementando el pie de fuerza en 50,000 efectivos adicionales entre Ejército, Armada, Fuerza Aérea y Policía Nacional.

"Colombia necesita un Estado fuerte que proteja a sus ciudadanos. No podemos seguir tolerando que grupos terroristas como el ELN y disidencias de las FARC mantengan en zozobra a nuestras comunidades", declaró Uribe.

Entre las medidas propuestas se incluye la creación de tribunales especializados en terrorismo, la cadena perpetua para cabecillas de grupos armados ilegales, y la extradición automática de extranjeros vinculados a actividades terroristas.

El proyecto también propone la creación de un sistema de recompensas de hasta $1,000 millones por información que conduzca a la captura de líderes terroristas, financiado con recursos del narcotráfico incautado.

El gobierno del presidente Petro criticó las propuestas calificándolas de "retroceso hacia políticas de guerra" y anunció que presentará observaciones técnicas y jurídicas a cada uno de los proyectos.

Los proyectos serán radicados formalmente en el Congreso la próxima semana y comenzarán su trámite en las comisiones primera de Senado y Cámara.`,
    category: 'derecha',
    source: 'RCN Radio',
    time: '1 hora',
    image: '🛡️',
    engagement: { likes: 445, shares: 298, comments: 189 },
    readTime: '7 min',
    political_lean: 'derecha'
  },
  {
    id: 7,
    title: 'Colombia lanza el mayor plan de conectividad digital de América Latina',
    summary: 'Gobierno invertirá $12 billones para llevar internet de alta velocidad al 95% del territorio nacional.',
    fullContent: `El Ministerio de Tecnologías de la Información y las Comunicaciones (MinTIC) lanzó oficialmente "Colombia Conectada 2030", el plan de conectividad digital más ambicioso de América Latina, con una inversión de $12 billones de pesos durante los próximos seis años.

La ministra Carmen Ligia Valderrama explicó que el plan tiene como meta conectar al 95% del territorio nacional con internet de alta velocidad, incluyendo las zonas más apartadas del país que históricamente han estado excluidas de la revolución digital.

"Vamos a cerrar definitivamente la brecha digital en Colombia. No puede ser que en pleno siglo XXI tengamos comunidades enteras sin acceso a internet", declaró Valderrama durante el lanzamiento del programa en el Centro de Innovación de Bogotá.

El plan incluye la construcción de 8,000 kilómetros de fibra óptica, la instalación de 15,000 antenas de telecomunicaciones, y la creación de 50,000 puntos de acceso Wi-Fi gratuito en zonas rurales y centros poblados.

Además, contempla la digitalización del 90% de los trámites gubernamentales, la creación de 500,000 empleos en el sector tecnológico, y la formación de 2 millones de ciudadanos en competencias digitales básicas.

El sector privado también participará activamente. Empresas como Claro, Movistar, Tigo, DirecTV y ETB han comprometido inversiones adicionales por $5 billones para acelerar el despliegue de redes 5G en las principales ciudades.

El plan incluye programas especiales para comunidades indígenas, afrodescendientes y campesinas, garantizando que la transformación digital sea inclusiva y respete la diversidad cultural del país.

Los primeros resultados se esperan en 2025 con el lanzamiento de "Gobierno Digital", una plataforma que centralizará todos los servicios estatales y permitirá realizar la mayoría de trámites desde dispositivos móviles.

La iniciativa cuenta con el respaldo del Banco Interamericano de Desarrollo (BID) y el Banco Mundial, que otorgaron créditos por $2 billones para financiar la primera fase.`,
    category: 'tecnologia',
    source: 'Portafolio',
    time: '5 horas',
    image: '💻',
    engagement: { likes: 567, shares: 378, comments: 234 },
    readTime: '8 min',
    political_lean: 'independiente'
  },
  {
    id: 8,
    title: 'Atentado terrorista frustrado en TransMilenio: Capturados dos explosivistas',
    summary: 'Autoridades desactivan bomba artesanal que habría causado una masacre en la estación Portal de las Americas.',
    fullContent: `La Policía Nacional frustró un atentado terrorista que habría causado una masacre en la estación Portal de las Americas del sistema TransMilenio, mediante la captura de dos explosivistas y la desactivación de un artefacto explosivo improvisado.

El general William Salamanca, director de la Policía Nacional, informó que el operativo se ejecutó gracias a información de inteligencia que alertó sobre un plan para atentar contra usuarios del transporte público durante las horas de mayor afluencia.

"Logramos evitar una tragedia de proporciones incalculables. El artefacto tenía la capacidad de causar la muerte de cientos de personas inocentes", declaró Salamanca durante una rueda de prensa en la Dirección de Policía.

Los capturados fueron identificados como alias "El Mecánico" y alias "La Flaca", miembros de una célula urbana de las disidencias de las FARC que opera en Bogotá y municipios aledaños. Ambos tenían órdenes de captura por terrorismo y fabricación de explosivos.

El artefacto explosivo, de aproximadamente 15 kilos de dinamita con metralla, fue desactivado por el Grupo de Explosivos y Demoliciones (GOED) de la Policía. El dispositivo estaba camuflado en una maleta abandonada en la plataforma de la estación.

Durante el operativo también se incautaron mapas de otras estaciones del TransMilenio, celulares con comunicaciones comprometedoras, y $20 millones en efectivo provenientes de actividades ilegales.

La alcaldesa de Bogotá, Claudia López, anunció el refuerzo de las medidas de seguridad en todas las estaciones del sistema con 500 policías adicionales y la instalación de 200 cámaras de seguridad con reconocimiento facial.

La Fiscalía General de la Nación imputó cargos por terrorismo, fabricación de explosivos y concierto para delinquir agravado. Los capturados fueron enviados a la cárcel La Picota con medida de aseguramiento.

El presidente Petro condenó enérgicamente el intento de atentado y anunció la creación de una unidad especial antiterrorista para proteger el transporte público en las principales ciudades del país.`,
    category: 'terror',
    source: 'Noticias Uno',
    time: '30 minutos',
    image: '💥',
    engagement: { likes: 234, shares: 456, comments: 298 },
    readTime: '6 min',
    political_lean: 'independiente'
  },
  {
    id: 9,
    title: 'Trump promete revocar TPS para colombianos en primer día de gobierno',
    summary: 'Expresidente estadounidense anuncia que eliminará protecciones migratorias temporales si regresa al poder.',
    fullContent: `Donald Trump anunció durante un evento en Tampa, Florida, que revocará el Estatus de Protección Temporal (TPS) para ciudadanos colombianos en su primer día de gobierno si es reelegido presidente en 2024.

El TPS actualmente protege a aproximadamente 240,000 colombianos que residen en Estados Unidos y que no pueden regresar a su país de origen debido a las condiciones de violencia y inestabilidad. El programa les permite trabajar legalmente y los protege de deportación.

"El TPS se convirtió en un programa de amnistía permanente que no tiene nada que ver con protección temporal. El primer día vamos a terminar con estos abusos", declaró Trump ante una audiencia de simpatizantes republicanos.

La propuesta forma parte de su agenda migratoria "America First 2.0" que incluye la deportación masiva de inmigrantes indocumentados, la construcción de un muro en la frontera con México, y la eliminación de programas que considera "amnistías encubiertas".

La comunidad colombiana en Estados Unidos, concentrada principalmente en Florida, Nueva York, Nueva Jersey y California, expresó alarma por las declaraciones. Organizaciones como la Coalition for Colombian Rights calificaron las propuestas como "crueles e inhumanas".

El cónsul general de Colombia en Miami, Juan Carlos Pinzón, emitió una declaración expresando "profunda preocupación" y anunciando que el gobierno colombiano activará protocolos diplomáticos para proteger a sus connacionales.

Analistas migratorios estiman que la revocación del TPS podría resultar en la deportación forzada de hasta 200,000 colombianos, muchos de los cuales han vivido en Estados Unidos por más de una década y tienen hijos nacidos en territorio estadounidense.

La senadora demócrata Catherine Cortez Masto criticó las propuestas de Trump y anunció que introducirá legislación para hacer permanente el TPS para colombianos y otros beneficiarios del programa.

Organizaciones de derechos humanos alertaron sobre una posible crisis humanitaria si se materializa la revocación, considerando que muchos beneficiarios del TPS no tienen vínculos familiares o económicos en Colombia.`,
    category: 'trump',
    source: 'CNN en Español',
    time: '2 horas',
    image: '🛂',
    engagement: { likes: 345, shares: 523, comments: 278 },
    readTime: '7 min',
    political_lean: 'independiente'
  },
  {
    id: 10,
    title: 'Alerta máxima en Putumayo por presencia de grupos terroristas extranjeros',
    summary: 'Inteligencia militar confirma ingreso de mercenarios venezolanos y extranjeros para reforzar disidencias de FARC.',
    fullContent: `El Comando Conjunto de Operaciones Especiales activó alerta máxima en el departamento de Putumayo tras confirmar el ingreso de mercenarios venezolanos y de otras nacionalidades para reforzar las filas de disidencias de las FARC en la región amazónica.

El general Alberto José Mejía, comandante de las Fuerzas Militares en la zona, informó que inteligencia militar ha identificado la presencia de al menos 150 combatientes extranjeros que habrían ingresado por trochas ilegales desde Venezuela y Ecuador.

"Estamos ante una nueva dimensión del terrorismo en Colombia. Estos grupos han internacionalizado su estructura criminal con mercenarios entrenados en guerra urbana y manejo de explosivos", explicó Mejía durante una videoconferencia con el Alto Mando Militar.

Los mercenarios identificados incluyen desertores del ejército venezolano, exmiembros de grupos paramilitares de ese país, y presuntos combatientes con experiencia en conflictos de Medio Oriente y África, según informes de inteligencia.

El Ministerio de Defensa confirmó que estos grupos terroristas han intensificado sus actividades de narcotráfico, extorsión y secuestro, utilizando tácticas más sofisticadas que incluyen drones, armas de última generación y sistemas de comunicación encriptada.

La situación se agravó tras el asesinato de cinco soldados en una emboscada en el municipio de Puerto Asís, donde se utilizaron explosivos de fabricación casera y tácticas de guerrilla urbana no vistas anteriormente en la región.

El gobierno activó el Plan de Contingencia Amazonas que incluye el despliegue de 3,000 efectivos adicionales, incluyendo Fuerzas Especiales, y la instalación de bases militares avanzadas en zona de frontera.

Las autoridades han evacuado preventivamente a 500 familias de zonas rurales consideradas de alto riesgo y han establecido corredores humanitarios para garantizar el suministro de alimentos y medicinas.

La situación ha generado tensiones diplomáticas con Venezuela y Ecuador, países a los que Colombia ha solicitado mayor control fronterizo y cooperación en operaciones antiterroristas.

El presidente Petro convocó al Consejo de Seguridad Nacional para evaluar la situación y considerar solicitar apoyo internacional para enfrentar esta nueva amenaza terrorista transnacional.`,
    category: 'terror',
    source: 'El Espectador',
    time: '1 hora',
    image: '🚁',
    engagement: { likes: 289, shares: 367, comments: 234 },
    readTime: '8 min',
    political_lean: 'independiente'
  }
];

// Generate additional news articles programmatically to reach 50+ articles
export const generateAdditionalNews = (): NewsArticle[] => {
  const additionalArticles: NewsArticle[] = [];
  const baseCategories = ['terror', 'trump', 'congreso', 'tecnologia', 'politica', 'educacion', 'ambiente', 'salud', 'economia'];
  
  for (let i = 11; i <= 60; i++) {
    const category = baseCategories[i % baseCategories.length];
    const isBreaking = i % 7 === 0; // Make every 7th article "breaking news"
    
    additionalArticles.push({
      id: i,
      title: generateNewsTitle(category, i, isBreaking),
      summary: generateNewsSummary(category, i),
      fullContent: generateNewsContent(category, i),
      category,
      source: generateNewsSource(category),
      time: generateNewsTime(i),
      image: generateNewsImage(category),
      engagement: {
        likes: Math.floor(Math.random() * 500) + 50,
        shares: Math.floor(Math.random() * 300) + 20,
        comments: Math.floor(Math.random() * 200) + 10
      },
      readTime: `${Math.floor(Math.random() * 8) + 3} min`,
      political_lean: generatePoliticalLean(category)
    });
  }
  
  return additionalArticles;
};

function generateNewsTitle(category: string, id: number, isBreaking: boolean): string {
  const breakingPrefix = isBreaking ? "🚨 ÚLTIMA HORA: " : "";
  
  const titles = {
    terror: [
      "Desmantelada célula terrorista que planeaba atentados en centros comerciales",
      "Fuerzas Especiales neutralizan amenaza terrorista en aeropuerto El Dorado",
      "Capturados tres terroristas con explosivos en el Metro de Medellín",
      "Operativo antiterrorista rescata a 15 secuestrados en Cauca",
      "Alerta máxima por amenazas terroristas en temporada navideña"
    ],
    trump: [
      "Trump anuncia nuevas sanciones económicas contra gobierno colombiano",
      "Expresidente estadounidense critica políticas antidrogas de Colombia",
      "Trump propone cerrar fronteras a productos agrícolas colombianos",
      "Campaña de Trump promete mano dura contra inmigración latinoamericana",
      "Donald Trump cuestiona efectividad de Plan Colombia en evento público"
    ],
    congreso: [
      "Senado aprueba reforma tributaria tras intenso debate",
      "Cámara de Representantes tumba proyecto de ley sobre cultivos ilícitos",
      "Congresistas aprueban presupuesto nacional 2025 por amplia mayoría",
      "Debate en Congreso sobre militarización de zonas rurales",
      "Parlamentarios exigen mayor transparencia en contratos estatales"
    ],
    tecnologia: [
      "Colombia se prepara para ser hub tecnológico de América Latina",
      "Lanzamiento de primer satélite colombiano desde Cabo Cañaveral",
      "Inteligencia artificial revoluciona sector salud en hospitales públicos",
      "Ciberseguridad nacional reforzada tras ataques a infraestructura crítica",
      "Blockchain implementado en sistema electoral para mayor transparencia"
    ],
    politica: [
      "Alcaldes del país se reúnen para coordinar políticas de seguridad",
      "Partidos políticos acuerdan pacto anticorrupción para elecciones 2026",
      "Gobierno presenta plan estratégico para los próximos cuatro años",
      "Oposición denuncia irregularidades en manejo de recursos públicos",
      "Mesa de diálogo nacional busca consensos sobre reforma constitucional"
    ]
  };
  
  const categoryTitles = titles[category as keyof typeof titles] || titles.politica;
  const baseTitle = categoryTitles[id % categoryTitles.length];
  
  return `${breakingPrefix}${baseTitle} - Parte ${id}`;
}

function generateNewsSummary(category: string, id: number): string {
  const summaries = {
    terror: "Autoridades continúan operaciones para desmantelar redes terroristas que operan en territorio nacional.",
    trump: "Las declaraciones del expresidente estadounidense generan preocupación en sectores económicos y políticos del país.",
    congreso: "El debate parlamentario refleja las divisiones políticas sobre temas cruciales para el desarrollo nacional.",
    tecnologia: "Avances tecnológicos posicionan a Colombia como referente regional en innovación y transformación digital.",
    politica: "Desarrollo político que impacta las dinámicas nacionales y las relaciones entre diferentes sectores del gobierno."
  };
  
  return summaries[category as keyof typeof summaries] || summaries.politica;
}

function generateNewsContent(category: string, id: number): string {
  return `Este es un artículo completo sobre ${category} que proporciona información detallada sobre los eventos recientes en Colombia.

La situación actual requiere atención especial de parte de las autoridades competentes y la ciudadanía en general. Los expertos consultados coinciden en que es necesario mantener un seguimiento cercano a estos desarrollos.

Según fuentes oficiales, las medidas implementadas buscan garantizar la estabilidad y seguridad del país, mientras se mantiene el diálogo con todos los sectores involucrados.

El gobierno ha expresado su compromiso con la transparencia y la rendición de cuentas, asegurando que se tomarán todas las medidas necesarias para proteger los intereses nacionales.

La ciudadanía puede mantenerse informada a través de los canales oficiales y contribuir al proceso democrático participando activamente en los espacios de debate público.

Este tema continuará siendo monitoreado de cerca por medios de comunicación y organizaciones de la sociedad civil para garantizar el cumplimiento de los compromisos adquiridos.`;
}

function generateNewsSource(category: string): string {
  const sources = {
    terror: ['Caracol Noticias', 'RCN Televisión', 'Noticias Uno', 'City TV'],
    trump: ['CNN en Español', 'BBC Mundo', 'Reuters Colombia', 'AP News'],
    congreso: ['Canal Congreso', 'El Tiempo', 'El Espectador', 'Semana'],
    tecnologia: ['Portafolio', 'TechColombia', 'Revista Sistemas', 'MinTIC'],
    politica: ['El Colombiano', 'La República', 'El Heraldo', 'Vanguardia']
  };
  
  const categorySources = sources[category as keyof typeof sources] || sources.politica;
  return categorySources[Math.floor(Math.random() * categorySources.length)];
}

function generateNewsTime(id: number): string {
  const times = ['30 minutos', '1 hora', '2 horas', '3 horas', '4 horas', '5 horas', '6 horas', '1 día', '2 días'];
  return times[id % times.length];
}

function generateNewsImage(category: string): string {
  const images = {
    terror: ['🚨', '⚔️', '💥', '🛡️', '🚁'],
    trump: ['🇺🇸', '🛂', '💼', '📢', '🗳️'],
    congreso: ['🏛️', '📊', '⚖️', '📋', '🤝'],
    tecnologia: ['💻', '🚀', '🔬', '📱', '🌐'],
    politica: ['🏛️', '📰', '🗳️', '🤝', '📊']
  };
  
  const categoryImages = images[category as keyof typeof images] || images.politica;
  return categoryImages[Math.floor(Math.random() * categoryImages.length)];
}

function generatePoliticalLean(category: string): string {
  if (category === 'trump' || category === 'terror') return 'independiente';
  if (category === 'congreso') return Math.random() > 0.5 ? 'izquierda' : 'derecha';
  return 'independiente';
}

// Combine all articles
export const allNewsArticles = [...newsArticles, ...generateAdditionalNews()];