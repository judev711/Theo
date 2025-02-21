import express from "express";
import pool from "../db.js";
import { requireAuth } from "@clerk/express"; // Middleware Clerk

const router = express.Router();

// 🏢 Coordonnées de l'entreprise
const COMPANY_LAT = 3.8661;
const COMPANY_LNG = 11.5154;

// 📌 Fonction pour déterminer si c'est une présence du matin ou du soir
const getPresenceType = () => {
  const hours = new Date().getHours();
  return hours < 12 ? "matin" : "soir";
};

// 📌 Fonction de calcul de distance avec Haversine
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance en km
};

// 📌 Vérification de la distance
const isWithinDistance = (lat, lng) => {
  const distance = haversineDistance(lat, lng, COMPANY_LAT, COMPANY_LNG);
  console.log(`📏 Distance calculée : ${distance.toFixed(2)} km`);
  return distance <= 1; // Seuil de 1 km
};

// 🔖 Confirmation de présence via un bouton
router.post("/confirm-presence", requireAuth, async (req, res) => {
  console.log("✅ Requête reçue:", req.body);
  const { userId } = req.auth;
  const { lat, lng } = req.body;

  if (!userId || !lat || !lng) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);

  if (!isWithinDistance(userLat, userLng)) {
    return res
      .status(403)
      .json({ error: "Vous n'êtes pas dans la zone autorisée !" });
  }

  try {
    // 🔖 Vérification de l'utilisateur dans la base MySQL
    const [userRows] = await pool.query(
      "SELECT id_user FROM utilisateur WHERE clerkId = ?",
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ error: "Utilisateur introuvable !" });
    }

    const id_user = userRows[0].id_user;

    // 🔖 Enregistrement de la présence en base de données (sans latitude et longitude)
    const presenceType = getPresenceType();
    await pool.query(
      "INSERT INTO presence (date_arrivee, type_presence, status, id_user) VALUES (NOW(), ?, ?, ?)",
      [presenceType, "present", id_user]
    );

    console.log(`✅ Présence enregistrée : ${userId} (${presenceType})`);
    res.json({ success: true, message: "Présence enregistrée avec succès !" });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de la présence" });
  }
});

export default router;
