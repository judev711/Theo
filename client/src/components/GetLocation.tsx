import { useState, useEffect } from "react";

// Définition d'une zone autorisée (latitude, longitude et rayon en km)
const AUTHORIZED_ZONE = {
  lat:3.8661, // Exemple: Paris
  lon:11.5154,
  radius: 2, // Rayon autorisé en km
};

// Fonction pour calculer la distance entre deux points GPS (Haversine Formula)
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance en km
};

const useGeolocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.error("Erreur de géolocalisation:", err);
          setError("Impossible de vous atteindre.");
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  }, []);

  return { location, error };
};

export default function GeolocationComponent() {
  const { location, error } = useGeolocation();

  const isAuthorized = location
    ? haversineDistance(location.lat, location.lon, AUTHORIZED_ZONE.lat, AUTHORIZED_ZONE.lon) <= AUTHORIZED_ZONE.radius
    : false;

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md flex justify-center items-center flex-col mx-auto text-center  dark:bg-slate-700">
      {error ? (
        <p className="text-red-500 font-semibold">{error}</p>
      ) : location ? (
        <>
          <p className="text-lg font-semibold dark:text-white">
            Votre position : Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}
          </p>
          <p className={`mt-2 ${isAuthorized ? "text-green-500" : "text-red-500"} font-bold`}>
            {isAuthorized ? "✅ Vous êtes dans la zone autorisée." : "⛔ Vous êtes hors de la zone autorisée."}
          </p>
        </>
      ) : (
        <p>Obtention de la localisation...</p>
      )}
    </div>
  );
}
