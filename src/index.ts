import express from "express";
import workingDateRoutes from "./routes/workingDate.routes";
import { loadHolidays } from "./utils/calendar.utils";

const app = express();

// Middlewares
app.use(express.json());

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.json({ message: "API de Fechas Hábiles funcionando 🚀" });
});

// Tus rutas de negocio
app.use("/working-date", workingDateRoutes);

// Cargamos festivos al iniciar
(async () => {
  await loadHolidays();
})();

export default app;
