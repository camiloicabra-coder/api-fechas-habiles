"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workingDate_routes_1 = __importDefault(require("./routes/workingDate.routes"));
const calendar_utils_1 = require("./utils/calendar.utils");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/", workingDate_routes_1.default);
(async () => {
    await (0, calendar_utils_1.loadHolidays)(); // ⬅️ cargamos los festivos al iniciar
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})();
