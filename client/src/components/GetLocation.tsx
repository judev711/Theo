import { useState, useEffect } from "react";

const AUTHORIZED_ZONE = {
  lat: 4.084965,
  lon: 9.734690,
  radius: 2, // Rayon autorisé en km
};

// Fonction pour calculer la distance entre deux points GPS (Haversine Formula)
const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const useGeolocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError(null);
          setLoading(false);
        },
        (err) => {
          console.error("Erreur de géolocalisation:", err);
          setError(
            "Impossible d'obtenir votre position. Veuillez activer la localisation."
          );
          setLoading(false);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return { location, error, loading, fetchLocation };
};

export default function GeolocationComponent() {
  const { location, error, loading, fetchLocation } = useGeolocation();

  const isAuthorized = location
    ? haversineDistance(
        location.lat,
        location.lon,
        AUTHORIZED_ZONE.lat,
        AUTHORIZED_ZONE.lon
      ) <= AUTHORIZED_ZONE.radius
    : false;

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto text-center dark:bg-slate-700 flex flex-col items-center">
      {loading ? (
        <p className="text-blue-500 font-semibold">
          📡 Obtention de la localisation...
        </p>
      ) : error ? (
        <p className="text-red-500 font-semibold">{error}</p>
      ) : location ? (
        <>
          <p className="text-lg font-semibold dark:text-white">
            📍 Latitude: {location.lat.toFixed(6)}
          </p>
          <p className="text-lg font-semibold dark:text-white">
            📍 Longitude: {location.lon.toFixed(6)}
          </p>
          <p
            className={`mt-2 ${
              isAuthorized ? "text-green-500" : "text-red-500"
            } font-bold`}
          >
            {isAuthorized
              ? "✅ Vous êtes dans la zone autorisée."
              : "⛔ Vous êtes hors de la zone autorisée."}
          </p>
        </>
      ) : null}

      <button
        onClick={fetchLocation}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800"
      >
        🔄 Actualiser la position
      </button>
    </div>
  );
}
