import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const COLOMBIA_TZ = "America/Bogota";

/*// Lista de festivos (ejemplo)
export const HOLIDAYS = [
  "2025-04-17",
  "2025-04-18",
];*/

// Variable global para cachear los festivos
let HOLIDAYS: string[] = [];

// Cargar festivos desde el endpoint
export const loadHolidays = async () => {
  const response = await fetch("https://content.capta.co/Recruitment/WorkingDays.json");
  const data: string[] = await response.json();
  HOLIDAYS = data;
};

export const isHoliday = (date: dayjs.Dayjs): boolean => {
  return HOLIDAYS.includes(date.format("YYYY-MM-DD"));
};

export const isBusinessDay = (date: dayjs.Dayjs): boolean => {
  const day = date.day(); // 0 domingo, 6 sábado
  return day !== 0 && day !== 6 && !isHoliday(date);
};

export const setBusinessStart = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.hour(8).minute(0).second(0).millisecond(0);
};

export const setBusinessEnd = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.hour(17).minute(0).second(0).millisecond(0);
};
