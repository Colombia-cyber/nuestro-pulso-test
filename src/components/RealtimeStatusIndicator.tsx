import React, { useEffect, useState } from 'react';
import { useRealtime } from '../contexts/RealtimeContext.tsx';
import { connectionManager } from '../utils/realtimeUtils';

const RealtimeStatusIndicator: React.FC = () => {
  const { isOnline, onlineUsers, newsUpdates, chatMessages } = useRealtime();
  const [connectionStatus, setConnectionStatus] = useState(connectionManager.getConnectionStatus());

  useEffect(() => {
    const handleConnectionChange = (online: boolean) => {
      setConnectionStatus(connectionManager.getConnectionStatus());
    };

    connectionManager.addConnectionListener(handleConnectionChange);

    return () => {
      connectionManager.removeConnectionListener(handleConnectionChange);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 border max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-800">Estado del Sistema</h4>
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Conexión:</span>
            <span className={isOnline ? 'text-green-600' : 'text-red-600'}>
              {isOnline ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Usuarios en línea:</span>
            <span className="font-medium">{onlineUsers}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Mensajes del chat:</span>
            <span className="font-medium">{chatMessages.length}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Noticias:</span>
            <span className="font-medium">{newsUpdates.length}</span>
          </div>
          
          {connectionStatus.isReconnecting && (
            <div className="text-yellow-600 text-xs mt-2">
              🔄 Reconectando... ({connectionStatus.reconnectAttempts}/5)
            </div>
          )}
        </div>
        
        {!isOnline && (
          <button
            onClick={() => connectionManager.forceReconnect()}
            className="mt-2 w-full text-xs bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700 transition-colors"
          >
            Intentar Reconectar
          </button>
        )}
      </div>
    </div>
  );
};

export default RealtimeStatusIndicator;