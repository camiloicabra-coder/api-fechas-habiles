import express from "express";
import workingDateRoutes from "./routes/workingDate.routes";

const app = express();

app.use(express.json());

// Ruta raíz (para verificación en Vercel)
app.get("/", (req, res) => {
  res.send(" API Fechas Hábiles corriendo en Vercel!");
});

// Rutas de la API
app.use("/working-date", workingDateRoutes);

export default app;
