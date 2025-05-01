import { useCallback } from "react";

import useTinybase from "./useDatabase";

const useMovements = <T>(formatter?: (data: Movement[]) => T): Movement[] | T => {

    const { getById, useAll } = useTinybase();

    const getMovements = useCallback(() => {
        const movements: Movement[] = [];
        const expenses = useAll("expenses");
        const incomes = useAll("incomes");
        const transfers = useAll("transfers");

        expenses.forEach((id) => {
            const expense = getById("expenses", id);
            if (expense)
                movements.push({
                    id,
                    type: "out",
                    date: expense.date,
                });
        });

        incomes.forEach((id) => {
            const income = getById("incomes", id);
            if (income)
                movements.push({
                    id,
                    type: "in",
                    date: income.date,
                });
        });

        transfers.forEach((id) => {
            const transfer = getById("transfers", id);
            if (transfer)
                movements.push({
                    id,
                    type: "transfer",
                    date: transfer.date,
                });
        });

        return movements.sort((a, b) => b.date - a.date);
    }, []);

    return formatter ? formatter(getMovements()) : getMovements();
}

export default useMovements