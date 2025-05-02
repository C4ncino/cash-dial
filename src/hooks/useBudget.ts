import { CATEGORY_COLORS, CATEGORY_ICONS, CategoryColorKey, CategoryIconKey } from '@/db/ui';
import useTinybase from './useDatabase';
import { getHistoric, getIntervalFunction } from '@/utils/budgets';
import { currentWeek, currentYear } from '@/utils/dates';

const useBudget = (id: Id) => {
    const { useRowById, getById, query } = useTinybase();

    const budget = useRowById("budgets", id);

    if (!budget) return null;

    const category = getById("categories", budget.idCategory);

    if (!category) return null;

    const icon = CATEGORY_ICONS[budget.idCategory as CategoryIconKey];
    const color =
        CATEGORY_COLORS[
        (category.idFather as CategoryColorKey) ||
        (budget.idCategory as CategoryColorKey)
        ];

    const historicQuery = query(
        "historicBudgets",
        { type: "select", column: "amountSpent" },
        { type: "select", column: "idBudget" },
        { type: "select", column: "startDate" },
        { type: "where", column: "idBudget", value: id, operator: "==" }
    );

    const { historic, currentKey } = getHistoric(budget.type, historicQuery)

    const { start, end } = getIntervalFunction(budget.type)(currentYear, currentWeek);

    const expensesQuery = query(
        "expenses",
        { type: "select", column: "date" },
        { type: "select", column: "idCategory" },
        { type: "where", column: "date", operator: ">=", value: start },
        { type: "where", column: "date", operator: "<=", value: end },
    )

    return {
        info: budget,
        icon,
        color,
        historic,
        currentKey
    }
}

export default useBudget