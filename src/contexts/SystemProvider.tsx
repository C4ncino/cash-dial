import { useColorScheme } from "nativewind";
import { createContext, PropsWithChildren, useEffect, useMemo } from "react";

import {
  currentDay,
  currentMonth,
  currentWeek,
  currentYear,
} from "@/utils/dates";
import useTinybase from "@/hooks/useDatabase";
import { getCategoriesTree } from "@/utils/categories";
import { getFirstDay, needNewBudget } from "@/utils/budgets";

interface Props extends PropsWithChildren {}

export const SystemContext = createContext<SystemContextModel>({
  isDark: false,
  categories: [],
  currentDateInfo: { day: 0, week: 0, month: 0, year: 0 },
});

const SystemProvider = ({ children }: Props) => {
  const { getAll, getById, create, query } = useTinybase();
  const { colorScheme } = useColorScheme();

  const currentDateInfo = {
    day: currentDay,
    week: currentWeek,
    month: currentMonth,
    year: currentYear,
  };

  const categories = useMemo(() => {
    const categories = new Map();

    getAll("categories").forEach((id) => {
      const account = getById("categories", id);
      if (!account) return;
      categories.set(id, { id, children: [], ...account });
    });

    return getCategoriesTree(categories);
  }, []);

  const init = async () => {
    getAll("budgets").forEach((id) => {
      const budget = getById("budgets", id);
      if (!budget) return;

      const historicQuery = query(
        "historicBudgets",
        { type: "select", column: "idBudget" },
        { type: "select", column: "startDate" },
        { type: "where", column: "idBudget", value: id, operator: "==" }
      );

      let startDate = budget.startDate as number;
      const hasHistoric = historicQuery.ids.length > 0;

      if (hasHistoric) {
        const lastId = historicQuery.ids[historicQuery.ids.length - 1];
        startDate = historicQuery.results[lastId].startDate;
      }

      if (needNewBudget(budget.type, currentDateInfo, startDate, hasHistoric))
        create("historicBudgets", {
          idBudget: id,
          startDate: getFirstDay(budget.type, currentDateInfo),
          amountLimit: budget.amountLimit,
        });
    });
  };

  useEffect(() => {
    init();
  }, []);

  const systemContext = {
    isDark: colorScheme === "dark",
    categories,
    currentDateInfo,
  };

  return (
    <SystemContext.Provider value={systemContext}>
      {children}
    </SystemContext.Provider>
  );
};

export default SystemProvider;
