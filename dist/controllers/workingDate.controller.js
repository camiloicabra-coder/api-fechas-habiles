"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWorkingDate = void 0;
const workingDate_service_1 = require("../services/workingDate.service");
const calculateWorkingDate = (req, res) => {
    try {
        const { days, hours, date } = req.query;
        // Validación de parámetros obligatorios
        if (!days && !hours) {
            return res.status(400).json({
                error: "InvalidParameters",
                message: "Debe enviar al menos uno de los parámetros: days o hours",
            });
        }
        // Validar formato de 'date' solo si se envía
        if (date) {
            const parsedDate = new Date(date);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({
                    error: "InvalidParameters",
                    message: "El parámetro 'date' debe estar en formato ISO 8601 (UTC) ejemplo 2025-10-19",
                });
            }
        }
        // Si no se envía date, tomamos la fecha actual
        const baseDate = date ? date : new Date().toISOString();
        // Calcular fecha hábil
        const result = (0, workingDate_service_1.getWorkingDate)({
            days: days ? parseInt(days, 10) : 0,
            hours: hours ? parseInt(hours, 10) : 0,
            date: baseDate,
        });
        // Respuesta exitosa
        return res.status(200).json({ date: result });
    }
    catch (err) {
        console.error("Error interno:", err);
        // Ejemplo: si la dependencia externa falla
        if (String(err).includes("ServiceUnavailable")) {
            return res.status(503).json({
                error: "ServiceUnavailable",
                message: "El servicio no está disponible en este momento. Intente más tarde.",
            });
        }
        return res.status(500).json({
            error: "InternalServerError",
            message: "Ocurrió un error inesperado en el servidor",
        });
    }
};
exports.calculateWorkingDate = calculateWorkingDate;
