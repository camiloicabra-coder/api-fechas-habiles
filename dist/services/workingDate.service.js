"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkingDate = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const calendar_utils_1 = require("../utils/calendar.utils");
const getWorkingDate = ({ days = 0, hours = 0, date }) => {
    const parseColombia = (d) => {
        if (!d)
            return (0, dayjs_1.default)().tz(calendar_utils_1.COLOMBIA_TZ);
        const cleaned = d.replace(/([+-]\d{2}:\d{2}|Z)$/, "").replace(/\.\d{3}$/, "");
        const formatted = (0, dayjs_1.default)(cleaned).format("YYYY-MM-DDTHH:mm:ss");
        return dayjs_1.default.tz(formatted, calendar_utils_1.COLOMBIA_TZ);
    };
    const nextBusinessStart = (dt) => {
        let n = dt.add(1, "day");
        while (!(0, calendar_utils_1.isBusinessDay)(n))
            n = n.add(1, "day");
        return (0, calendar_utils_1.setBusinessStart)(n);
    };
    let current = parseColombia(date);
    // Si no es hábil, retroceder al último hábil y colocarlo a 17:00
    if (!(0, calendar_utils_1.isBusinessDay)(current)) {
        do {
            current = current.subtract(1, "day");
        } while (!(0, calendar_utils_1.isBusinessDay)(current));
        current = (0, calendar_utils_1.setBusinessEnd)(current);
    }
    else {
        // Si está después del cierre (strict) -> siguiente inicio hábil
        if (current.hour() > 17 || (current.hour() === 17 && current.minute() > 0)) {
            current = nextBusinessStart(current);
        }
        else if (current.hour() < 8) {
            current = (0, calendar_utils_1.setBusinessStart)(current);
        }
        // Nota: 12:00 y 17:00 exactas se consideran válidas aquí; si vamos a sumar,
        // el loop de minutos gestionará el salto a las 13:00 o al siguiente día.
    }
    // Normalizar hora inicial si cae fuera de jornada
    if (current.hour() === 12 && current.minute() > 0) {
        // Ajustar a las 12:00 en punto
        current = current.hour(12).minute(0).second(0).millisecond(0);
    }
    if (current.hour() > 17) {
        // Pasado el cierre → siguiente día hábil a las 8:00
        current = (0, calendar_utils_1.setBusinessStart)(current.add(1, "day"));
        while (!(0, calendar_utils_1.isBusinessDay)(current)) {
            current = (0, calendar_utils_1.setBusinessStart)(current.add(1, "day"));
        }
    }
    // Sumar días hábiles (manteniendo hora)
    while (days > 0) {
        current = current.add(1, "day");
        if ((0, calendar_utils_1.isBusinessDay)(current))
            days--;
    }
    // Convertir horas a minutos y procesar respetando bloques (08:00-12:00, 13:00-17:00)
    let minutesToAdd = hours * 60;
    while (minutesToAdd > 0) {
        // Si estamos en almuerzo (12:xx o 12:00) → mover a 13:00 para sumar
        if (current.hour() === 12) {
            current = current.hour(13).minute(current.minute()).second(0).millisecond(0);
        }
        // Si ya estamos fuera de jornada (>=17:00 con minutos) → siguiente inicio hábil
        if (current.hour() > 17 || (current.hour() === 17 && current.minute() > 0)) {
            current = nextBusinessStart(current);
            continue;
        }
        // Determinar fin del bloque actual (si estamos antes de 12 -> 12:00, si estamos >=13 -> 17:00)
        let endOfPeriod;
        if (current.hour() < 12) {
            endOfPeriod = current.hour(12).minute(0).second(0).millisecond(0);
        }
        else {
            // incluye caso current.hour() === 12 ya tratado arriba (pasó a 13)
            endOfPeriod = current.hour(17).minute(0).second(0).millisecond(0);
        }
        const minutesAvailable = endOfPeriod.diff(current, "minute");
        if (minutesAvailable <= 0) {
            // Si no queda nada en este bloque:
            if (endOfPeriod.hour() === 12) {
                // saltar almuerzo
                current = current.hour(13).minute(current.minute()).second(0).millisecond(0);
            }
            else {
                // saltar al siguiente día hábil a las 08:00
                current = nextBusinessStart(current);
            }
            continue;
        }
        if (minutesAvailable >= minutesToAdd) {
            // Podemos consumir todo lo que falta dentro del bloque actual
            current = current.add(minutesToAdd, "minute");
            minutesToAdd = 0;
            break;
        }
        else {
            // Consumir lo que haya y saltar (a la tarde o al siguiente día)
            current = endOfPeriod;
            minutesToAdd -= minutesAvailable;
            if (endOfPeriod.hour() === 12) {
                // saltar almuerzo
                current = current.hour(13).minute(0).second(0).millisecond(0);
            }
            else {
                // saltar al siguiente día hábil 08:00
                current = nextBusinessStart(current);
            }
        }
    }
    return current.tz("UTC").format();
};
exports.getWorkingDate = getWorkingDate;
