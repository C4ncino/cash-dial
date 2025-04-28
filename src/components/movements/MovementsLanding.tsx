import useTinybase from "@/hooks/useDatabase";

import { View, Text } from "react-native";
import Link from "../widgets/Link";

import IncomeCard from "./incomes/Card";
import ExpenseCard from "./expenses/Card";
import TransferCard from "./transfers/Card";

const MovementsLanding = () => {
  const { getById, useAll } = useTinybase();

  const getMovements = () => {
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
  };

  const movements = getMovements();

  return (
    <View className="flex-1 px-4 py-4 rounded-md bg-zinc-100 dark:bg-zinc-950">
      <Text className="text-2xl font-semibold dark:text-white pb-2">
        Movements
      </Text>

      {movements.slice(0, 3).map((movement, i) => (
        <>
          {movement.type === "in" ? (
             <IncomeCard key={i} movementId={movement.id} />
           ) : movement.type === "out" ? (
             <ExpenseCard key={i} movementId={movement.id} />
           ) : (
             <TransferCard key={i} movementId={movement.id} />
           )} 
        </>
      ))}

      <Link className="justify-end" href="/movements" label="Mostrar más" />
    </View>
  );
};

export default MovementsLanding;
