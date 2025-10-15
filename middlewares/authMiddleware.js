const jwt = require("jsonwebtoken");
process.on("unhandledRejection", (err) => {
  console.error("❌ Error no controlado:", err);
  process.exit(1);
});
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido" });
  }
};

const soloAdmin = (req, res, next) => {
  if (req.usuario?.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado: solo admin" });
  }
  next();
};

module.exports = { verificarToken, soloAdmin };