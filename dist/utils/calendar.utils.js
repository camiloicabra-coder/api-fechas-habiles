"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBusinessEnd = exports.setBusinessStart = exports.isBusinessDay = exports.isHoliday = exports.loadHolidays = exports.COLOMBIA_TZ = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
exports.COLOMBIA_TZ = "America/Bogota";
/*// Lista de festivos (ejemplo)
export const HOLIDAYS = [
  "2025-04-17",
  "2025-04-18",
];*/
// Variable global para cachear festivos
let HOLIDAYS = [];
// Cargar festivos desde un JSON local (no remoto)
const loadHolidays = () => {
    if (HOLIDAYS.length === 0) {
        const filePath = path_1.default.join(__dirname, "holidays.json");
        const rawData = fs_1.default.readFileSync(filePath, "utf-8");
        HOLIDAYS = JSON.parse(rawData);
    }
    return HOLIDAYS;
};
exports.loadHolidays = loadHolidays;
const isHoliday = (date) => {
    return HOLIDAYS.includes(date.format("YYYY-MM-DD"));
};
exports.isHoliday = isHoliday;
const isBusinessDay = (date) => {
    const day = date.day(); // 0 domingo, 6 sábado
    return day !== 0 && day !== 6 && !(0, exports.isHoliday)(date);
};
exports.isBusinessDay = isBusinessDay;
const setBusinessStart = (date) => {
    return date.hour(8).minute(0).second(0).millisecond(0);
};
exports.setBusinessStart = setBusinessStart;
const setBusinessEnd = (date) => {
    return date.hour(17).minute(0).second(0).millisecond(0);
};
exports.setBusinessEnd = setBusinessEnd;
