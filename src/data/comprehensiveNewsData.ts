export interface NewsItem {
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

export const comprehensiveNewsData: NewsItem[] = [
  // Educational news
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
  
  // Environmental news
  {
    id: 2,
    title: 'Bogotá implementa nuevas medidas para mejorar la calidad del aire',
    summary: 'La administración distrital presenta un plan integral para reducir la contaminación atmosférica en un 30% para 2025.',
    fullContent: `La alcaldía de Bogotá presentó ayer el "Plan Aire Limpio 2024-2028", una estrategia integral que busca reducir significativamente los niveles de contaminación atmosférica en la capital colombiana.

El alcalde Carlos Fernando Galán anunció que la ciudad invertirá 2 billones de pesos en los próximos cuatro años para implementar medidas que incluyen la ampliación del sistema de transporte público eléctrico, la creación de nuevas zonas verdes y la implementación de tecnologías de monitoreo ambiental en tiempo real.

Entre las medidas más destacadas se encuentra la expansión del sistema TransMilenio con 200 buses eléctricos adicionales, la creación de 15 nuevos parques urbanos y la implementación de ciclovías que conectarán todos los sectores de la ciudad.

El plan también incluye restricciones más estrictas para vehículos particulares en el centro de la ciudad y incentivos fiscales para empresas que adopten tecnologías limpias.

"Nuestro objetivo es que Bogotá sea una ciudad modelo en sostenibilidad ambiental para América Latina", declaró el alcalde durante la presentación del plan.

Los primeros resultados del plan se esperan ver en los próximos seis meses, con la instalación de nuevas estaciones de monitoreo de calidad del aire en 50 puntos estratégicos de la ciudad.`,
    category: 'ambiente',
    source: 'Alcaldía de Bogotá',
    time: '4 horas',
    image: '🌱',
    engagement: { likes: 189, shares: 67, comments: 28 },
    readTime: '5 min',
    political_lean: 'izquierda'
  },

  // Right wing politics
  {
    id: 3,
    title: 'Centro Democrático propone nueva agenda conservadora para 2025',
    summary: 'El partido de oposición presenta propuestas sobre seguridad, economía de mercado y valores tradicionales.',
    fullContent: `El Centro Democrático, principal partido de oposición en Colombia, presentó oficialmente su agenda política para 2025, enfocada en tres pilares fundamentales: seguridad ciudadana, crecimiento económico y fortalecimiento de los valores tradicionales.

El expresidente Álvaro Uribe, junto con el actual presidente del partido, dirigió la presentación de este plan que incluye 50 propuestas específicas para el desarrollo nacional.

En materia de seguridad, el partido propone aumentar el pie de fuerza policial en un 40%, implementar tecnología de reconocimiento facial en las principales ciudades y endurecer las penas para delitos como el hurto y la extorsión.

En el ámbito económico, la agenda incluye una reducción del 5% en el impuesto de renta para empresas que generen más de 100 empleos formales, la eliminación de tramitología innecesaria para emprendedores y la creación de zonas económicas especiales en regiones fronterizas.

"Colombia necesita un rumbo claro hacia la prosperidad y la seguridad. Nuestra agenda representa las aspiraciones de millones de colombianos que quieren progresar en libertad", declaró Uribe durante el evento.

El partido también propone fortalecer la familia como núcleo fundamental de la sociedad y garantizar la libertad de educación para que los padres puedan elegir la formación de sus hijos.

La agenda será presentada formalmente en el Congreso de la República el próximo mes, donde el Centro Democrático buscará generar alianzas con otros sectores políticos afines.`,
    category: 'derecha',
    source: 'Centro Democrático',
    time: '1 hora',
    image: '🗳️',
    engagement: { likes: 312, shares: 156, comments: 89 },
    readTime: '6 min',
    political_lean: 'derecha'
  },

  // Left wing politics
  {
    id: 4,
    title: 'Pacto Histórico impulsa reforma al sistema pensional con enfoque social',
    summary: 'La coalición de gobierno presenta propuesta para garantizar pensiones dignas a trabajadores informales.',
    fullContent: `El Pacto Histórico, coalición que apoya al presidente Gustavo Petro, anunció una nueva propuesta de reforma al sistema pensional que busca garantizar una vejez digna para todos los colombianos, especialmente para quienes han trabajado en la informalidad.

La senadora Isabel Zuleta, ponente principal de la reforma, explicó que el nuevo sistema establecería una pensión básica universal de $500,000 pesos mensuales para todos los adultos mayores de 65 años que no tengan acceso a otros mecanismos pensionales.

La propuesta incluye la creación de un fondo solidario financiado con aportes del Estado, empleadores y trabajadores, que garantizaría sostenibilidad financiera a largo plazo.

"No podemos permitir que millones de colombianos que han trabajado toda su vida terminen en la indigencia por no haber podido cotizar formalmente", declaró Zuleta durante la presentación de la propuesta.

El nuevo sistema mantendría el régimen de prima media administrado por Colpensiones como pilar principal, pero eliminaría gradualmente los fondos privados de pensiones, trasladando esos recursos al sistema público.

La reforma también propone reducir de 1,300 a 1,000 las semanas de cotización requeridas para acceder a una pensión y establecer mecanismos especiales para mujeres, teniendo en cuenta su expectativa de vida y las brechas laborales por cuidado de hijos.

El gobierno espera radicar el proyecto en el Congreso antes de finalizar el año, con la meta de que entre en vigencia en 2026.`,
    category: 'izquierda',
    source: 'Pacto Histórico',
    time: '3 horas',
    image: '🌹',
    engagement: { likes: 298, shares: 134, comments: 78 },
    readTime: '5 min',
    political_lean: 'izquierda'
  },

  // Terror/Security news
  {
    id: 5,
    title: 'Alerta de seguridad: Incrementan amenazas terroristas en zonas fronterizas',
    summary: 'Fuerzas militares colombianas reportan aumento en actividad de grupos armados ilegales en la frontera con Venezuela.',
    fullContent: `El Alto Mando Militar de Colombia emitió una alerta de seguridad tras detectar un incremento significativo en la actividad de grupos armados ilegales en las zonas fronterizas con Venezuela, particularmente en los departamentos de Norte de Santander y Arauca.

Según el informe del general Carlos Alberto Patiño, comandante de las Fuerzas Militares, se han identificado nuevas rutas de tráfico de armas y drogas utilizadas por grupos residuales de las FARC y bandas criminales que operan desde territorio venezolano.

"Hemos detectado un patrón preocupante en el incremento de amenazas contra la población civil y nuestras unidades militares", declaró Patiño durante una rueda de prensa en el Ministerio de Defensa.

El informe indica que estos grupos han intensificado sus actividades de extorsión, secuestro y atentados contra la infraestructura petrolera de la región. En los últimos tres meses se han registrado 15 atentados contra oleoductos y torres de energía eléctrica.

La respuesta del gobierno ha incluido el refuerzo de 2,000 soldados adicionales en la zona y la implementación de nuevas tecnologías de vigilancia satelital proporcionadas por Estados Unidos y la Unión Europea.

Las autoridades venezolanas han sido notificadas oficialmente sobre estas actividades, aunque hasta el momento no han respondido a las solicitudes de cooperación binacional para combatir estos grupos.

La población civil ha sido evacuada preventivamente de tres municipios considerados de alto riesgo, mientras se mantiene un cordón de seguridad en un radio de 50 kilómetros de la frontera.`,
    category: 'terror',
    source: 'Reuters Colombia',
    time: '30 minutos',
    image: '🚨',
    engagement: { likes: 89, shares: 234, comments: 156 },
    readTime: '6 min',
    political_lean: 'independiente'
  },

  // Congress news
  {
    id: 6,
    title: 'Congreso aprueba proyecto de ley sobre inteligencia artificial en el sector público',
    summary: 'El Senado colombiano aprobó en primer debate una normativa para regular el uso de IA en entidades gubernamentales.',
    fullContent: `El Senado de la República aprobó en primer debate el proyecto de ley que busca regular el uso de inteligencia artificial en el sector público colombiano, convirtiéndose en uno de los primeros países de América Latina en abordar esta temática legislativa.

La iniciativa, presentada por la senadora María José Pizarro del Pacto Histórico y respaldada por parlamentarios de diferentes bancadas, establece un marco normativo para garantizar el uso ético y transparente de la IA en entidades estatales.

El proyecto define principios fundamentales como la transparencia algorítmica, la no discriminación, la protección de datos personales y la rendición de cuentas en los sistemas de IA utilizados por el gobierno.

"Esta ley posiciona a Colombia como líder regional en la regulación de tecnologías emergentes", declaró Pizarro durante el debate en el pleno del Senado.

La normativa establece que todas las entidades públicas deberán registrar sus sistemas de IA ante una nueva autoridad regulatoria, además de someterse a auditorías periódicas para verificar el cumplimiento de los estándares éticos.

El ministro de Tecnologías de la Información y las Comunicaciones, Mauricio Lizcano, respaldó la iniciativa y anunció que el gobierno destinará $50 mil millones de pesos para implementar los nuevos estándares.

La oposición, liderada por el Centro Democrático, expresó preocupaciones sobre los costos de implementación y solicitó un estudio de impacto fiscal antes de la votación en segundo debate.

El proyecto ahora pasa a la Cámara de Representantes, donde se espera que sea debatido durante las próximas semanas.`,
    category: 'congreso',
    source: 'AP News Colombia',
    time: '1 hora',
    image: '🏛️',
    engagement: { likes: 342, shares: 127, comments: 98 },
    readTime: '5 min',
    political_lean: 'independiente'
  },

  // Trump news
  {
    id: 7,
    title: 'Trump anuncia nueva política comercial que afectaría exportaciones colombianas',
    summary: 'El expresidente estadounidense propone aranceles adicionales a productos agrícolas latinoamericanos en caso de volver al poder.',
    fullContent: `Durante un mitin en Florida, el expresidente Donald Trump anunció su intención de implementar nuevos aranceles comerciales que afectarían significativamente las exportaciones colombianas, particularmente en los sectores de café, flores y productos agrícolas.

La propuesta, que formaría parte de su plataforma electoral para 2024, incluye un arancel del 25% a productos agrícolas de países que "no cooperen adecuadamente" en la lucha contra el narcotráfico, una categoría en la que incluye a Colombia.

"Vamos a proteger a los agricultores estadounidenses de la competencia desleal y vamos a asegurar que los países que permiten el flujo de drogas hacia Estados Unidos paguen el precio", declaró Trump ante una multitud de seguidores.

La medida tendría un impacto devastador en la economía colombiana, considerando que Estados Unidos es el principal destino de las exportaciones del país, representando el 31% del total.

El embajador de Colombia en Washington, Francisco Santos, emitió un comunicado expresando "profunda preocupación" por estas declaraciones y recordando que Colombia es uno de los principales aliados de Estados Unidos en la lucha contra el narcotráfico.

Analistas económicos estiman que los aranceles propuestos por Trump podrían reducir las exportaciones colombianas en $3.2 mil millones anuales y afectar a más de 500,000 empleos directos e indirectos.

El presidente Gustavo Petro convocó a una reunión de emergencia del Consejo de Ministros para evaluar posibles respuestas diplomáticas y estrategias de diversificación comercial.

La Asociación Nacional de Exportadores (ANALDEX) solicitó al gobierno colombiano intensificar las gestiones diplomáticas para evitar que estas propuestas se materialicen.`,
    category: 'trump',
    source: 'BBC Mundo',
    time: '2 horas',
    image: '🇺🇸',
    engagement: { likes: 567, shares: 389, comments: 234 },
    readTime: '7 min',
    political_lean: 'independiente'
  },

  // Technology news
  {
    id: 8,
    title: 'Colombia lanza plan nacional de transformación digital para 2030',
    summary: 'El gobierno presenta una estrategia integral para digitalizar el 80% de los trámites públicos y conectar todas las zonas rurales.',
    fullContent: `El Ministerio de Tecnologías de la Información y las Comunicaciones (MinTIC) lanzó oficialmente el "Plan Nacional de Transformación Digital 2024-2030", una ambiciosa estrategia que busca posicionar a Colombia como líder tecnológico en América Latina.

El plan, que requiere una inversión de $8 billones de pesos durante seis años, tiene cuatro objetivos principales: digitalizar el 80% de los trámites gubernamentales, conectar el 95% del territorio nacional con internet de alta velocidad, formar un millón de ciudadanos en competencias digitales y crear 300,000 empleos en el sector tecnológico.

La ministra Carmen Ligia Valderrama explicó durante la presentación que el plan incluye la construcción de 5,000 kilómetros de fibra óptica, la instalación de 10,000 puntos de acceso Wi-Fi gratuito en zonas rurales y la creación de 50 centros de innovación tecnológica en todo el país.

"Esta es la transformación más ambiciosa que ha emprendido Colombia en materia tecnológica", declaró Valderrama en el evento realizado en el Centro de Innovación de Bogotá.

El sector privado también participará activamente en la iniciativa. Empresas como Claro, Movistar, Tigo y ETB han comprometido inversiones por $2 billones adicionales para acelerar el despliegue de redes 5G y mejorar la cobertura en zonas apartadas.

El plan incluye programas especiales para comunidades indígenas y afrodescendientes, garantizando que la transformación digital sea inclusiva y respete la diversidad cultural del país.

Los primeros resultados se esperan ver en 2025, con el lanzamiento de la plataforma "Colombia Digital", que centralizará todos los servicios gubernamentales en línea y permitirá a los ciudadanos realizar la mayoría de trámites desde sus dispositivos móviles.

La iniciativa cuenta con el respaldo del Banco Interamericano de Desarrollo (BID), que otorgó un crédito de $500 millones para financiar la primera fase del proyecto.`,
    category: 'tecnologia',
    source: 'El Tiempo Tecnología',
    time: '3 horas',
    image: '💻',
    engagement: { likes: 423, shares: 198, comments: 87 },
    readTime: '6 min',
    political_lean: 'independiente'
  },

  // More Terror news
  {
    id: 9,
    title: 'Desmantelan red terrorista que planeaba ataques en centros comerciales de Bogotá',
    summary: 'CTI y DIJIN capturan a 8 personas vinculadas con célula extremista que operaba desde Soacha.',
    fullContent: `En una operación coordinada entre el CTI de la Fiscalía y la DIJIN de la Policía Nacional, fueron capturadas 8 personas que conformaban una célula terrorista que planeaba ejecutar ataques simultáneos en tres centros comerciales de Bogotá durante las festividades navideñas.

La investigación, que se desarrolló durante seis meses, reveló que el grupo tenía vínculos con organizaciones extremistas internacionales y había estado estudiando los patrones de seguridad de los establecimientos comerciales seleccionados como objetivos.

"Esta red criminal representaba una amenaza real y presente para la seguridad de miles de ciudadanos que frecuentan estos lugares durante las épocas de mayor afluencia", declaró el director de la DIJIN, coronel Álvaro Pico.

Durante los allanamientos realizados en varios municipios de Cundinamarca, las autoridades incautaron material explosivo, manuales de fabricación de artefactos explosivos improvisados, comunicaciones cifradas y documentos que evidenciaban la planificación detallada de los ataques.

El fiscal del caso informó que los detenidos serán imputados por los delitos de terrorismo, fabricación y tráfico de armas, y concierto para delinquir agravado, delitos que pueden alcanzar penas de hasta 30 años de prisión.

Las autoridades han reforzado las medidas de seguridad en centros comerciales, estaciones de transporte masivo y otros lugares de alta concentración de personas, especialmente durante la temporada navideña.

La Unidad Nacional de Protección (UNP) ha activado protocolos especiales para funcionarios públicos que podrían ser objetivo de grupos extremistas, mientras que la inteligencia militar mantiene alerta máxima en todas las regiones del país.`,
    category: 'terror',
    source: 'Fiscalía General',
    time: '45 minutos',
    image: '🚨',
    engagement: { likes: 134, shares: 287, comments: 201 },
    readTime: '5 min',
    political_lean: 'independiente'
  },

  // More Congress news
  {
    id: 10,
    title: 'Senado debate nueva ley de transparencia en contratación pública tras escándalos de corrupción',
    summary: 'Iniciativa bipartidista propone blockchain y auditorías ciudadanas en tiempo real para todos los contratos estatales.',
    fullContent: `El Senado de la República inició el debate de un proyecto de ley que revolucionaría la transparencia en la contratación pública, incorporando tecnología blockchain y mecanismos de auditoría ciudadana en tiempo real para todos los contratos del Estado.

La iniciativa, presentada conjuntamente por senadores del oficialismo y la oposición, surge como respuesta a los recientes escándalos de corrupción en la contratación de obras de infraestructura y la adquisición de bienes y servicios por parte de entidades públicas.

"Colombia necesita un sistema de contratación que sea transparente, eficiente y que permita a los ciudadanos ejercer control social real sobre el uso de sus recursos", afirmó la senadora Patricia Linares, una de las ponentes del proyecto.

La propuesta incluye la creación de una plataforma digital única donde se publicarán todos los procesos contractuales desde su planeación hasta su liquidación, con acceso público y en tiempo real a toda la información relevante.

El sistema utilizará tecnología blockchain para garantizar la inmutabilidad de los registros y permitirá que veedurías ciudadanas, universidades y organizaciones de la sociedad civil puedan hacer seguimiento detallado a la ejecución de los contratos.

Además, se establecerán alertas automáticas cuando se detecten irregularidades como sobrecostos, modificaciones no justificadas o retrasos en la ejecución, activando protocolos de intervención inmediata por parte de los órganos de control.

El ministro de las TIC, Mauricio Lizcano, respaldó la iniciativa y anunció que el gobierno destinará $200 mil millones para la implementación de la plataforma tecnológica requerida.

El proyecto también contempla sanciones más severas para funcionarios y contratistas que incurran en prácticas corruptas, incluyendo la inhabilitación permanente para contratar con el Estado y penas de prisión de hasta 20 años para casos de peculado y soborno.`,
    category: 'congreso',
    source: 'Senado de la República',
    time: '2 horas',
    image: '🏛️',
    engagement: { likes: 456, shares: 298, comments: 189 },
    readTime: '6 min',
    political_lean: 'independiente'
  },

  // More Trump news
  {
    id: 11,
    title: 'Equipo de campaña de Trump evalúa suspender Plan Colombia si regresa a la presidencia',
    summary: 'Asesores republicanos consideran que la cooperación antinarcóticos actual es ineficaz y costosa para Estados Unidos.',
    fullContent: `Fuentes cercanas al equipo de campaña del expresidente Donald Trump revelaron que se está evaluando la posibilidad de suspender o reestructurar completamente el Plan Colombia en caso de que el candidato republicano regrese a la Casa Blanca en 2025.

La propuesta, que aún está en fase de evaluación, se basa en la percepción de que los más de $12 mil millones invertidos por Estados Unidos en las últimas dos décadas no han logrado reducir significativamente el flujo de drogas hacia territorio estadounidense.

"Los números hablan por sí solos: Colombia sigue siendo el principal productor de cocaína del mundo a pesar de décadas de ayuda estadounidense. Es hora de repensar esta estrategia", declaró un asesor senior de la campaña, quien pidió anonimato.

El documento de trabajo, al que tuvo acceso la prensa, contempla redirigir los recursos actualmente destinados al Plan Colombia hacia el fortalecimiento de la seguridad fronteriza en México y programas de rehabilitación en comunidades estadounidenses afectadas por las drogas.

La propuesta ha generado alarma en círculos diplomáticos y de defensa tanto en Washington como en Bogotá, donde se considera que la cooperación bilateral en seguridad es fundamental para la estabilidad regional.

El embajador de Colombia en Estados Unidos, Luis Gilberto Murillo, solicitó una reunión urgente con el Departamento de Estado para expresar las preocupaciones del gobierno colombiano sobre estas declaraciones.

Analistas de política exterior advierten que la suspensión del Plan Colombia podría tener consecuencias devastadoras para la lucha contra el narcotráfico en toda la región, además de afectar otros aspectos de la cooperación bilateral como el comercio y la inversión.

El Centro de Estudios Estratégicos e Internacionales (CSIS) publicó un informe advirtiendo que tal medida podría llevar a un incremento del 40% en la producción de cocaína en los próximos cinco años.`,
    category: 'trump',
    source: 'The Washington Post',
    time: '1 hora',
    image: '🇺🇸',
    engagement: { likes: 678, shares: 445, comments: 312 },
    readTime: '7 min',
    political_lean: 'independiente'
  },

  // Additional comprehensive news across all categories
  {
    id: 12,
    title: 'Análisis independiente: Los retos económicos de Colombia en 2024',
    summary: 'Expertos académicos evalúan objetivamente los desafíos y oportunidades económicas del país.',
    fullContent: `Un grupo de economistas independientes de las universidades Javeriana, Nacional y Andes publicó un análisis comprehensivo sobre los principales retos económicos que enfrentará Colombia en 2024.

El estudio, liderado por la economista María José Ramírez de la Universidad Nacional, identifica cinco desafíos críticos: la inflación persistente, el desempleo juvenil, la informalidad laboral, el déficit fiscal y la dependencia de commodities.

Según el análisis, aunque la inflación ha mostrado signos de desaceleración, aún se mantiene por encima de la meta del Banco de la República del 3%. Los expertos recomiendan mantener una política monetaria prudente y evitar presiones fiscales adicionales.

En cuanto al empleo, el estudio revela que el 47% de los jóvenes entre 18 y 25 años no tiene acceso a empleo formal, lo que representa un riesgo social significativo. Los académicos proponen incentivos tributarios para empresas que contraten jóvenes y programas de capacitación técnica alineados con las demandas del mercado laboral.

El informe también destaca oportunidades en sectores como la tecnología, el turismo sostenible y la agroindustria, que podrían generar empleos de calidad y reducir la dependencia del país en exportaciones tradicionales.

"Colombia tiene el potencial para diversificar su economía, pero requiere políticas de Estado coherentes y sostenidas en el tiempo, independientemente del gobierno de turno", concluye el estudio.

Los economistas recomiendan crear un consejo económico nacional permanente que trascienda los cambios políticos y mantenga la continuidad en las políticas públicas esenciales.`,
    category: 'independiente',
    source: 'Consorcio Académico',
    time: '6 horas',
    image: '⚖️',
    engagement: { likes: 167, shares: 92, comments: 45 },
    readTime: '7 min',
    political_lean: 'independiente'
  }
];

export const getNewsByCategory = (category: string) => {
  if (category === 'todas') {
    return comprehensiveNewsData;
  }
  return comprehensiveNewsData.filter(item => 
    item.category === category || item.political_lean === category
  );
};