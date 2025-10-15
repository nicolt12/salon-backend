const express = require("express");
const router = express.Router();
const { registrarUsuario, loginUsuario } = require("../controllers/usuarioController");
const { body } = require("express-validator");

router.post(
  "/registro",
  [
    body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio."),
    body("email").isEmail().withMessage("Debe ser un email válido."),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres."),
  ],
  registrarUsuario
);

router.post("/login", loginUsuario);

module.exports = router;