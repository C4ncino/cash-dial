import { lang, clockFormat } from "@/utils/formatters";

export function getWeekNumber(date: Date) {
  date.setHours(0, 0, 0, 0);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function getDateData(date: Date) {
  const day = date.getDate();
  const week = getWeekNumber(date);
  const month = date.getMonth();
  const year = date.getFullYear();

  return { day, week, month, year };
}

export function getYearRange(year = currentYear) {
  const start = new Date(year, 0, 1).getTime(); // 1 de enero
  const end = new Date(year + 1, 0, 1).getTime() - 1; // Fin del 31 de diciembre
  return { start, end };
}

export function getMonthRange(month = currentMonth, year = currentYear) {
  // `month` es de 0 (enero) a 11 (diciembre)
  const start = new Date(year, month, 1).getTime();
  const end = new Date(year, month + 1, 1).getTime() - 1; // Fin del último día del mes
  return { start, end };
}

export function getWeekRange(week = currentWeek, year = currentYear) {
  // Buscar el primer lunes del año ISO
  const simple = new Date(year, 0, 1);
  const dayOfWeek = simple.getDay();
  const diff = dayOfWeek <= 4 ? dayOfWeek - 1 : dayOfWeek - 8;
  const firstMonday = new Date(simple);
  firstMonday.setDate(simple.getDate() - diff);

  // Calcular fecha de inicio de la semana deseada
  const start = new Date(firstMonday);
  start.setDate(firstMonday.getDate() + (week - 1) * 7);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start: start.getTime(), end: end.getTime() };
}

export function getDayRange(timestamp: number) {
  const start = new Date(timestamp);
  const end = new Date(timestamp);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return { start: start.getTime(), end: end.getTime() };
}

export function getNextDate(
  startDate: number,
  interval: number,
  day: number,
  month?: number
) {
  const start = new Date(startDate);
  const nextDate = new Date(startDate);

  nextDate.setDate(day);

  if (month !== undefined) nextDate.setMonth(month);

  if (nextDate < start) {
    if (month === undefined) nextDate.setMonth(nextDate.getMonth() + interval);
    else nextDate.setFullYear(nextDate.getFullYear() + interval);
  }

  return nextDate.getTime();
}

const WEEK_DAYS = [0, 1, 2, 3, 4, 5, 6] as const;

export function getNextDateWeek(
  startDate: number,
  interval: number,
  day: (typeof WEEK_DAYS)[number]
) {
  if (!WEEK_DAYS.includes(day)) {
    throw new Error("Invalid day of the week");
  }

  const start = new Date(startDate);
  const currentDayOfWeek = start.getDay();
  const diff = (day + 7 - currentDayOfWeek) % 7;

  const nextDate = new Date(start);
  nextDate.setDate(start.getDate() + diff + 7 * (interval - 1));

  return nextDate.getTime();
}

export function IsToday(timestamp: number) {
  now.setHours(0, 0, 0, 0);
  return now.getTime() === new Date(timestamp).setHours(0, 0, 0, 0);
}

export function IsTomorrow(timestamp: number) {
  return (
    new Date(timestamp).setHours(0, 0, 0, 0) ===
    new Date(currentYear, currentMonth, currentDay + 1).getTime()
  );
}

export const now = new Date();
export const currentDay = now.getDate(); // 1-indexado day of month
export const currentWeek = getWeekNumber(now);
export const currentMonth = now.getMonth(); // 0-indexado: enero = 0
export const currentYear = now.getFullYear();
