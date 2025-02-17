import express from 'express'
import pool from '../db.js'

const router  = express.Router();
router.post("/visage", (req, res) => {
  const { clerkId, faceData } = req.body;

  if (!clerkId || !faceData) {
    return res
      .status(400)
      .json({ message: "ID Clerk ou empreinte faciale manquante" });
  }

  const faceDescriptorJson = JSON.stringify(faceData);

  // 1️⃣ Récupérer `id_user` depuis `Utilisateur` avec `ClerkId`
  pool.query(
    "SELECT id_user FROM Utilisateur WHERE ClerkId = ?",
    [clerkId],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        return res.status(500).json({ error: "Erreur interne du serveur" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const id_user = results[0].id_user;

      // 2️⃣ Insérer les données dans `Presence`
      pool.query(
        "INSERT INTO Presence (id_user, face_descriptor, status) VALUES (?, ?, 'Present')",
        [id_user, faceDescriptorJson],
        (err, result) => {
          if (err) {
            console.error("Erreur d'enregistrement :", err);
            return res.status(500).json({ error: "Erreur d'enregistrement" });
          }
          res.json({ message: "Présence enregistrée avec succès !" });
        }
      );
    }
  );
});
export default router