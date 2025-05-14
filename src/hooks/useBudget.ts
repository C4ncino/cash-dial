import { useState } from "react";

import {
  getAmount,
  getBudgetExpenses,
  getCategoryIds,
  getHistoric,
  getIntervalFunction,
  getIntervalModifiers,
} from "@/utils/budgets";
import useTinybase from "./useDatabase";
import { useSystemContext } from "@/contexts/hooks";
import { getUiElements } from "@/utils/categories";
import { BUDGET_TYPES_ID } from "@/db/ui";

const useHistoric = (type: BUDGET_TYPES_ID, id: Id) => {
  const { query } = useTinybase();

  const { historic, lastKey } = getHistoric(type, id, query);

  const [currentKey, setCurrentKey] = useState<string>();
  const [hasPrev, setHasPrev] = useState(lastKey !== "");

  const getPrev = () => {
    const newKey = currentKey ? historic[currentKey].prev : lastKey;
    setCurrentKey(newKey);
    setHasPrev(historic[newKey as string].prev !== undefined);
  };
  const getNext = () => {
    setCurrentKey(historic[currentKey as string].next as string);
    setHasPrev(true);
  };

  const historicDate = currentKey && historic[currentKey].startDate;

  const modifiers = historicDate
    ? getIntervalModifiers(type, new Date(historicDate))
    : [];

  return {
    historic,
    modifiers,
    pagination: {
      hasPrev,
      currentKey,
      getPrev,
      getNext,
    },
  };
};

const useBudget = (id: Id) => {
  const { useRowById, getById, query } = useTinybase();
  const { categories } = useSystemContext();

  const budget = useRowById("budgets", id);

  if (!budget) return null;

  const category = getById("categories", budget.idCategory);
  const categoryIds = getCategoryIds(budget.idCategory, categories);

  if (!category) return null;

  const { icon, color } = getUiElements(budget.idCategory, category.idFather);

  const { historic, modifiers, pagination } = useHistoric(budget.type, id);

  const getInterval = getIntervalFunction(budget.type);

  const limits =
    modifiers && modifiers.length > 0
      ? getInterval(...modifiers)
      : getInterval();

  const expensesIds = getBudgetExpenses(query, id, categoryIds, limits);

  const amount = getAmount(query, id, categoryIds, limits);

  return {
    info: budget,
    icon,
    color,
    expensesIds,
    currentAmount: amount,
    historic,
    pagination,
  };
};

export default useBudget;
