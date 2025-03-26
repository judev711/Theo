import express from "express";
import pool from "../db.js"; // Connexion MySQL (assurez-vous qu'elle est bien configurée)


const router = express.Router();

// 🔹 Route pour soumettre une demande de congé en récupérant l'ID utilisateur depuis MySQL
router.post("/problem", async (req, res) => {
  const { clerkId, description } = req.body;

  try {
    // 🔎 Étape 1 : Récupérer l'id_user à partir de ClerkId
    const sqlUser = "SELECT id_user FROM utilisateur WHERE clerkId = ?";
    const [rows] = await pool.query(sqlUser, [clerkId]); // ✅ Utilisation de await, ligne de code de fer, il fait tout ⚡⚡⚡⚡⚡⚡⚡⚡⚡

    if (rows.length === 0) {
      console.warn("⚠️ Utilisateur non trouvé pour ClerkId :", clerkId);
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const userId = rows[0].id_user; // ✅ ID utilisateur récupéré
    const status = "Non resolu";
    const date_signal = Date.now();

    // 🔹 Étape 2 : Insérer la demande de congé avec l'id_user récupéré
    const sqlProblem =
      "INSERT INTO probleme (description, status, date_signale, id_user) VALUES (?, ?, ?, ?)";

    await pool.query(sqlProblem, [description, status, new Date(), userId]); // ✅ Utilisation de await

    console.log(
      "✅ Probleme Soumis enregistrée avec succès pour l'utilisateur ID :",
      userId
    );
    console.log("📌 Informations du Probleme Poser :", {
      description,
      status,
      date_signal,
      userId,
    });

    res.json({ message: "Votre preoccupation a bien ete pris en compte" });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
export default router;
