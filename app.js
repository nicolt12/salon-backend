const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const reservasRoutes = require("./routes/reservas");
const usuariosRoutes = require("./routes/usuarios");

const app = express();

// ✅ Primero los middlewares
app.use(cors());
app.use(helmet());
app.use(express.json()); // 👈 Este debe ir antes de las rutas

// ✅ Luego las rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/reservas", reservasRoutes);

module.exports = app;