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

interface Props extends PropsWithChildren {}

export const SystemContext = createContext<SystemContextModel>({
  isDark: false,
  categories: [],
  currentDateInfo: { day: 0, week: 0, month: 0, year: 0 },
});

const SystemProvider = ({ children }: Props) => {
  const { getAll, getById } = useTinybase();
  const { colorScheme } = useColorScheme();

  const categories = useMemo(() => {
    const categories = new Map();

    getAll("categories").forEach((id) => {
      const account = getById("categories", id);
      if (!account) return;
      categories.set(id, { id, children: [], ...account });
    });

    return getCategoriesTree(categories);
  }, []);

  const init = async () => {};

  useEffect(() => {
    init();
  }, []);

  const systemContext = {
    isDark: colorScheme === "dark",
    categories,
    currentDateInfo: {
      day: currentDay,
      week: currentWeek,
      month: currentMonth,
      year: currentYear,
    },
  };

  return (
    <SystemContext.Provider value={systemContext}>
      {children}
    </SystemContext.Provider>
  );
};

export default SystemProvider;
