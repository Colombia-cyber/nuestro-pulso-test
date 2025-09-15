import React, { useEffect, useState } from 'react';

type Article = {
  title: string;
  description: string;
  source: { name: string };
  publishedAt: string;
  url: string;
};

// Static news data with comprehensive content
const staticNewsData = {
  colombianNews: [
    {
      title: "Petro anuncia inversión de $2 billones en infraestructura rural colombiana",
      description: "El presidente presenta plan ambicioso para conectar zonas apartadas del país con carreteras, internet y servicios básicos.",
      source: { name: "El Tiempo" },
      publishedAt: "2024-01-15T10:30:00Z",
      url: "#"
    },
    {
      title: "Gobierno Petro lanza programa nacional de energías renovables",
      description: "Nueva iniciativa busca que Colombia genere 70% de su energía a partir de fuentes limpias para 2030.",
      source: { name: "Semana" },
      publishedAt: "2024-01-15T08:15:00Z",
      url: "#"
    },
    {
      title: "Reforma pensional de Petro avanza en primer debate en el Congreso",
      description: "La propuesta de pensión básica universal recibe apoyo de coalición de gobierno pero enfrenta oposición conservadora.",
      source: { name: "RCN Radio" },
      publishedAt: "2024-01-15T06:45:00Z",
      url: "#"
    },
    {
      title: "Petro se reúne con líderes sindicales para discutir reforma laboral",
      description: "El mandatario busca consensos para mejorar las condiciones de trabajadores informales en Colombia.",
      source: { name: "Caracol Radio" },
      publishedAt: "2024-01-14T16:20:00Z",
      url: "#"
    },
    {
      title: "Presidente Petro destaca logros en reducción de cultivos de coca",
      description: "Según cifras oficiales, la sustitución voluntaria ha reducido en 15% las hectáreas cultivadas en 2024.",
      source: { name: "El Espectador" },
      publishedAt: "2024-01-14T14:30:00Z",
      url: "#"
    }
  ],
  trumpNews: [
    {
      title: "Trump propone nuevos aranceles que afectarían exportaciones colombianas",
      description: "El candidato republicano amenaza con imponer tarifas del 25% a productos agrícolas de países que 'no cooperen' en lucha antidrogas.",
      source: { name: "Reuters" },
      publishedAt: "2024-01-15T12:00:00Z",
      url: "#"
    },
    {
      title: "Trump critica política de inmigración hacia latinoamericanos",
      description: "En mitin en Florida, el expresidente promete deportaciones masivas si regresa al poder en 2025.",
      source: { name: "AP News" },
      publishedAt: "2024-01-15T09:30:00Z",
      url: "#"
    },
    {
      title: "Encuestas muestran a Trump liderando primarias republicanas",
      description: "El expresidente mantiene ventaja de 40 puntos sobre sus competidores más cercanos en carrera presidencial.",
      source: { name: "CNN" },
      publishedAt: "2024-01-15T07:15:00Z",
      url: "#"
    },
    {
      title: "Trump anuncia plan de 'energía dominante' para Estados Unidos",
      description: "Candidato promete expandir perforación petrolera y reducir regulaciones ambientales si es elegido presidente.",
      source: { name: "Fox News" },
      publishedAt: "2024-01-14T18:45:00Z",
      url: "#"
    },
    {
      title: "Corte Suprema analiza casos legales pendientes contra Trump",
      description: "Decisiones judiciales podrían impactar calendario electoral y estrategia de campaña del candidato republicano.",
      source: { name: "BBC" },
      publishedAt: "2024-01-14T15:20:00Z",
      url: "#"
    }
  ],
  rightWingNews: [
    {
      title: "Centro Democrático presenta agenda conservadora para elecciones 2026",
      description: "Partido de oposición propone reducción de impuestos, mano dura contra delincuencia y fortalecimiento de valores familiares.",
      source: { name: "La W Radio" },
      publishedAt: "2024-01-15T11:20:00Z",
      url: "#"
    },
    {
      title: "Candidatos conservadores ganan terreno en encuestas regionales",
      description: "Políticos de derecha muestran crecimiento en intención de voto para alcaldías y gobernaciones en varias regiones.",
      source: { name: "El Colombiano" },
      publishedAt: "2024-01-15T08:50:00Z",
      url: "#"
    },
    {
      title: "Movimiento conservador organiza marchas por la familia tradicional",
      description: "Organizaciones religiosas y conservadoras convocan manifestaciones en defensa de valores tradicionales.",
      source: { name: "El Universal" },
      publishedAt: "2024-01-14T19:30:00Z",
      url: "#"
    },
    {
      title: "Propuesta conservadora busca endurecer penas por delitos graves",
      description: "Senadores de derecha presentan proyecto de ley para aumentar castigos por homicidio, secuestro y extorsión.",
      source: { name: "Vanguardia" },
      publishedAt: "2024-01-14T17:10:00Z",
      url: "#"
    },
    {
      title: "Líderes conservadores critican política económica del gobierno",
      description: "Economistas de derecha alertan sobre impacto de reformas en competitividad empresarial y empleo formal.",
      source: { name: "Portafolio" },
      publishedAt: "2024-01-14T13:45:00Z",
      url: "#"
    }
  ],
  politicsNews: [
    {
      title: "Congreso aprueba presupuesto nacional 2024 tras intensos debates",
      description: "Legisladores logran consenso sobre asignación de $350 billones para inversión social, seguridad e infraestructura.",
      source: { name: "El Heraldo" },
      publishedAt: "2024-01-15T13:15:00Z",
      url: "#"
    },
    {
      title: "Procuraduría investiga irregularidades en contratación pública",
      description: "Ente de control abre indagaciones contra funcionarios por presuntas anomalías en licitaciones estatales.",
      source: { name: "Blu Radio" },
      publishedAt: "2024-01-15T10:45:00Z",
      url: "#"
    },
    {
      title: "Corte Constitucional estudia demandas contra reforma tributaria",
      description: "Alto tribunal evalúa constitucionalidad de nuevos impuestos propuestos por el gobierno nacional.",
      source: { name: "Ámbito Jurídico" },
      publishedAt: "2024-01-15T08:20:00Z",
      url: "#"
    },
    {
      title: "Partidos políticos se preparan para elecciones regionales 2025",
      description: "Movimientos inician proceso de selección de candidatos para alcaldías, gobernaciones y concejos municipales.",
      source: { name: "La Opinión" },
      publishedAt: "2024-01-14T20:30:00Z",
      url: "#"
    },
    {
      title: "Comisión de Paz presenta informe sobre implementación de acuerdos",
      description: "Documento oficial evalúa avances y obstáculos en desarrollo de programas de reintegración y sustitución.",
      source: { name: "El Nuevo Siglo" },
      publishedAt: "2024-01-14T16:55:00Z",
      url: "#"
    }
  ]
};

