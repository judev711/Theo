import express from "express";
import { requireAuth } from "@clerk/express";
import pool from "../db.js"; // Assurez-vous que pool est bien configuré

const router = express.Router();

router.post("/confirm-presence", requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    // 🔹 Récupérer id_user depuis la base
    const [rows] = await pool.query(
      "SELECT id_user FROM utilisateur WHERE clerkId = ?",
      [clerkId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    const id_user = rows[0].id_user;
    const currentHour = new Date().getHours();
    let type_presence = "";
    let status = "present";

    // 🔹 Déterminer la période (matin ou après-midi) et le statut
    if (currentHour < 8) {
      type_presence = "matin";
    } else if (currentHour >= 8 && currentHour < 12) {
      type_presence = "matin";
      status = "absent"; // Arrivée tardive matin
    } else if (currentHour >= 12 && currentHour < 17) {
      type_presence = "soir";
    } else {
      type_presence = "soir";
      status = "absent"; // Arrivée tardive soir
    }

    // 🔹 Vérifier si l'utilisateur a déjà enregistré sa présence pour cette période
    // const [existing] = await pool.query(
    //   "SELECT id FROM presence WHERE id_user = ? AND type_presence = ? AND DATE(date_arrivee) = CURDATE()",
    //   [id_user, type_presence]
    // );

    // if (existing.length > 0) {
    //   return res
    //     .status(409)
    //     .json({
    //       error: `Vous avez déjà enregistré votre présence ce ${type_presence}.`,
    //     });
    // }

    // 🔹 Enregistrer la présence
    await pool.query(
      "INSERT INTO presence (date_arrivee, type_presence, status, id_user) VALUES (NOW(), ?, ?, ?)",
      [type_presence, status, id_user]
    );

    res.json({
      message: `Présence ${type_presence} confirmée en tant que '${status}' !`,
      type_presence: type_presence,
      status: status,
    });
  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }
});

export default router;
