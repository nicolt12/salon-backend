const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  nombre: String,
  fecha: String,
  horario: String,
  mensaje: String,
  email: String,
});

module.exports = mongoose.model("Reserva", reservaSchema);