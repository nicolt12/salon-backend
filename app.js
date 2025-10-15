const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const reservasRoutes = require("./routes/reservas");
const usuariosRoutes = require("./routes/usuarios");
const morgan = require("morgan");

const app = express(); // ✅ Primero se declara 'app'

app.use(morgan("dev")); // ✅ Ahora sí se puede usar
app.use(cors({
  origin: [
    "https://salon-de-eventos.vercel.app", // tu frontend en Vercel
    "http://localhost:5173"                // para desarrollo local con Vite
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(helmet());
app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/reservas", reservasRoutes);

// ✅ Ruta 404 al final
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = app;