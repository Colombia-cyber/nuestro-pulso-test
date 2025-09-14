import React from 'react';

const LiveFeed: React.FC = () => {
  const feedItems = [
    {
      id: 1,
      type: 'news',
      title: 'Reforma tributaria: Comisión Tercera aprueba ponencia',
      summary: 'La comisión dio luz verde al proyecto que busca incrementar los ingresos fiscales.',
      time: '5 min',
      source: 'El Tiempo',
      reactions: 145
    },
    {
      id: 2,
      type: 'poll',
      title: 'Nueva encuesta: Aprobación presidencial',
      summary: '¿Cómo califica la gestión del presidente este mes?',
      time: '12 min',
      source: 'Nuestro Pulso',
      reactions: 89
    },
    {
      id: 3,
      type: 'debate',
      title: 'Debate en vivo: Política ambiental',
      summary: 'Únete a la conversación sobre las nuevas políticas para el Amazonas.',
      time: '20 min',
      source: 'Chat Cívico',
      reactions: 234
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          📺 Feed en Vivo
          <span className="text-sm font-normal text-green-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            En vivo
          </span>
        </h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {feedItems.map((item) => (
          <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="text-2xl">
                {item.type === 'news' && '📰'}
                {item.type === 'poll' && '📊'}
                {item.type === 'debate' && '🗣️'}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {item.summary}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 hover:text-blue-500">
                      <span>👍</span>
                      <span>{item.reactions}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-green-500">
                      <span>💬</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-purple-500">
                      <span>🔄</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 text-center border-t border-gray-200">
        <button className="text-blue-500 hover:text-blue-600 font-medium">
          Ver más contenido
        </button>
      </div>
    </div>
  );
};

export default LiveFeed;