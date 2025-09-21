"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workingDate_routes_1 = __importDefault(require("./routes/workingDate.routes"));
const calendar_utils_1 = require("./utils/calendar.utils");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Ruta raíz
app.get("/", (req, res) => {
    res.json({ message: "API de Fechas Hábiles funcionando 🚀" });
});
// Rutas de negocio
app.use("/working-date", workingDate_routes_1.default);
// Cargar festivos
(async () => {
    await (0, calendar_utils_1.loadHolidays)();
})();
// Si estamos en local, arrancamos con app.listen
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}
// 👉 En Vercel no usamos app.listen, solo exportamos
exports.default = app;
