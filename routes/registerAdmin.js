const express = require("express");
const bcrypt = require("bcrypt");
console.log("🧪 Antes de importar el modelo Admin");
const Admin = require("../models/Admin.js");
console.log("✅ Modelo Admin importado");

const router = express.Router();
console.log("🛠️ Ruta /api/register-admin definida");

router.post("/", async (req, res) => {
  console.log("📩 Ruta /api/register-admin ejecutada");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Ya existe un admin registrado." });
    }

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