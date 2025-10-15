require("dotenv").config(); // carga .env
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Conectado a MongoDB");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
})
.catch((err) => {
  console.error("Error al conectar a MongoDB:", err);
});