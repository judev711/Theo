import {  useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-hot-toast"; // Importer react-hot-toast
import { useNavigate } from "react-router-dom";
import Toastify from "./Toastify";

const COMPANY_LATITUDE = 4.084665; // Latitude de l'entreprise
const COMPANY_LONGITUDE = 9.734381; // Longitude de l'entreprise
const ALLOWED_RADIUS = 1000; // Rayon autorisé en mètres

const PresenceButton = () => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate()

  // Fonction pour calculer la distance entre deux points (Formule de Haversine)
  const getDistanceFromLatLonInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleConfirmPresence = async () => {
    if (!userId) {
      toast.error("❌ Utilisateur non authentifié.");
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          const distance = getDistanceFromLatLonInMeters(
            latitude,
            longitude,
            COMPANY_LATITUDE,
            COMPANY_LONGITUDE
          );

          if (distance > ALLOWED_RADIUS) {
            toast.error("❌ Vous êtes hors de la zone autorisée !");
            return;
          }

          setLoading(true);

          try {
            const response = await axios.post(
              "http://localhost:5000/api/presence/confirm-presence",
              {},
              { withCredentials: true }
            );

            console.log("Réponse du serveur :", response.data.message); // 🔍 Debug

            if (
              response.data.message.includes("Présence") &&
              response.data.message.includes("confirmée")
            ) {
              navigate("/admin"); // ✅ Redirection si la présence est confirmée
            }

            toast.success(`✅ ${response.data.message}`);
            setConfirmed(true);
          } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              const errorMessage =
                error.response?.data?.error ||
                "❌ Erreur lors de l'enregistrement !";
              toast.error(errorMessage);
            } else {
              toast.error("❌ Une erreur inattendue s'est produite !");
            }
          } finally {
            setLoading(false);
          }
        },
        (error: GeolocationPositionError) => {
          toast.error("❌ Impossible d'obtenir votre position.");
          console.error(error);
        }
      );
    } else {
      toast.error(
        "❌ La géolocalisation n'est pas prise en charge sur cet appareil."
      );
    }
  };
  //websocket -io
  // const { getToken} = useAuth();
  // const [socket, setSocket] = useState<Socket | null>(null);

  // useEffect(() => {
  //   const setupSocket = async () => {
  //     const token = await getToken();
  //     const newSocket = io("http://localhost:4000", {
  //       auth: { token }, // Envoie le token Clerk pour authentifier le WebSocket
  //     });

  //     newSocket.on("absence-notification", (data) => {
  //       if (data.clerkId === userId) {
  //         toast.error(data.message);
  //       }
  //     });

  //     setSocket(newSocket);

  //     return () => {
  //       newSocket.disconnect();
  //     };
  //   };

  //   setupSocket();
  // }, [getToken, userId]);

  //end websocket -io

  return (
    <div
      className="flex flex-col items-center bg-center bg-cover "
      style={{ backgroundImage: "url(./src/assets/large.jpg)" }}
    >
      <Toastify />
      <motion.button
        onClick={handleConfirmPresence}
        disabled={loading || confirmed}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center justify-center gap-2 bg-violet-500 text-white p-3 rounded transition-all duration-300 ${
          loading || confirmed
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105"
        }`}
      >
        {loading ? (
          <>
            <ImSpinner2 className="animate-spin" /> ⏳ Enregistrement...
          </>
        ) : confirmed ? (
          "✅ Présence confirmée"
        ) : (
          "📍 Confirmer Présence"
        )}
      </motion.button>
    </div>
  );
};

export default PresenceButton;
