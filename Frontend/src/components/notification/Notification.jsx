import React, { useEffect } from 'react';
import useNotificationStore from '../../zustand/useNotification';

const Notification = () => {
  const { notifications, removeNotification } = useNotificationStore((state) => ({
    notifications: state.notifications,
    removeNotification: state.removeNotification,
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        removeNotification(notifications[0].id);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [notifications, removeNotification]);

  return (
    <div className="fixed bottom-0 right-0 m-4 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-center bg-white p-4 rounded shadow-md"
          style={{ animation: 'fadeout 1s ease-out 2.5s forwards' }}
        >
          <img
            src={`/uploads/${notification.avatar}`}
            alt="avatar"
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>{notification.message}</div>
          <button
            className="ml-auto text-gray-500"
            onClick={() => removeNotification(notification.id)}
          >
            ✕
          </button>
        </div>
      ))}
      <style>{`
        @keyframes fadeout {
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;