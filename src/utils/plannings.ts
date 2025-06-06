import { PLANNINGS_TYPES_ID } from "@/db/ui";
import { getNextDate, getNextDateWeek } from "./dates";

export function getNextPayDate(
  recurringType: PLANNINGS_TYPES_ID,
  startDate: number,
  interval: number,
  payDays: Omit<Row<"payDaysPlannings">, "idPlanning">[]
) {
  let nextDay = 0;

  switch (recurringType) {
    case PLANNINGS_TYPES_ID.DAILY:
      if (interval > 1) return startDate;
      return startDate + 86400000 * interval;

    case PLANNINGS_TYPES_ID.WEEKLY:
      payDays.forEach(({ day }) => {
        type d = 0 | 1 | 2 | 3 | 4 | 5 | 6;

        const date = getNextDateWeek(startDate, interval, day as d);
        if ((date > startDate && date < nextDay) || nextDay === 0)
          nextDay = date;
      });
      break;

    case PLANNINGS_TYPES_ID.MONTHLY:
      payDays.forEach(({ day }) => {
        if (day === undefined) return;
        const date = getNextDate(startDate, interval, day);
        if ((date > startDate && date < nextDay) || nextDay === 0)
          nextDay = date;
      });
      break;

    case PLANNINGS_TYPES_ID.YEARLY:
      payDays.forEach(({ day, month }) => {
        if (day === undefined) return;
        const date = getNextDate(startDate, interval, day, month);
        if ((date > startDate && date < nextDay) || nextDay === 0)
          nextDay = date;
      });
      break;
  }

  return nextDay;
}
