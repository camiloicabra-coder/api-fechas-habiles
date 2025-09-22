import express from "express";
import workingDateRoutes from "./routes/workingDate.routes";
import { loadHolidays } from "./utils/calendar.utils";

const app = express();

app.use(express.json());
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

