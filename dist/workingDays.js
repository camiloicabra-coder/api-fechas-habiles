"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkingDate = getWorkingDate;
const axios_1 = __importDefault(require("axios"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
const TZ = "America/Bogota";
const WORK_START_AM = 8;
const WORK_END_AM = 12;
const WORK_START_PM = 13;
const WORK_END_PM = 17;
let holidays = [];
// ✅ Cargar festivos desde URL
async function loadHolidays() {
    if (holidays.length > 0)
        return;
    const url = process.env.HOLIDAYS_URL ||
        "https://content.capta.co/Recruitment/WorkingDays.json";
    const { data } = await axios_1.default.get(url);
    holidays = data.map((d) => (0, dayjs_1.default)(d).tz(TZ).format("YYYY-MM-DD"));
}
function isHoliday(date) {
    return holidays.includes(date.format("YYYY-MM-DD"));
}
function isWeekend(date) {
    const day = date.day();
    return day === 0 || day === 6;
}
function isWorkingTime(date) {
    const hour = date.hour();
    return ((hour >= WORK_START_AM && hour < WORK_END_AM) ||
        (hour >= WORK_START_PM && hour < WORK_END_PM));
}
function normalizeToWorkingTime(date) {
    let current = date.clone();
    while (isHoliday(current) || isWeekend(current) || !isWorkingTime(current)) {
        if (current.hour() >= WORK_END_PM) {
            current = current.add(1, "day").hour(WORK_START_AM).minute(0).second(0);
        }
        else if (current.hour() < WORK_START_AM) {
            current = current.hour(WORK_START_AM).minute(0).second(0);
        }
        else if (current.hour() >= WORK_END_AM && current.hour() < WORK_START_PM) {
            current = current.hour(WORK_START_PM).minute(0).second(0);
        }
        else {
            current = current.add(1, "hour");
        }
    }
    return current;
}
async function getWorkingDate(days, hours, inputDate) {
    await loadHolidays();
    let current = (0, dayjs_1.default)(inputDate).tz(TZ);
    current = normalizeToWorkingTime(current);
    while (days > 0) {
        current = current.add(1, "day").hour(WORK_START_AM).minute(0).second(0);
        if (!isWeekend(current) && !isHoliday(current)) {
            days--;
        }
    }
    let remainingHours = hours;
    while (remainingHours > 0) {
        current = current.add(1, "hour");
        if (isWorkingTime(current) && !isWeekend(current) && !isHoliday(current)) {
            remainingHours--;
        }
        else {
            current = normalizeToWorkingTime(current);
        }
    }
    return current.utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
}
