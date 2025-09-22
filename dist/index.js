"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workingDate_routes_1 = __importDefault(require("./routes/workingDate.routes"));
const calendar_utils_1 = require("./utils/calendar.utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", workingDate_routes_1.default);
// Cargar festivos
(async () => {
    await (0, calendar_utils_1.loadHolidays)();
})();
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}
exports.default = app;
