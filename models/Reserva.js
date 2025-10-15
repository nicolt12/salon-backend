const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  fecha: { type: String, required: true },
  horario: { type: String, required: true },
  mensaje: { type: String, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
}, {
  timestamps: true // agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model("Reserva", reservaSchema);