"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWorkingDate = void 0;
const workingDate_service_1 = require("../services/workingDate.service");
const calculateWorkingDate = (req, res) => {
    try {
        const { days, hours, date } = req.query;
        if (!days && !hours) {
            return res.status(400).json({ error: "Debe enviar al menos uno de los parámetros: days o hours" });
        }
        /*if (!date) {
          return res.status(400).json({ error: "Missing date parameter" });
        }*/
        const workingDate = date
            ? new Date(date).toISOString()
            : new Date().toISOString();
        const result = (0, workingDate_service_1.getWorkingDate)({
            days: days ? parseInt(days, 10) : 0,
            hours: hours ? parseInt(hours, 10) : 0,
            date: date,
        });
        res.json({ workingDate: result });
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.calculateWorkingDate = calculateWorkingDate;
