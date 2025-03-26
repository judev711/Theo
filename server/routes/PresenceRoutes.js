import express from "express";
import { requireAuth } from "@clerk/express";
import pool from "../db.js";

const router = express.Router();

router.post("/confirm-presence", requireAuth(), async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    const now = new Date();
    const dateActuelle = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const heureActuelle = now.toTimeString().slice(0, 5); // HH:MM
    const dateheureActuelle = `${dateActuelle} ${heureActuelle}`; // "YYYY-MM-DD HH:MM"

    // Déterminer la période de présence
    let type_presence = null;
    let date_arrivee = null;
    let date_sortis = null;

    if (heureActuelle <= "12:00") {
      type_presence = "matin";
    } else {
      type_presence = "soir";
    }

    // Trouver l'utilisateur via clerkId
    const [users] = await pool.query(
      "SELECT id_user FROM utilisateur WHERE clerkId = ?",
      [clerkId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const id_user = users[0].id_user;

    // Vérifier s'il y a déjà une présence pour aujourd'hui et cette période
    const [existingPresence] = await pool.query(
      "SELECT id, date_arrivee, date_sortis FROM presence WHERE id_user = ? AND DATE(date_arrivee) = ? AND type_presence = ?",
      [id_user, dateActuelle, type_presence]
    );

    if (existingPresence.length > 0) {
      // Si une présence existe déjà pour cette période, on met à jour
      const presence = existingPresence[0];

      if (type_presence === "matin") {
        if (presence.date_arrivee) {
          return res
            .status(409)
            .json({ error: "Présence matin déjà confirmée." });
        }
        date_arrivee = dateheureActuelle;
      } else if (type_presence === "soir") {
        if (presence.date_sortis) {
          return res
            .status(409)
            .json({ error: "Présence soir déjà confirmée." });
        }
        date_sortis = dateheureActuelle;
      }

      // Mise à jour de la présence existante (arrivee ou sortie)
      await pool.query(
        "UPDATE presence SET date_arrivee = COALESCE(?, date_arrivee), date_sortis = COALESCE(?, date_sortis) WHERE id = ?",
        [date_arrivee, date_sortis, presence.id]
      );
       
      return res.json({
        message: `Présence ${type_presence} mise à jour.`,
        type_presence,
        date_arrivee,
        date_sortis,
      });
    } else {
      // Si aucune présence, on insère la première (arrivée matin ou sortie soir)
      let status = "absent"; // Par défaut
      if (type_presence === "matin" && heureActuelle <= "08:00") {
        status = "present";
        date_arrivee = dateheureActuelle;
      } else if (type_presence === "soir" && heureActuelle >= "17:00") {
        status = "present";
        date_sortis = dateheureActuelle;
      }

      await pool.query(
        "INSERT INTO presence (date_arrivee, date_sortis, type_presence, status, id_user) VALUES (?, ?, ?, ?, ?)",
        [date_arrivee, date_sortis, type_presence, status, id_user]
      );
      res.json({ message: "success" });
      res.json({
        message: `Présence ${type_presence} enregistrée.`,
        type_presence,
        date_arrivee,
        date_sortis,
      });
    }
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de la présence." });
  }
});

export default router;
