import { BUDGET_TYPES_ID } from "@/db/ui";
import {
  getDateData,
  getMonthRange,
  getWeekNumber,
  getWeekRange,
  getYearRange,
} from "./dates";

export function getHistoricKey(type: BUDGET_TYPES_ID, date: Date) {
  const { year, week, month } = getDateData(date);
  let key = "";

  switch (type) {
    case BUDGET_TYPES_ID.WEEKLY:
      key = `${year}-W${String(week).padStart(2, "0")}`;
      break;

    case BUDGET_TYPES_ID.MONTHLY:
      key = `${year}-${String(month + 1).padStart(2, "0")}`;
      break;

    case BUDGET_TYPES_ID.YEARLY:
      key = year.toString();
      break;
  }

  return key;
}

export function getHistoric(
  type: BUDGET_TYPES_ID,
  id: Id,
  query: QueryFunction
) {
  const historicQuery = query(
    "historicBudgets",
    { type: "select", column: "amountLimit" },
    { type: "select", column: "idBudget" },
    { type: "select", column: "startDate" },
    { type: "where", column: "idBudget", value: id, operator: "==" }
  );

  const historic: BudgetHistory = {};
  let prev = "";

  for (const [_, entry] of Object.entries(historicQuery.results)) {
    const date = new Date(entry.startDate);

    let key = getHistoricKey(type, date);

    historic[key] = entry;

    if (prev) {
      historic[prev].next = key;
      historic[key].prev = prev;
    }

    prev = key;
  }

  return { historic, lastKey: prev };
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

export function getIntervalModifiers(type: BUDGET_TYPES_ID, date: Date) {
  const { year, week, month } = getDateData(date);

  switch (type) {
    case BUDGET_TYPES_ID.WEEKLY:
      return [week, year];
    case BUDGET_TYPES_ID.MONTHLY:
      return [month, year];
    case BUDGET_TYPES_ID.YEARLY:
      return [year];
  }
}

export function getCategoryIds(categoryId: Id, categories: CategoryNode[]) {
  const category = categories.find((c) => c.id === categoryId);

  if (!category) return [];
  if (category.children.length === 0) return [];

  const ids: Id[] = [];

  category.children.forEach((child) => {
    if (child.id === categoryId) return;

    ids.push(child.id);

    if (child.children.length > 0)
      ids.push(...getCategoryIds(child.id, category.children));
  });

  return ids;
}

export function getBudgetExpenses(
  query: QueryFunction,
  id: Id,
  categoryIds: Id[],
  range: { start: number; end: number }
) {
  const { ids, results: _ } = query(
    "expenses",
    { type: "select", column: "date" },
    { type: "select", column: "idCategory" },
    {
      type: "where",
      column: "idCategory",
      value: id,
      operator: "==",
      or:
        categoryIds.length > 0
          ? {
              type: "where",
              column: "idCategory",
              values: categoryIds,
              operator: "==",
            }
          : undefined,
    },
    { type: "where", column: "date", operator: ">=", value: range.start },
    { type: "where", column: "date", operator: "<=", value: range.end }
  );

  return ids;
}

export function getAmount(
  query: QueryFunction,
  id: Id,
  categoryIds: Id[],
  range: { start: number; end: number }
) {
  const { ids: _, results } = query(
    "expenses",
    { type: "select", column: "date" },
    { type: "select", column: "amount" },
    { type: "select", column: "idCategory" },
    {
      type: "where",
      column: "idCategory",
      value: id,
      operator: "==",
      or:
        categoryIds.length > 0
          ? {
              type: "where",
              column: "idCategory",
              values: categoryIds,
              operator: "==",
            }
          : undefined,
    },
    { type: "where", column: "date", operator: ">=", value: range.start },
    { type: "where", column: "date", operator: "<=", value: range.end },

    { type: "group", column: "date", aggregate: "count" },
    { type: "group", column: "idCategory", aggregate: "count" },
    { type: "group", column: "amount", aggregate: "sum", as: "amountSpent" }
  );

  return results["0"] ? results["0"].amountSpent : 0;
}

export function needNewBudget(
  type: BUDGET_TYPES_ID,
  currentDateInfo: DateData,
  currentHistoricDate: number,
  isHistoric: boolean
) {
  const historicDate = getDateData(new Date(currentHistoricDate));
  const diff = isHistoric ? 2 : 1;

  switch (type) {
    case BUDGET_TYPES_ID.WEEKLY:
      if (currentDateInfo.week === historicDate.week + diff) return true;
      break;

    case BUDGET_TYPES_ID.MONTHLY:
      if (currentDateInfo.month === historicDate.month + diff) return true;
      break;

    case BUDGET_TYPES_ID.YEARLY:
      if (currentDateInfo.year === historicDate.year + diff) return true;
      break;
  }

  return false;
}

export function getFirstDay(type: BUDGET_TYPES_ID, date: DateData) {
  const { year, week, month } = date;

  switch (type) {
    case BUDGET_TYPES_ID.WEEKLY:
      const simple = new Date(year, 0, 1);
      const dayOfWeek = simple.getDay();

      const weekStart = new Date(simple);
      const diff = dayOfWeek <= 4 ? -dayOfWeek : 7 - dayOfWeek;
      weekStart.setDate(simple.getDate() + diff + (week - 2) * 7);

      return weekStart.getTime();

    case BUDGET_TYPES_ID.MONTHLY:
      return new Date(year, month - 1, 1).getTime();

    case BUDGET_TYPES_ID.YEARLY:
      return new Date(year - 1, 0, 1).getTime();
  }
}
