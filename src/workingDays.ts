import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = "America/Bogota";
const WORK_START_AM = 8;
const WORK_END_AM = 12;
const WORK_START_PM = 13;
const WORK_END_PM = 17;

let holidays: string[] = [];

// ✅ Cargar festivos desde URL
async function loadHolidays(): Promise<void> {
  if (holidays.length > 0) return;

  const url =
    process.env.HOLIDAYS_URL ||
    "https://content.capta.co/Recruitment/WorkingDays.json";
  const { data } = await axios.get(url);
  holidays = data.map((d: string) => dayjs(d).tz(TZ).format("YYYY-MM-DD"));
}

function isHoliday(date: dayjs.Dayjs): boolean {
  return holidays.includes(date.format("YYYY-MM-DD"));
}

function isWeekend(date: dayjs.Dayjs): boolean {
  const day = date.day();
  return day === 0 || day === 6;
}

function isWorkingTime(date: dayjs.Dayjs): boolean {
  const hour = date.hour();
  return (
    (hour >= WORK_START_AM && hour < WORK_END_AM) ||
    (hour >= WORK_START_PM && hour < WORK_END_PM)
  );
}

function normalizeToWorkingTime(date: dayjs.Dayjs): dayjs.Dayjs {
  let current = date.clone();

  while (isHoliday(current) || isWeekend(current) || !isWorkingTime(current)) {
    if (current.hour() >= WORK_END_PM) {
      current = current.add(1, "day").hour(WORK_START_AM).minute(0).second(0);
    } else if (current.hour() < WORK_START_AM) {
      current = current.hour(WORK_START_AM).minute(0).second(0);
    } else if (current.hour() >= WORK_END_AM && current.hour() < WORK_START_PM) {
      current = current.hour(WORK_START_PM).minute(0).second(0);
    } else {
      current = current.add(1, "hour");
    }
  }

  return current;
}

export async function getWorkingDate(
  days: number,
  hours: number,
  inputDate: string
): Promise<string> {
  await loadHolidays();

  let current = dayjs(inputDate).tz(TZ);

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
    } else {
      current = normalizeToWorkingTime(current);
    }
  }

  return current.utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
}