export default function NewsFeed() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth user experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 sticky top-16 z-40 bg-white/80 p-4 rounded-xl shadow-lg font-['Inter']">
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">📰 Noticias sobre Gustavo Petro (Colombia)</h2>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="bg-gray-200 h-16 rounded"></div>
            <div className="bg-gray-200 h-16 rounded"></div>
            <div className="bg-gray-200 h-16 rounded"></div>
          </div>
        ) : (
          staticNewsData.colombianNews.map((article, idx) => (
            <div key={idx} 
              className="block bg-white hover:bg-blue-50 rounded-lg p-3 mb-3 shadow transition cursor-pointer">
              <div className="font-semibold text-[#EF3340] mb-1">{article.title}</div>
              <div className="text-gray-700 text-sm mt-1 leading-relaxed">{article.description}</div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span className="font-medium">{article.source?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleString('es-CO', { 
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}</span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="text-green-600">👍 234</span>
                <span className="text-blue-600">💬 89</span>
                <span className="text-orange-600">📤 156</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">🇺🇸 Donald Trump & Election Coverage</h2>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="bg-gray-200 h-16 rounded"></div>
            <div className="bg-gray-200 h-16 rounded"></div>
            <div className="bg-gray-200 h-16 rounded"></div>
          </div>
        ) : (
          staticNewsData.trumpNews.map((article, idx) => (
            <div key={idx} 
              className="block bg-white hover:bg-blue-50 rounded-lg p-3 mb-3 shadow transition cursor-pointer">
              <div className="font-semibold text-[#EF3340] mb-1">{article.title}</div>
              <div className="text-gray-700 text-sm mt-1 leading-relaxed">{article.description}</div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span className="font-medium">{article.source?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleString('en-US', { 
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}</span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="text-green-600">👍 567</span>
                <span className="text-blue-600">💬 234</span>
                <span className="text-orange-600">📤 389</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">🗳️ Right Wing & Conservative Politics</h2>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="bg-gray-200 h-16 rounded"></div>
            <div className="bg-gray-200 h-16 rounded"></div>
            <div className="bg-gray-200 h-16 rounded"></div>
          </div>
        ) : (
          staticNewsData.rightWingNews.map((article, idx) => (
            <div key={idx} 
              className="block bg-white hover:bg-orange-50 rounded-lg p-3 mb-3 shadow transition cursor-pointer">
              <div className="font-semibold text-[#E65100] mb-1">{article.title}</div>
              <div className="text-gray-700 text-sm mt-1 leading-relaxed">{article.description}</div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span className="font-medium">{article.source?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleString('es-CO', { 
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}</span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="text-green-600">👍 312</span>
                <span className="text-blue-600">💬 156</span>
                <span className="text-orange-600">📤 89</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="lg:w-1/4 w-full h-[70vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2 text-[#0033A0]">🏛️ Major Politics Events</h2>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="bg-gray-200 h-16 rounded"></div>
            <div className="bg-gray-200 h-16 rounded"></div>
            <div className="bg-gray-200 h-16 rounded"></div>
          </div>
        ) : (
          staticNewsData.politicsNews.map((article, idx) => (
            <div key={idx} 
              className="block bg-white hover:bg-blue-50 rounded-lg p-3 mb-3 shadow transition cursor-pointer">
              <div className="font-semibold text-[#EF3340] mb-1">{article.title}</div>
              <div className="text-gray-700 text-sm mt-1 leading-relaxed">{article.description}</div>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span className="font-medium">{article.source?.name}</span>
                <span>{new Date(article.publishedAt).toLocaleString('es-CO', { 
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}</span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="text-green-600">👍 423</span>
                <span className="text-blue-600">💬 198</span>
                <span className="text-orange-600">📤 87</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}