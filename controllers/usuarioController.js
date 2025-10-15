const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) return res.status(400).json({ error: "El usuario ya existe" });

    const nuevoUsuario = new Usuario({ nombre, email, password, rol });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (err) {
     console.error("Error al registrar usuario:", err);

    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

const loginUsuario = async (req, res) => {
   console.log("📩 Login recibido:", req.body);

  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.compararPassword(password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
  {
    id: usuario._id,
    rol: usuario.rol,
    nombre: usuario.nombre, 
  },
  process.env.JWT_SECRET,
  { expiresIn: "2h" }
);

    res.json({ token, rol: usuario.rol, nombre: usuario.nombre });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = { registrarUsuario, loginUsuario };