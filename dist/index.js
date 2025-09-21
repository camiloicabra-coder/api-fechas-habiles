"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workingDate_routes_1 = __importDefault(require("./routes/workingDate.routes"));
const calendar_utils_1 = require("./utils/calendar.utils");
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
// Ruta raíz de prueba
app.get("/", (req, res) => {
    res.json({ message: "API de Fechas Hábiles funcionando 🚀" });
});
// Tus rutas de negocio
app.use("/working-date", workingDate_routes_1.default);
// Cargamos festivos al iniciar
(async () => {
    await (0, calendar_utils_1.loadHolidays)();
})();
module.exports = app;
