import { CATEGORY_COLORS, CATEGORY_ICONS, CategoryColorKey, CategoryIconKey } from '@/db/ui';
import useTinybase from './useDatabase';
import { getCategoryIds, getHistoric, getIntervalFunction } from '@/utils/budgets';
import { useSystemContext } from '@/contexts/hooks';

const useBudget = (id: Id) => {
    const { useRowById, getById, query } = useTinybase();
    const { categories } = useSystemContext()

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

    const { start, end } = getIntervalFunction(budget.type)();

    const categoryIds = getCategoryIds(budget.idCategory, categories);

    const expensesQuery = query(
        "expenses",
        { type: "select", column: "date" },
        { type: "select", column: "idCategory" },
        {
            type: "where", column: "idCategory", value: budget.idCategory, operator: "==",
            or: (categoryIds.length > 0 ? { type: "where", column: "idCategory", values: categoryIds, operator: "==" } : undefined)
        },
        { type: "where", column: "date", operator: ">=", value: start },
        { type: "where", column: "date", operator: "<=", value: end },
    );

    return {
        info: budget,
        icon,
        color,
        historic,
        currentKey,
        expensesIds: expensesQuery.ids
    }
}

export default useBudget