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

    let type_presence = null;
    let status = "absent";
    let date_arrivee = null;
    let date_sortis = null;

    if (heureActuelle <= "08:00") {
      type_presence = "matin";
      status = "present";
      date_arrivee = dateheureActuelle;
    } else if (heureActuelle > "08:00" && heureActuelle < "12:00") {
      type_presence = "matin";
      status = "absent";
    } else if (heureActuelle >= "17:00") {
      type_presence = "soir";
      status = "present";
      date_sortis = dateheureActuelle;
    } else if (heureActuelle > "12:00") {
      type_presence = "soir";
      status = "absent";
      date_sortis = dateheureActuelle;
    } else {
      return res
        .status(400)
        .json({ error: "Hors des heures de travail autorisées." });
    }

    // Récupération de l'id_user via le clerkId
    const [users] = await pool.query(
      "SELECT id_user FROM utilisateur WHERE clerkId = ?",
      [clerkId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const id_user = users[0].id_user;

    // Vérifier s'il existe déjà une présence pour ce jour et cette période
    const [existingPresence] = await pool.query(
      `SELECT id, date_arrivee, date_sortis 
       FROM presence 
       WHERE id_user = ? AND DATE(date_arrivee) = ? AND type_presence = ?`,
      [id_user, dateActuelle, type_presence]
    );

    if (existingPresence.length > 0) {
      const presence = existingPresence[0];

      if (date_arrivee && presence.date_arrivee) {
        return res
          .status(409)
          .json({ error: "L'arrivée du matin a déjà été enregistrée." });
      }

      if (date_sortis && presence.date_sortis) {
        return res
          .status(409)
          .json({ error: "La sortie de l'après-midi a déjà été enregistrée." });
      }

      // Mise à jour uniquement de la colonne pertinente
      const updateQuery = `
        UPDATE presence 
        SET date_arrivee = COALESCE(?, date_arrivee),
            date_sortis = COALESCE(?, date_sortis)
        WHERE id = ?
      `;

      await pool.query(updateQuery, [date_arrivee, date_sortis, presence.id]);

      return res.json({
        message: `Mise à jour réussie pour ${type_presence}.`,
        type_presence,
        date_arrivee,
        date_sortis,
      });
    }

    // Si aucune présence n'existe pour cette période, on insère
    const insertQuery = `
      INSERT INTO presence (date_arrivee, date_sortis, type_presence, status, id_user)
      VALUES (?, ?, ?, ?, ?)
    `;

    await pool.query(insertQuery, [
      date_arrivee,
      date_sortis,
      type_presence,
      status,
      id_user,
    ]);

    res.json({
      message: `Présence ${type_presence} confirmée en tant que '${status}' !`,
      type_presence,
      date_arrivee,
      date_sortis,
    });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de la présence." });
  }
});

export default router;
