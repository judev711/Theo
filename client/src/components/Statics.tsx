import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

// Typage des données de statistiques
interface EvolutionConge {
  date: string;
  demandes: number;
}

interface StatistiquesData {
  nombrePresences: number;
  nombreCongesEnAttente: number;
  nombreAbsences: number;
  evolutionConges: EvolutionConge[];
  tauxAssiduite: number;
  tauxAbsence: number;
}

const Statistiques = () => {
  const { user } = useUser();

  const [stats, setStats] = useState<StatistiquesData>({
    nombrePresences: 0,
    nombreCongesEnAttente: 0,
    nombreAbsences: 0,
    evolutionConges: [],
    tauxAssiduite: 0,
    tauxAbsence: 0,
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/details/statistiques",
        {
          withCredentials: true,
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Présences validées" value={stats.nombrePresences} />
        <StatCard
          label="Congés en attente"
          value={stats.nombreCongesEnAttente}
        />
        <StatCard label="Absences" value={stats.nombreAbsences} />
        <StatCard label="Taux d'assiduité" value={`${stats.tauxAssiduite}%`} />
        <StatCard label="Taux d'absence" value={`${stats.tauxAbsence}%`} />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">
          Évolution des congés en attente
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          {stats.evolutionConges.length > 0 ? (
            stats.evolutionConges.map((item, index) => (
              <li key={index} className="text-sm">
                {item.date} : {item.demandes} demande(s)
              </li>
            ))
          ) : (
            <li className="text-sm">Aucune demande de congé récente.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="p-4 bg-gray-100 rounded-lg shadow">
    <div className="text-sm font-medium text-gray-600">{label}</div>
    <div className="text-xl font-bold text-gray-900">{value}</div>
  </div>
);

export default Statistiques;
