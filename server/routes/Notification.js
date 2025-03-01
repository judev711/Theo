import express from "express";
import http from "http";
import { Server } from "socket.io";
import { requireAuth } from "@clerk/express";
import pool from "./db.js";
import { sendAbsenceNotification } from "./utils/notifications.js"; // Pour les emails (si besoin)

const router = express.Router();
const server = http.createServer(app);
const io = new Server(server);

// Authentification WebSocket
io.use((socket, next) => {
  const token = socket.handshake.auth.token; // Récupérer le token d'authentification (si tu l'envoies depuis le frontend)

  // Vérifier le token avec Clerk
  requireAuth(token, (err, user) => {
    if (err) {
      return next(new Error("Unauthorized"));
    }
    socket.user = user; // Stocke l'utilisateur dans le socket pour pouvoir l'utiliser plus tard
    next();
  });
});

// Connection WebSocket
io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté via WebSocket", socket.user);

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté", socket.user);
  });
});

// Tâche cron pour notifier via WebSocket
async function sendAbsenceNotifications() {
  try {
    const [absentsMatin] = await pool.query(`
      SELECT email, clerkId FROM utilisateur u
      LEFT JOIN presence p 
      ON u.id_user = p.id_user 
      AND p.type_presence = 'matin' 
      AND DATE(p.date_arrivee) = CURDATE()
      WHERE p.id IS NULL;
    `);

    for (const user of absentsMatin) {
      // Envoi de l'email (si nécessaire)
      await sendAbsenceNotification(user.email, "matin");

      // Envoi de la notification via WebSocket à un utilisateur spécifique
      io.emit("absence-notification", {
        message: `Vous êtes absent le matin. Veuillez justifier votre absence.`,
        clerkId: user.clerkId,
      });
    }

    const [absentsSoir] = await pool.query(`
      SELECT email, clerkId FROM utilisateur u
      LEFT JOIN presence p 
      ON u.id_user = p.id_user 
      AND p.type_presence = 'apres_midi' 
      AND DATE(p.date_sortis) = CURDATE()
      WHERE p.id IS NULL;
    `);

    for (const user of absentsSoir) {
      // Envoi de l'email (si nécessaire)
      await sendAbsenceNotification(user.email, "soir");

      // Envoi de la notification via WebSocket à un utilisateur spécifique
      io.emit("absence-notification", {
        message: `Vous êtes absent le soir. Veuillez justifier votre absence.`,
        clerkId: user.clerkId,
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'exécution du cron:", error);
  }
}

// Exécution de la tâche toutes les heures
setInterval(sendAbsenceNotifications, 3600000);

export default router;
