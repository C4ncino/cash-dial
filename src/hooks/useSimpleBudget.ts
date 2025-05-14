import {
  getAmount,
  getBudgetExpenses,
  getCategoryIds,
  getIntervalFunction,
} from "@/utils/budgets";
import useTinybase from "./useDatabase";
import { useSystemContext } from "@/contexts/hooks";
import { getUiElements } from "@/utils/categories";

const useBudget = (id: Id) => {
  const { useRowById, getById, query } = useTinybase();
  const { categories } = useSystemContext();

  const budget = useRowById("budgets", id);

  if (!budget) return null;

  const category = getById("categories", budget.idCategory);
  const categoryIds = getCategoryIds(budget.idCategory, categories);

  if (!category) return null;

  const { icon, color } = getUiElements(budget.idCategory, category.idFather);

  const getInterval = getIntervalFunction(budget.type);

  return {
    info: budget,
    icon,
    color,
    getAmountSpent: () => getAmount(query, id, categoryIds, getInterval()),
  };
};

export default useBudget;
