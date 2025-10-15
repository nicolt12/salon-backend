const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  crearReserva,
  obtenerReservas,
  eliminarReserva,
} = require("../controllers/reservasController");
const { verificarToken, soloAdmin } = require("../middlewares/authMiddleware");

// Ruta protegida: solo admin con token puede ver reservas
router.get("/admin", verificarToken, soloAdmin, obtenerReservas);

// Ruta protegida: solo admin con token puede eliminar reservas
router.delete("/:id", verificarToken, soloAdmin, eliminarReserva);

// Ruta pública: crear reserva
router.post(
  "/",
  [
    body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio."),
    body("email").isEmail().withMessage("Debe ser un email válido."),
    body("fecha").isISO8601().withMessage("La fecha debe tener formato válido."),
    body("horario")
      .matches(/^([01]\d|2[0-3]):00$/)
      .withMessage("El horario debe ser HH:00 entre 10:00 y 20:00."),
    body("mensaje").trim().escape(),
  ],
  crearReserva
);

// Ruta pública (opcional): ver reservas sin token
router.get("/", obtenerReservas);

module.exports = router;