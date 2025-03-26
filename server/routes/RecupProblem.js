import express from "express";
import pool from "../db.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.get("/getproblem", requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId; // Vérifie que ce champ existe bien selon ta version Clerk
    console.log("✅ Clerk ID détecté :", clerkId);

    const sqlUser = "SELECT id_user FROM utilisateur WHERE clerkId = ?";
    const [rows] = await pool.query(sqlUser, [clerkId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    const id_user = rows[0].id_user;
    const sqlproblemes = "SELECT * FROM probleme WHERE id_user = ?";
    const [problemes] = await pool.query(sqlproblemes, [id_user]);

    console.log("📦 Problèmes récupérés :", problemes);

    res.json(problemes);
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
});

export default router;
