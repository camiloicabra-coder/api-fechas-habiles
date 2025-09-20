import express from "express";
import workingDateRoutes from "./routes/workingDate.routes";
import { loadHolidays } from "./utils/calendar.utils";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", workingDateRoutes);

(async () => {
  await loadHolidays(); //  cargamos los festivos al iniciar

  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
})();
