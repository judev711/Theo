import express from "express";
import cors from "cors";
import pool from "../db.js"; // Connexion MySQL (assurez-vous qu'elle est bien configurée)

const router = express.Router();

router.use(cors());

// 🔹 Route pour soumettre une demande de congé en récupérant l'ID utilisateur depuis MySQL
router.post("/conge", async (req, res) => {
  const { clerkId, type_conge, date_debut, date_fin, raison } = req.body;

  try {
    // 🔎 Étape 1 : Récupérer l'id_user à partir de ClerkId
    const sqlUser = "SELECT id_user FROM Utilisateur WHERE clerkId = ?";
    const [rows] = await pool.query(sqlUser, [clerkId]); // ✅ Utilisation de await, ligne de code de fer, il fait tout ⚡⚡⚡⚡⚡⚡⚡⚡⚡

    if (rows.length === 0) {
      console.warn("⚠️ Utilisateur non trouvé pour ClerkId :", clerkId);
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const userId = rows[0].id_user; // ✅ ID utilisateur récupéré
    const status = "En Attente";
    const date_emis = Date.now();

    // 🔹 Étape 2 : Insérer la demande de congé avec l'id_user récupéré
    const sqlConge =
      "INSERT INTO Conge (type_conge, date_emis, date_debut, date_fin, raison, status, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)";

    await pool.query(sqlConge, [
      type_conge,
      new Date(),
      date_debut,
      date_fin,
      raison,
      status,
      userId,
    ]); // ✅ Utilisation de await

    console.log(
      "✅ Demande de congé enregistrée avec succès pour l'utilisateur ID :",
      userId
    );
    console.log("📌 Informations de la demande de congés :", {
      type_conge,
      date_emis,
      date_debut,
      date_fin,
      raison,
      userId,
    });

    res.json({ message: "Demande de congé enregistrée avec succès !" });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});
export default router;
