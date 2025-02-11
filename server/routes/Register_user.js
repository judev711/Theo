import { clerkClient } from "@clerk/express";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import pool from "../db.js"; // Assurez-vous que la connexion à la DB est correcte


const router = express.Router();
router.use(express.json());
router.use(clerkMiddleware());


// Route pour l'inscription de l'utilisateur
router.post("/api/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    gender,
    role,
    phonenumber,
    email,
    password,
  } = req.body;

  // Validation des champs obligatoires
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires." });
  }

  // Vérification de l'email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Format d'email invalide." });
  }

  // Vérification de la complexité du mot de passe
  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[\w!@#$%^&*()]{8,}$/;
  // if (!passwordRegex.test(password)) {
  //   return res.status(400).json({
  //     message:
  //       "Le mot de passe doit contenir au moins 8 caractères.",
  //   });
  // }

  try {
    // Log des données envoyées à Clerk pour vérification
    console.log("Données à envoyer à Clerk:", {
      firstName,
      lastName,
      emailAddresses: [{ emailAddress: email }],
      password,
      publicMetadata: { role, gender, birthDate,phonenumber },
    });

    // Création de l'utilisateur avec Clerk
    const response = await clerkClient.users.createUser({
      firstName: firstName,
      lastName: lastName,
      emailAddress: [email],
      password: password, // Requis si activé dans votre configuration
      publicMetadata: {
        role: role,
        gender: gender,
        birthDate: birthDate,
        phonenumber: phonenumber,
      },
    });

    const userId = response.id;

    // Insertion dans la base de données MySQL sans le mot de passe en clair
    await pool.query(
      "INSERT INTO utilisateur (nom, prenom, datenais, sexe, role, phonenumber, email, clerkId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        firstName,
        lastName,
        birthDate,
        gender,
        role,
        phonenumber,
        email,
        userId,
      ]
    );

    return res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur", error);

    // Gestion des erreurs Clerk
    if (error.clerkError) {
      return res.status(400).json({
        message: "Erreur lors de la création de l'utilisateur Clerk",
        details: error.errors || error.message,
      });
    }

    return res.status(500).json({
      message: "Erreur lors de l'inscription",
      error: error.message,
    });
  }
});

export default router;
