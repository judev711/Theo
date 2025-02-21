import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const PresenceConfirmation = () => {
  const { user } = useUser(); // Récupère l'utilisateur connecté via Clerk
  const [searchParams] = useSearchParams();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userId = searchParams.get("userId") || user?.id;

  useEffect(() => {
    if (!userId) {
      setMessage("Utilisateur non trouvé !");
      return;
    }

    // Demande la position GPS
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        setMessage("Impossible d'obtenir votre localisation.");
        console.error("Erreur GPS :", error);
      }
    );
  }, [userId]);

  const confirmPresence = async () => {
    if (!latitude || !longitude) {
      setMessage("Position GPS non disponible !");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://192.168.1.248:5000/api/presence/confirm-presence", {
        userId,
        lat: latitude,
        lng: longitude,
      });

      if (response.data.success) {
        setMessage("Présence confirmée avec succès !");
      } else {
        setMessage(response.data.message || "Erreur lors de la confirmation !");
      }
    } catch (error) {
      console.error("Erreur API :", error);
      setMessage("Impossible de confirmer la présence !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Confirmation de Présence</h1>
      
      {message && <p className="mt-2 text-red-500">{message}</p>}

      {latitude && longitude ? (
        <button
          onClick={confirmPresence}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Validation..." : "Confirmer ma présence"}
        </button>
      ) : (
        <p className="mt-2 text-gray-600 dark:text-gray-300">Obtention de votre position...</p>
      )}
    </div>
  );
};

export default PresenceConfirmation;
