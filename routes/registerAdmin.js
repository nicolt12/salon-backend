const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin.js");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email inválido" });
    }

    // Validación de longitud mínima de contraseña
    if (password.length < 6) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    // Verificar si el admin ya existe
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Ya existe un admin registrado." });
    }

    // Hashear la contraseña
    const hashed = await bcrypt.hash(password, 10);
    const nuevoAdmin = new Admin({ email, password: hashed });
    await nuevoAdmin.save();

    res.status(201).json({ message: "Admin registrado correctamente." });
  } catch (err) {
    console.error("❌ Error en el registro:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;