#  Salon de Eventos - Backend

Este es el backend de una aplicación para gestionar reservas en un salón de eventos. Incluye autenticación de usuarios, roles, validaciones, protección de rutas y conexión con MongoDB Atlas. Está listo para producción y deploy en Render.

---

##  Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT para autenticación
- bcrypt para hasheo de contraseñas
- express-validator para validaciones
- Helmet + CORS para seguridad
- Render para deploy

---

##  Instalación

```bash
git clone https://github.com/nicolt12/salon-de-eventos.git
cd salon-de-eventos/salon-backend
npm install

Variables de entorno (.env)
PORT=5000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta



 Endpoints principales
Usuarios
- POST /api/usuarios/registro → Registro con validación
- POST /api/usuarios/login → Login con JWT
Reservas
- POST /api/reservas → Crear reserva (pública)
- GET /api/reservas → Ver reservas (pública)
- GET /api/reservas/admin → Ver reservas (solo admin con token)
- DELETE /api/reservas/:id → Eliminar reserva (solo admin)

 Validaciones
- Email válido
- Contraseña mínima de 6 caracteres
- Fecha en formato ISO (YYYY-MM-DD)
- Horario entre 10:00 y 20:00 en formato HH:00

 Seguridad
- Contraseñas hasheadas con bcrypt
- JWT para proteger rutas
- Middleware verificarToken y soloAdmin
- Helmet y CORS activados

 Deploy en Render
Incluye script start en package.json para que Render lo ejecute correctamente:
"scripts": {
  "start": "node server.js"
}



 Estructura del proyecto
salon-backend/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── app.js
├── server.js
├── .env



Autor
Nicolas Herrera
Frontend & Backend Developer
GitHub: @nicolt12

 Buenas prácticas aplicadas
- Validación de datos en rutas públicas
- Protección de rutas sensibles con roles
- Separación clara entre lógica, rutas y modelos
- Documentación lista para entrevistas técnicas


