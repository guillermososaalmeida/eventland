//!-------------------------------------ABAJO EL DE LAURA--------------
const cors = require("cors");

const express = require("express");

const dotenv = require("dotenv");

dotenv.config();

const { connect } = require("./src/utils/db");
connect();

const { configCloudinary } = require("./src/middleware/files.middleware");

configCloudinary();

const PORT = process.env.PORT;

//Creamos el servidor
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
//limitaciones

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//RUTAS

const UserRoutes = require("./src/api/routes/User.routes");
const CityRoutes = require("./src/api/routes/City.routes");
const CommentsRoutes = require("./src/api/routes/Commets.routes");
const EstablishmentRoutes = require("./src/api/routes/Establishment.routes");
const EventRoutes = require("./src/api/routes/Event.routes");
const OrganizationRoutes = require("./src/api/routes/Organization.routes");

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/cities", CityRoutes);
app.use("/api/v1/comments", CommentsRoutes);
app.use("/api/v1/establishments", EstablishmentRoutes);
app.use("/api/v1/events", EventRoutes);
app.use("/api/v1/organizations", OrganizationRoutes);

app.use("*", (req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  return next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Error inesperado");
});

//Evita que se revelen las tecnologías
app.disable("x-powered-by");

app.listen(PORT, () => {
  console.log(
    `Servidor escuchando en el puerto: ${PORT}, en http://localhost:${PORT}`,
  );
});
