import express from "express";
import workingDateRoutes from "./routes/workingDate.routes";
import { loadHolidays } from "./utils/calendar.utils";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const baseUrl = "https://api-fechas-habiles.vercel.app/working-date";

  res.json({
    message: "🚀 API de Fechas Hábiles funcionando",
    info: "Use los parámetros `date`, `days` o `hours` en la URL para probar.",
    ejemplos: [
      {
        descripcion: "1️⃣ Viernes 5:00 p.m. + 1 hora → Lunes 9:00 a.m.",
        url: `${baseUrl}?date=2025-09-19T22:00:00.000Z&hours=1`,
      },
      {
        descripcion: "2️⃣ Sábado 2:00 p.m. + 1 hora → Lunes 9:00 a.m.",
        url: `${baseUrl}?date=2025-09-20T19:00:00.000Z&hours=1`,
      },
      {
        descripcion: "3️⃣ Martes 3:00 p.m. + 1 día + 4 horas → Jueves 10:00 a.m.",
        url: `${baseUrl}?date=2025-09-16T20:00:00.000Z&days=1&hours=4`,
      },
      {
        descripcion: "4️⃣ Domingo 6:00 p.m. + 1 día → Lunes 5:00 p.m.",
        url: `${baseUrl}?date=2025-09-21T23:00:00.000Z&days=1`,
      },
      {
        descripcion: "5️⃣ Laboral 8:00 a.m. + 8 horas → 5:00 p.m.",
        url: `${baseUrl}?date=2025-09-15T13:00:00.000Z&hours=8`,
      },
      {
        descripcion: "6️⃣ Laboral 8:00 a.m. + 1 día → siguiente día 8:00 a.m.",
        url: `${baseUrl}?date=2025-09-15T13:00:00.000Z&days=1`,
      },
      {
        descripcion: "7️⃣ Laboral 12:30 p.m. + 1 día → siguiente día 12:00 p.m.",
        url: `${baseUrl}?date=2025-09-15T17:30:00.000Z&days=1`,
      },
      {
        descripcion: "8️⃣ Laboral 11:30 a.m. + 3 horas → 3:30 p.m.",
        url: `${baseUrl}?date=2025-09-15T16:30:00.000Z&hours=3`,
      },
      {
        descripcion: "9️⃣ Caso con festivos: 10 abril 2025 3:00 p.m. + 5 días + 4 horas",
        url: `${baseUrl}?date=2025-04-10T20:00:00.000Z&days=5&hours=4`,
      },
      {
        descripcion: "🔟 Caso sin date (usa la fecha actual)",
        url: `${baseUrl}?days=1`,
      },
      {
        descripcion: "1️⃣1️⃣ Caso de error (parámetros inválidos)",
        url: `${baseUrl}?date=INVALID_DATE&days=abc`,
      },
    ],
  });
});

app.use("/", workingDateRoutes);

// Cargar festivos
(async () => {
  await loadHolidays();
})();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;

