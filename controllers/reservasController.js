const Reserva = require("../models/Reserva");
const { validationResult } = require("express-validator");
const { enviarCorreo } = require("../utils/email");

const crearReserva = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre, fecha, horario, mensaje, email } = req.body;

  try {
    const nuevaReserva = await Reserva.create({ nombre, fecha, horario, mensaje, email });

    await enviarCorreo({
      to: process.env.EMAIL_USER,
      subject: "📥 Nueva reserva agendada",
      text: `Nueva reserva de ${nombre} para el ${fecha} a las ${horario}.`,
    });

    await enviarCorreo({
      to: email,
      subject: "✅ Confirmación de tu reserva",
      text: `Hola ${nombre}, tu reserva para el ${fecha} a las ${horario} fue registrada correctamente. ¡Gracias por elegirnos!`,
    });

    res.status(201).json(nuevaReserva);
  } catch (err) {
    console.error("Error al crear reserva:", err);
    res.status(500).json({ error: "No se pudo registrar la reserva." });
  }
};

const obtenerReservas = async (req, res) => {
  const { fecha } = req.query;

  try {
    const reservas = fecha
      ? await Reserva.find({ fecha })
      : await Reserva.find();

    res.json(reservas);
  } catch (err) {
    console.error("Error al obtener reservas:", err);
    res.status(500).json({ error: "No se pudieron obtener las reservas." });
  }
};
const eliminarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await Reserva.findByIdAndDelete(id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.status(200).json({ mensaje: "Reserva eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar reserva:", err);
    res.status(500).json({ error: "No se pudo eliminar la reserva." });
  }
};

module.exports = {
  crearReserva,
  obtenerReservas,
  eliminarReserva,
};