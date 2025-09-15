import React, { useState, useEffect } from 'react';
import Comments from './Comments';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'todas', name: 'Todas', icon: '📰' },
    { id: 'politica', name: 'Política', icon: '🏛️' },
    { id: 'derecha', name: 'Right Wing', icon: '🗳️' },
    { id: 'izquierda', name: 'Left Wing', icon: '🌹' },
    { id: 'independiente', name: 'Independiente', icon: '⚖️' },
    { id: 'economia', name: 'Economía', icon: '💰' },
    { id: 'social', name: 'Social', icon: '👥' },
    { id: 'educacion', name: 'Educación', icon: '📚' },
    { id: 'salud', name: 'Salud', icon: '🏥' },
    { id: 'terror', name: 'Terror', icon: '🚨' },
    { id: 'congreso', name: 'Congress', icon: '🏛️' },
    { id: 'trump', name: 'Donald Trump', icon: '🇺🇸' }
  ];

  const news = [
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
    {
      id: 3,
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
    {
      id: 4,
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
    },
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
    {
      id: 8,
      title: 'Propuesta conservadora de reforma tributaria enfocada en reducción de impuestos',
      summary: 'Senadores del Centro Democrático y Cambio Radical presentan alternativa que privilegia la reducción fiscal para estimular inversión.',
      fullContent: `Una coalición de senadores conservadores, liderada por el Centro Democrático y respaldada por Cambio Radical, presentó una propuesta alternativa de reforma tributaria que se enfoca en la reducción significativa de impuestos para personas naturales y empresas.

La propuesta, denominada "Reforma para el Crecimiento", busca reducir el impuesto de renta para personas naturales del 39% al 28%, y para empresas del 35% al 25%, con el objetivo de estimular la inversión privada y la creación de empleo.

El senador Carlos Felipe Mejía, ponente principal de la iniciativa, argumentó que "la mejor política social es generar empleo, y esto solo se logra liberando la capacidad productiva del sector privado a través de menores cargas tributarias".

La propuesta incluye la eliminación del impuesto a las transacciones financieras (4x1000), la reducción del IVA del 19% al 16% para productos de la canasta básica, y la creación de incentivos tributarios especiales para empresas que inviertan en investigación y desarrollo.

Para compensar la reducción en ingresos fiscales, la coalición propone eliminar subsidios considerados ineficientes, reducir el gasto burocrático en un 15%, y implementar un plan agresivo de formalización empresarial que amplíe la base tributaria.

"Necesitamos un Estado más eficiente y menos costoso, que permita al sector privado ser el motor del crecimiento económico", declaró la senadora María Fernanda Cabal durante la presentación.

La propuesta también incluye la eliminación de gabelas y beneficios tributarios para sectores específicos, argumentando que esto generaría mayor equidad y transparencia en el sistema fiscal.

El gobierno nacional ha expresado reservas sobre la viabilidad fiscal de estas medidas, argumentando que podrían generar un déficit presupuestal insostenible.`,
      category: 'derecha',
      source: 'Congreso Nacional',
      time: '4 horas',
      image: '🗳️',
      engagement: { likes: 289, shares: 145, comments: 67 },
      readTime: '6 min',
      political_lean: 'derecha'
    },
    {
      id: 9,
      title: 'Coalición de izquierda propone ley de redistribución de tierras ociosas',
      summary: 'El Pacto Histórico presenta proyecto para expropiar tierras improductivas y entregarlas a campesinos sin tierra.',
      fullContent: `El Pacto Histórico presentó en el Congreso un ambicioso proyecto de ley que busca redistribuir tierras ociosas a campesinos sin tierra, como parte fundamental de la reforma agraria integral prometida durante la campaña electoral.

La iniciativa, liderada por el senador Iván Cepeda, establece que todas las tierras que permanezcan improductivas por más de tres años podrán ser objeto de expropiación con fines de redistribución, pagando una compensación basada en el avalúo catastral.

"La concentración de la tierra en Colombia es una de las más altas del mundo, mientras miles de familias campesinas no tienen donde cultivar sus alimentos", declaró Cepeda durante la presentación del proyecto.

El proyecto define como tierras ociosas aquellas que tengan menos del 30% de su extensión en producción agrícola o pecuaria, excluyendo reservas naturales y áreas de conservación ambiental.

La propuesta incluye la creación de un fondo de tierras administrado por la Agencia Nacional de Tierras, que se encargaría de identificar, expropiar y redistribuir los predios ociosos a familias campesinas, comunidades indígenas y afrodescendientes.

Los beneficiarios recibirían no solo la tierra, sino también créditos blandos, asistencia técnica y apoyo para la comercialización de sus productos, con el objetivo de garantizar la viabilidad económica de los nuevos proyectos productivos.

La senadora Clara López argumentó que "la redistribución de tierras es fundamental para lograr la paz territorial y reducir la desigualdad en el campo colombiano".

Los gremios agropecuarios han expresado fuerte oposición al proyecto, argumentando que podría generar inseguridad jurídica y desestimular la inversión en el sector rural.

El proyecto deberá pasar por cuatro debates en el Congreso antes de convertirse en ley, proceso que se espera tome al menos seis meses.`,
      category: 'izquierda',
      source: 'Senado de la República',
      time: '5 horas',
      image: '🌹',
      engagement: { likes: 412, shares: 298, comments: 156 },
      readTime: '7 min',
      political_lean: 'izquierda'
    },
    {
      id: 10,
      title: 'Debate conservador sobre valores tradicionales en educación pública',
      summary: 'Sectores conservadores proponen fortalecer la enseñanza de valores familiares y patrióticos en colegios públicos.',
      fullContent: `Una coalición de congresistas conservadores, padres de familia y organizaciones religiosas lanzó una campaña nacional para promover la enseñanza de valores tradicionales en el sistema educativo público colombiano.

La iniciativa, denominada "Educación con Valores", busca incluir en el currículo obligatorio materias sobre historia patria, educación cívica tradicional, ética basada en valores familiares y respeto por los símbolos nacionales.

El senador Eduardo Pulgar, vocero de la iniciativa, argumentó que "la educación debe formar ciudadanos íntegros, con amor por la patria y respeto por las tradiciones que han forjado nuestra identidad nacional".

La propuesta incluye la creación de la asignatura "Valores y Tradiciones Colombianas", que sería obligatoria desde primero de primaria hasta grado once, con un enfoque en el fortalecimiento de la familia como núcleo fundamental de la sociedad.

Los contenidos incluirían el estudio de la historia patria desde una perspectiva que destaque los valores heroicos y patrióticos, la importancia de la familia nuclear, el respeto por las autoridades y las tradiciones religiosas del país.

La representante Martha Lucía Ramírez destacó que "necesitamos formar jóvenes con principios sólidos, que valoren el trabajo, la disciplina y el respeto por las instituciones democráticas".

La propuesta también contempla la creación de programas de capacitación para docentes en "pedagogía de valores", y el establecimiento de mecanismos de participación de padres de familia en la definición de contenidos educativos.

Sectores progresistas han criticado la iniciativa, argumentando que podría promover una visión dogmática de la educación y limitar el pensamiento crítico de los estudiantes.

El Ministerio de Educación anunció que evaluará la propuesta en el marco de la autonomía curricular de las instituciones educativas y los principios de diversidad y pluralismo.`,
      category: 'derecha',
      source: 'Cámara de Representantes',
      time: '3 horas',
      image: '🗳️',
      engagement: { likes: 234, shares: 123, comments: 89 },
      readTime: '6 min',
      political_lean: 'derecha'
    },
    {
      id: 11,
      title: 'Movimiento progresista impulsa agenda de derechos LGBTI+ en el Congreso',
      summary: 'Bancada del Pacto Histórico presenta proyecto de ley integral para garantizar derechos de la población LGBTI+.',
      fullContent: `La bancada del Pacto Histórico en el Congreso presentó un proyecto de ley integral para garantizar los derechos de la población LGBTI+ en Colombia, que incluye medidas contra la discriminación, reconocimiento de identidades de género y protección de familias diversas.

La iniciativa, liderada por la representante Katherine Miranda, busca crear un marco legal comprehensivo que garantice la igualdad de derechos para todas las personas, independientemente de su orientación sexual o identidad de género.

"Colombia debe ser un país donde todas las personas puedan vivir con dignidad y sin temor a la discriminación", declaró Miranda durante la presentación del proyecto en el Capitolio.

El proyecto incluye la tipificación de crímenes de odio por orientación sexual e identidad de género, con penas de hasta 20 años de prisión para los responsables de estos delitos.

También contempla el reconocimiento legal de las identidades de género trans, permitiendo el cambio de marcadores de género en documentos oficiales mediante un proceso administrativo simplificado.

En materia de familias, la propuesta establece el derecho a la adopción para parejas del mismo sexo, equiparando sus derechos con los de las parejas heterosexuales.

La senadora Angélica Lozano argumentó que "los derechos humanos no son negociables y Colombia debe ponerse a la vanguardia en la protección de las minorías sexuales y de género".

El proyecto también incluye la creación de programas de educación sexual integral en colegios, con enfoque en diversidad y respeto por las diferencias.

Organizaciones conservadoras y religiosas han anunciado su oposición al proyecto, argumentando que podría afectar los valores familiares tradicionales y la libertad religiosa.

La iniciativa deberá superar cuatro debates en el Congreso, donde se espera un intenso debate entre sectores progresistas y conservadores.`,
      category: 'izquierda',
      source: 'Congreso de la República',
      time: '2 horas',
      image: '🌹',
      engagement: { likes: 378, shares: 267, comments: 145 },
      readTime: '6 min',
      political_lean: 'izquierda'
    },
    {
      id: 12,
      title: 'Propuesta conservadora de incentivos para empresas familiares',
      summary: 'Centro Democrático presenta proyecto para beneficiar tributariamente a empresas dirigidas por núcleos familiares.',
      fullContent: `El Centro Democrático presentó en el Congreso un proyecto de ley que busca crear incentivos tributarios especiales para empresas familiares, con el objetivo de fortalecer este tipo de organizaciones que considera fundamentales para la economía nacional.

La iniciativa, liderada por el senador Honorio Henríquez, propone reducir en un 30% el impuesto de renta para empresas donde al menos el 60% de la propiedad esté en manos de miembros de una misma familia.

"Las empresas familiares son la columna vertebral de nuestra economía y merecen un tratamiento tributario diferencial que reconozca su contribución al desarrollo nacional", declaró Henríquez durante la presentación.

El proyecto define como empresa familiar aquella en la que una familia controla la mayoría de las decisiones estratégicas, la propiedad y la gestión, y donde existe la intención de transferir el negocio a las siguientes generaciones.

Los beneficios tributarios incluyen también la exención del impuesto a las transacciones financieras para operaciones relacionadas con la sucesión empresarial, y tasas preferenciales para créditos destinados a la modernización de estas empresas.

La propuesta contempla la creación de un registro nacional de empresas familiares en la Superintendencia de Sociedades, que se encargaría de verificar el cumplimiento de los requisitos para acceder a los beneficios.

El representante Gabriel Santos argumentó que "las empresas familiares generan empleo de calidad, mantienen vínculos estrechos con sus comunidades y tienen una visión de largo plazo que beneficia al país".

El proyecto también incluye programas de capacitación y acompañamiento para facilitar los procesos de sucesión generacional en estas empresas, reconociendo que uno de sus principales desafíos es la transición entre generaciones.

El gobierno nacional ha expresado interés en la propuesta, aunque solicitó un estudio detallado sobre el impacto fiscal de las medidas propuestas.

Los gremios empresariales han respaldado la iniciativa, argumentando que podría fortalecer el tejido empresarial nacional y promover la estabilidad económica.`,
      category: 'derecha',
      source: 'Portafolio Empresarial',
      time: '6 horas',
      image: '🗳️',
      engagement: { likes: 156, shares: 87, comments: 43 },
      readTime: '5 min',
      political_lean: 'derecha'
    },
    {
      id: 13,
      title: 'Izquierda propone reforma laboral para fortalecer derechos de trabajadores',
      summary: 'Pacto Histórico presenta proyecto que busca reducir jornada laboral y fortalecer negociación colectiva.',
      fullContent: `El Pacto Histórico presentó en el Congreso una ambiciosa reforma laboral que busca modernizar las relaciones de trabajo en Colombia, con énfasis en la reducción de la jornada laboral y el fortalecimiento de los derechos de los trabajadores.

La propuesta, liderada por el senador Alexander López, incluye la reducción gradual de la jornada laboral de 48 a 40 horas semanales, sin reducción salarial, como parte de una estrategia para mejorar la calidad de vida de los trabajadores.

"Los trabajadores colombianos merecen condiciones laborales dignas que les permitan desarrollarse integralmente como personas", declaró López durante la presentación del proyecto.

La reforma propone fortalecer significativamente la negociación colectiva, estableciendo la obligatoriedad para todas las empresas con más de 50 empleados de negociar condiciones laborales con organizaciones sindicales.

El proyecto también incluye la tipificación del acoso laboral como delito penal, con sanciones que van desde multas hasta prisión para empleadores que incurran en estas prácticas.

En materia de estabilidad laboral, la propuesta elimina los contratos de prestación de servicios para actividades permanentes de las empresas, obligando a la contratación directa con todos los beneficios laborales.

La senadora Aída Avella argumentó que "es hora de que Colombia supere la precarización laboral y construya relaciones de trabajo basadas en la dignidad y la justicia social".

La reforma contempla también la creación de un fondo de desempleo financiado con aportes tripartitos (Estado, empleadores y trabajadores) que garantice ingresos básicos a personas desempleadas por hasta seis meses.

Los gremios empresariales han expresado fuertes críticas al proyecto, argumentando que podría incrementar significativamente los costos laborales y afectar la competitividad de las empresas colombianas.

El proyecto deberá pasar por un extenso proceso de debate en el Congreso, donde se espera una fuerte confrontación entre sectores empresariales y sindicales.`,
      category: 'izquierda',
      source: 'Central Unitaria de Trabajadores',
      time: '4 horas',
      image: '🌹',
      engagement: { likes: 445, shares: 234, comments: 178 },
      readTime: '7 min',
      political_lean: 'izquierda'
    },
    {
      id: 14,
      title: 'Análisis de salud pública: Desafíos del sistema de salud colombiano',
      summary: 'Estudio académico independiente evalúa fortalezas y debilidades del sistema de salud nacional.',
      fullContent: `Un estudio comprehensivo realizado por investigadores de la Universidad de los Andes y la Universidad Nacional evaluó el estado actual del sistema de salud colombiano, identificando tanto logros significativos como desafíos persistentes.

La investigación, dirigida por la doctora Carmen Lucía Cuéllar, analizó datos de los últimos cinco años para evaluar el desempeño del sistema en términos de cobertura, calidad, eficiencia y equidad.

Entre los logros destacados, el estudio reconoce que Colombia ha alcanzado una cobertura universal del 97.2% de la población, una de las más altas de América Latina, y ha logrado reducir significativamente la mortalidad infantil en la última década.

Sin embargo, el informe identifica problemas críticos como las largas listas de espera para procedimientos especializados, con tiempos promedio de 6 meses para cirugías no urgentes, y las disparidades en calidad entre diferentes regiones del país.

"El sistema colombiano tiene bases sólidas, pero requiere ajustes importantes para garantizar acceso oportuno y calidad homogénea en todo el territorio", concluyó Cuéllar.

El estudio revela que el 68% de los usuarios reporta demoras excesivas en la atención especializada, y que existe una brecha significativa en la disponibilidad de profesionales de la salud entre zonas urbanas y rurales.

En términos de sostenibilidad financiera, los investigadores advierten sobre el crecimiento del gasto en salud por encima del PIB, lo que podría generar presiones fiscales en el mediano plazo.

El informe recomienda fortalecer la atención primaria, mejorar los sistemas de información, optimizar la gestión de recursos y desarrollar estrategias específicas para reducir las brechas territoriales.

Los investigadores también sugieren explorar modelos de telemedicina para mejorar el acceso en zonas rurales y establecer mecanismos más eficientes de control de calidad en la prestación de servicios.`,
      category: 'salud',
      source: 'Universidad de los Andes',
      time: '8 horas',
      image: '🏥',
      engagement: { likes: 123, shares: 67, comments: 34 },
      readTime: '6 min',
      political_lean: 'independiente'
    },
    {
      id: 15,
      title: 'Debate político sobre política migratoria y refugiados venezolanos',
      summary: 'Sectores políticos debaten estrategias para manejar la migración venezolana y la integración regional.',
      fullContent: `El Congreso colombiano inició un debate sobre la política migratoria nacional, centrado principalmente en el manejo de la migración venezolana y la necesidad de desarrollar estrategias de integración sostenibles.

Colombia alberga actualmente cerca de 2.9 millones de migrantes venezolanos, convirtiéndose en el país que más refugiados ha recibido de la crisis migratoria regional.

El senador Juan Carlos Losada, del Pacto Histórico, defendió la política de puertas abiertas implementada por el gobierno, argumentando que "Colombia tiene la responsabilidad humanitaria de acoger a quienes huyen de la crisis venezolana".

Por su parte, el Centro Democrático, a través del senador Paloma Valencia, propuso una política más restrictiva que incluya mayores controles fronterizos y mecanismos de deportación para migrantes irregulares que cometan delitos.

"Debemos proteger a los migrantes que vienen a trabajar honradamente, pero también proteger a los colombianos de quienes aprovechan nuestra generosidad para delinquir", declaró Valencia.

El debate incluye la discusión sobre el Estatuto Temporal de Protección, que ha otorgado regularización a más de 1.7 millones de venezolanos, permitiéndoles acceder a servicios de salud, educación y trabajo formal.

Los datos oficiales muestran que el 78% de los migrantes venezolanos en Colombia están en edad productiva, y que su aporte al PIB nacional ha sido positivo, contribuyendo con el 0.4% del crecimiento económico.

Sin embargo, persisten desafíos en términos de integración laboral, con altas tasas de informalidad entre la población migrante, y presiones sobre los sistemas de salud y educación en las ciudades de mayor recepción.

El gobierno nacional ha solicitado mayor apoyo internacional para atender las necesidades de la población migrante, argumentando que se trata de una crisis regional que requiere respuestas coordenadas.

El debate parlamentario continuará en las próximas semanas, donde se espera la presentación de propuestas concretas para mejorar la política migratoria nacional.`,
      category: 'social',
      source: 'Defensoría del Pueblo',
      time: '5 horas',
      image: '👥',
      engagement: { likes: 89, shares: 45, comments: 67 },
      readTime: '7 min',
      political_lean: 'independiente'
    }
  ];

  // Simulate loading news articles
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        // Simulate potential error (10% chance)
        if (Math.random() < 0.1) {
          throw new Error('Error al cargar las noticias. Por favor, intenta nuevamente.');
        }
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredNews = selectedCategory === 'todas' 
    ? news 
    : news.filter(item => item.category === selectedCategory || item.political_lean === selectedCategory);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-4 bg-gray-300 rounded mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                    <div className="w-12 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-32 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">😕</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar noticias</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Intentar nuevamente
      </button>
    </div>
  );

  // No content state component
  const NoContent = () => (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="text-6xl mb-4">📰</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">No hay noticias disponibles</h3>
      <p className="text-gray-600 mb-6">
        No se encontraron artículos para la categoría seleccionada. 
        Intenta con otra categoría o busca temas específicos.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => setSelectedCategory('todas')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ver todas las noticias
        </button>
        <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
          Buscar temas relacionados
        </button>
      </div>
    </div>
  );

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Article header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              ← Volver a noticias
            </button>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className={`px-3 py-1 rounded-full text-white ${
                selectedArticle.political_lean === 'derecha' ? 'bg-red-500' :
                selectedArticle.political_lean === 'izquierda' ? 'bg-blue-500' :
                'bg-gray-500'
              }`}>
                {selectedArticle.political_lean === 'derecha' ? 'Right Wing' :
                 selectedArticle.political_lean === 'izquierda' ? 'Left Wing' : 'Independiente'}
              </span>
              <span>{selectedArticle.source}</span>
              <span>•</span>
              <span>hace {selectedArticle.time}</span>
              <span>•</span>
              <span>{selectedArticle.readTime} de lectura</span>
            </div>
          </div>
        </div>

        {/* Article content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-6xl text-center mb-6">{selectedArticle.image}</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {selectedArticle.title}
              </h1>
              
              <div className="prose prose-lg max-w-none">
                {selectedArticle.fullContent.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Engagement */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition">
                      <span>👍</span>
                      <span>{selectedArticle.engagement.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition">
                      <span>📤</span>
                      <span>{selectedArticle.engagement.shares}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition">
                      <span>💬</span>
                      <span>{selectedArticle.engagement.comments}</span>
                    </button>
                  </div>
                  <div className="flex space-x-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Compartir
                    </button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related articles */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Artículos relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news
                .filter(article => article.id !== selectedArticle.id && article.category === selectedArticle.category)
                .slice(0, 3)
                .map((article) => (
                <div 
                  key={article.id} 
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="text-2xl mb-2">{article.image}</div>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.summary}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {article.source} • hace {article.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <Comments articleId={selectedArticle.id} articleTitle={selectedArticle.title} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 via-blue-500 to-red-500 p-6 rounded-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">📰 Noticias Cívicas</h1>
          <p className="text-white/90">Mantente informado sobre los temas que afectan a Colombia</p>
          <div className="mt-4 flex items-center space-x-6 text-white/80">
            <span>🔄 Actualizado cada hora</span>
            <span>✅ Fuentes verificadas</span>
            <span>📊 Análisis de impacto cívico</span>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Breaking News */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
          <div className="flex items-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
              🚨 ÚLTIMO MOMENTO
            </span>
            <p className="text-red-800 font-medium">
              Presidente anuncia nueva inversión de $2 billones para infraestructura rural
            </p>
            <button className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium">
              Leer más →
            </button>
          </div>
        </div>

        {/* News Feed */}
        <div className="space-y-6">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState />
          ) : filteredNews.length === 0 ? (
            <NoContent />
          ) : (
            filteredNews.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{article.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.category === 'educacion' ? 'bg-blue-100 text-blue-800' :
                        article.category === 'ambiente' ? 'bg-green-100 text-green-800' :
                        article.category === 'salud' ? 'bg-red-100 text-red-800' :
                        article.category === 'derecha' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                      <span className="text-sm text-gray-500">{article.source}</span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">hace {article.time}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer"
                        onClick={() => setSelectedArticle(article)}>
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-600">
                          <span>👍</span>
                          <span>{article.engagement.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-600">
                          <span>📤</span>
                          <span>{article.engagement.shares}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-purple-600">
                          <span>💬</span>
                          <span>{article.engagement.comments}</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => setSelectedArticle(article)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Leer artículo completo →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )))}
        </div>

        {/* Trending Topics */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🔥 Temas Trending</h3>
          <div className="flex flex-wrap gap-2">
            {[
              '#ReformaTributaria',
              '#TransportePublico',
              '#EducacionDigital',
              '#CambioClimatico',
              '#SeguridadCiudadana',
              '#PazTotal',
              '#DesarrolloRural'
            ].map((hashtag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200"
              >
                {hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;