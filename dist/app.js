"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workingDate_routes_1 = __importDefault(require("./routes/workingDate.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Ruta raíz (para verificación en Vercel)
app.get("/", (req, res) => {
    res.send(" API Fechas Hábiles corriendo en Vercel!");
});
// Rutas de la API
app.use("/working-date", workingDate_routes_1.default);
exports.default = app;
