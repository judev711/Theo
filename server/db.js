import mysql from "mysql2/promise"; // Assurez-vous d'utiliser mysql2 avec promesses
import dotenv from "dotenv";

dotenv.config();

// Créer un pool de connexions
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

// Tester la connexion
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connecté à la base de données MySQL");
    connection.release(); // Relâchez la connexion une fois que vous avez terminé
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
  }
})();

// Exporter le pool pour l'utiliser dans d'autres modules
export default pool;
