export function getWeekNumber(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
        (date.getTime() - firstDayOfYear.getTime()) / 86400000;
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
    const diff = (dayOfWeek <= 4 ? dayOfWeek - 1 : dayOfWeek - 8);
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

export const now = new Date();
export const currentDay = now.getDate();
export const currentWeek = getWeekNumber(now);
export const currentMonth = now.getMonth(); // 0-indexado: enero = 0
export const currentYear = now.getFullYear();