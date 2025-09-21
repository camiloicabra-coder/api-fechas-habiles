import express from "express";
import workingDateRoutes from "./routes/workingDate.routes";
import { loadHolidays } from "./utils/calendar.utils";

const app = express();

// Middleware
app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "API de Fechas Hábiles funcionando 🚀" });
});

// Rutas de negocio
app.use("/working-date", workingDateRoutes);

// Cargar festivos
(async () => {
  await loadHolidays();
})();

// Si estamos en local, arrancamos con app.listen
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
}

// 👉 En Vercel no usamos app.listen, solo exportamos
export default app;
