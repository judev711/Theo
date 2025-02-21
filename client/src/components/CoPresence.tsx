import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react"; // Icône de chargement
import Toastify from "./Toastify";

const PresenceValidation = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handlePresence = async () => {
    if (!user) {
      toast.error("Vous devez être connecté !");
      return;
    }

    if (!navigator.geolocation) {
      toast.error(
        "La géolocalisation n'est pas supportée par votre navigateur."
      );
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.post(
            "http://localhost:5000/api/presence/confirm-presence",
            { lat: latitude, lng: longitude },
            { withCredentials: true, timeout: 50000 }
          );

          toast.success(response.data.message);
        } catch (err) {
          const errorMessage =
            axios.isAxiosError(err) && err.response?.data?.error
              ? err.response.data.error
              : "Erreur lors de l'enregistrement.";
          console.error("Erreur :", err);
          toast.error(errorMessage);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Erreur de géolocalisation :", error);
        toast.error("Impossible d'obtenir votre position.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg dark:bg-slate-700 dark:text-white">
      <Toastify />
      <h1 className="text-2xl font-bold mb-4">Validation de présence</h1>
      <button
        onClick={handlePresence}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
        {loading ? "Validation..." : "Valider la présence"}
      </button>
    </div>
  );
};

export default PresenceValidation;
