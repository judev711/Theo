// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// const ConfirmPresence: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const userId = searchParams.get("userId");
//   const lat = searchParams.get("lat");
//   const lng = searchParams.get("lng");
//   const [status, setStatus] = useState<string | null>(null);

//   useEffect(() => {
//     if (!userId || !lat || !lng) {
//       setStatus("Données invalides !");
//       return;
//     }

//     // 🔥 Envoyer la confirmation au backend
//     fetch("http://192.168.1.248:5000/Api/presence/confirm-presence", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setStatus("Présence validée avec succès !");
//         } else {
//           setStatus(data.message || "Erreur lors de la validation.");
//         }
//       })
//       .catch(() => setStatus("Erreur de connexion au serveur."));
//   }, [userId, lat, lng]);

//   return (
//     <div className="container">
//       <h2>Confirmation de Présence</h2>
//       <p>{status ? status : "Validation en cours..."}</p>
//     </div>
//   );
// };

// export default ConfirmPresence;
