import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { MdNotifications } from "react-icons/md";

// Définir un type pour les notifications
type Notification = {
  message: string;
  timestamp: string; // Ou tout autre champ si nécessaire
};

const socket = io("http://localhost:5000"); // Adresse du backend

const NotificationIcon = () => {
  // Définir explicitement le type de notifications comme un tableau de Notification
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Écouter les notifications de WebSocket
    socket.on("absence-notification", (data: Notification) => {
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
    });

    // Nettoyage à la déconnexion
    return () => {
      socket.off("absence-notification");
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Icône de notification avec compteur */}
      <div
        onClick={handleClick}
        className="cursor-pointer p-3 rounded-full bg-blue-500 text-white"
      >
        <MdNotifications size={24} />
        {notifications.length > 0 && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
            {notifications.length}
          </div>
        )}
      </div>

      {/* Menu déroulant de notifications */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg overflow-hidden max-h-72 overflow-y-auto">
          <ul>
            {notifications.map((notif, index) => (
              <li
                key={index}
                className="border-b p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => setIsOpen(false)} // Fermer le menu après clic
              >
                <strong>{notif.message}</strong>
                <br />
                <small>{new Date(notif.timestamp).toLocaleTimeString()}</small>
              </li>
            ))}
            {notifications.length === 0 && (
              <li className="p-2 text-center text-gray-500">
                Aucune notification
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Lien vers la page de toutes les notifications */}
      {isOpen && (
        <Link
          to="/notifications"
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-blue-500"
        >
          Voir toutes les notifications
        </Link>
      )}
    </div>
  );
};

export default NotificationIcon;
