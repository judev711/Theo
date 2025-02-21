import { useState, useEffect, useRef } from "react";
import { MdNotifications } from "react-icons/md";
import axios from "axios";

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // 🔄 Récupération des notifications depuis l'API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notifications"); // Adapte l'URL de ton API
        setNotifications(response.data);
        setUnreadCount(response.data.length); // Met à jour le compteur des non lues
      } catch (error) {
        console.error("Erreur lors de la récupération des notifications", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // Vérifie toutes les 5 sec

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    setUnreadCount(0); // Réinitialise le compteur
    setShowNotifications(!showNotifications);
  };

  // Gestion du clic en dehors pour fermer la liste
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      {/* Icône de notification */}
      <div className="relative cursor-pointer" onClick={handleNotificationClick}>
        <MdNotifications className="w-7 h-7 text-white cursor-pointer dark:text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 3 ? "3+" : unreadCount}
          </span>
        )}
      </div>

      {/* Liste des notifications */}
      {showNotifications && (
        <div className="absolute top-12 right-0 w-64 dark:text-white bg-white dark:bg-gray-600 border rounded-lg shadow-lg p-3 z-50 max-h-60 overflow-auto">
          <h3 className="text-sm font-semibold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-gray-500 dark:text-white text-sm">Aucune notification</p>
          ) : (
            <ul className="space-y-2">
              {notifications.slice(0, 3).map((notif, index) => (
                <li key={index} className="text-sm border-b pb-1 last:border-none">
                  {notif}
                </li>
              ))}
              {notifications.length > 3 && (
                <li className="text-sm text-blue-500 font-semibold">
                  +{notifications.length - 3} autres
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;

