import React, { useEffect, useState } from 'react';
import { 
  FaTimes, 
  FaBell, 
  FaCheck, 
  FaExclamationTriangle,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import useAppStore from '../stores/appStore';
import type { Notification } from '../stores/appStore';

interface NotificationItemProps {
  notification: Notification;
  onClose: (id: string) => void;
  onAction?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose, onAction }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-remove after 5 seconds for info notifications
    if (notification.type === 'info') {
      const timer = setTimeout(() => {
        onClose(notification.id);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification.id, notification.type, onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <FaCheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <FaTimesCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <FaInfoCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`transform transition-all duration-500 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className={`w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg border ${getBgColor()} p-4 mb-3`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {notification.message}
                </p>
                
                {notification.action && (
                  <button
                    onClick={() => onAction && onAction(notification.id)}
                    className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {notification.action.label}
                  </button>
                )}
              </div>
              
              <button
                onClick={() => onClose(notification.id)}
                className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              {notification.timestamp.toLocaleTimeString('es-CO', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationCenter: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    clearNotifications 
  } = useAppStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClose = (id: string) => {
    markNotificationRead(id);
  };

  const handleNotificationAction = (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification?.action?.handler) {
      notification.action.handler();
      markNotificationRead(id);
    }
  };

  return (
    <>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-200"
      >
        <FaBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Notificaciones
              </h3>
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Limpiar todo
                </button>
              )}
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {unreadCount} sin leer
              </p>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <FaBell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No hay notificaciones</p>
                <p className="text-sm">Te mantendremos informado</p>
              </div>
            ) : (
              <div className="p-2">
                {notifications.map(notification => (
                  <div key={notification.id} className="mb-2">
                    <NotificationItem
                      notification={notification}
                      onClose={handleNotificationClose}
                      onAction={handleNotificationAction}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Toast Notifications (for temporary notifications)
const ToastNotifications: React.FC = () => {
  const { notifications } = useAppStore();
  const [toastNotifications, setToastNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Show only recent unread notifications as toasts
    const recentNotifications = notifications
      .filter(n => !n.read && 
        (Date.now() - n.timestamp.getTime()) < 10000 // Last 10 seconds
      )
      .slice(0, 3); // Max 3 toasts

    setToastNotifications(recentNotifications);
  }, [notifications]);

  const removeToast = (id: string) => {
    setToastNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-24 right-4 z-50 space-y-3">
      {toastNotifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

// Hook for creating notifications
export const useNotifications = () => {
  const { addNotification } = useAppStore();

  const notify = {
    success: (title: string, message: string, action?: { label: string; handler: () => void }) => {
      addNotification({ type: 'success', title, message, read: false, action });
    },
    error: (title: string, message: string, action?: { label: string; handler: () => void }) => {
      addNotification({ type: 'error', title, message, read: false, action });
    },
    warning: (title: string, message: string, action?: { label: string; handler: () => void }) => {
      addNotification({ type: 'warning', title, message, read: false, action });
    },
    info: (title: string, message: string, action?: { label: string; handler: () => void }) => {
      addNotification({ type: 'info', title, message, read: false, action });
    }
  };

  return notify;
};

export { NotificationCenter, ToastNotifications };
export default NotificationCenter;