import express from "express";
import pool from "../db.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/statistiques", requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    // Récupérer id_user via ClerkId
    const [userRows] = await pool.query(
      "SELECT id_user FROM utilisateur WHERE clerkId = ?",
      [clerkId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const id_user = userRows[0].id_user;

    // Requêtes SQL
    const [presences] = await pool.query(
      `SELECT COUNT(*) AS total 
       FROM presence 
       WHERE id_user = ? AND date_arrivee IS NOT NULL AND date_sortis IS NOT NULL`,
      [id_user]
    );

    const [conges] = await pool.query(
      `SELECT COUNT(*) AS total 
       FROM conge 
       WHERE id_user = ? AND status = 'En Attente'`,
      [id_user]
    );

    const [absences] = await pool.query(
      `SELECT COUNT(*) AS total 
       FROM presence 
       WHERE id_user = ? AND date_arrivee IS NULL`,
      [id_user]
    );

    const [evolutionConges] = await pool.query(
      `SELECT DATE_FORMAT(date_emis, '%Y-%m-%d') AS date, COUNT(*) AS demandes
       FROM conge 
       WHERE id_user = ? AND status = 'En Attente'
       GROUP BY DATE(date_emis) 
       ORDER BY DATE(date_emis)`,
      [id_user]
    );

    const [totalPresences] = await pool.query(
      `SELECT COUNT(*) AS total FROM presence WHERE id_user = ?`,
      [id_user]
    );

    const totalEnregistrements = totalPresences[0]?.total || 0;

    const tauxAssiduite =
      totalEnregistrements > 0
        ? ((presences[0]?.total || 0) / totalEnregistrements) * 100
        : 0;

    const tauxAbsence =
      totalEnregistrements > 0
        ? ((absences[0]?.total || 0) / totalEnregistrements) * 100
        : 0;

    res.json({
      nombrePresences: presences[0]?.total || 0,
      nombreCongesEnAttente: conges[0]?.total || 0,
      nombreAbsences: absences[0]?.total || 0,
      evolutionConges,
      tauxAssiduite: tauxAssiduite.toFixed(2),
      tauxAbsence: tauxAbsence.toFixed(2),
    });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res
      .status(500)
      .json({
        error: "Erreur serveur lors de la récupération des statistiques",
      });
  }
});

export default router;
