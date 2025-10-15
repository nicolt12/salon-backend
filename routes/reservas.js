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
 body("horario").custom((value) => {
  const hora = parseInt(value.split(":")[0]);
  if (hora < 10 || hora > 20) {
    throw new Error("El horario debe estar entre 10:00 y 20:00.");
  }
  return true;
}),
    body("mensaje").trim().escape(),
  ],
  crearReserva
);

// Ruta pública (opcional): ver reservas sin token
router.get("/", obtenerReservas);

module.exports = router;