import { BUDGET_TYPES_ID } from "@/db/ui";
import { currentMonth, currentWeek, currentYear, getDateData, getMonthRange, getWeekRange, getYearRange } from "./dates";

export function getHistoric(type: BUDGET_TYPES_ID, historicQuery: QueryResults) {
    const historic: BudgetHistory = {};
    let currentKey = "";

    for (const [_, entry] of Object.entries(historicQuery.results)) {
        const date = new Date(entry.startDate);
        const { year, week, month } = getDateData(date);

        const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
        const weekKey = `${year}-W${String(week).padStart(2, '0')}`;


        switch (type) {
            case BUDGET_TYPES_ID.WEEKLY:
                if (currentWeek === week) currentKey = weekKey;
                historic[weekKey] = entry
                break;

            case BUDGET_TYPES_ID.MONTHLY:
                if (currentMonth === month) currentKey = monthKey;
                historic[monthKey] = entry
                break;

            case BUDGET_TYPES_ID.YEARLY:
                if (currentYear === year) currentKey = year.toString();
                historic[year.toString()] = entry
                break;
        }
    }

    return { historic, currentKey }
}

export function getIntervalFunction(type: BUDGET_TYPES_ID) {
    switch (type) {
        case BUDGET_TYPES_ID.WEEKLY:
            return getWeekRange;
        case BUDGET_TYPES_ID.MONTHLY:
            return getMonthRange;
        case BUDGET_TYPES_ID.YEARLY:
            return getYearRange;
    }
}