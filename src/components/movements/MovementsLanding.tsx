import useTinybase from "@/hooks/useDatabase";

import { View, Text } from "react-native";
import Link from "../widgets/Link";

import IncomeCard from "./incomes/Card";
import ExpenseCard from "./expenses/Card";
import TransferCard from "./transfers/Card";
import { Fragment, useState } from "react";
import useModal from "@/hooks/useModal";

const MovementsLanding = () => {
  const { getById, useAll } = useTinybase();
  const {visible, openModal, closeModal} = useModal()
  const [id, setId] = useState<Id>("");
  const [type, setType] = useState(0);

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
    <View className="w-full px-4 py-4 rounded-md bg-zinc-100 dark:bg-zinc-950">
      <Text className="text-2xl font-semibold dark:text-white pb-2">
        Movements
      </Text>

      {movements.slice(0, 3).map((movement, i) => (

        <Fragment key={i}>
          {movement.type === "out" ? (
            <ExpenseCard 
               movementId={movement.id}  
               onPress={(id: string) =>{
                 setId(id);
                 setType(0);
                 openModal();
               }}
             />
          ) : movement.type === "in" ? (
             <IncomeCard 
               movementId={movement.id}  
               onPress={(id: string) =>{
                 setId(id);
                 setType(1);
                 openModal();
               }}
             />
           ) : (
             <TransferCard 
                movementId={movement.id}  
                onPress={(id: string) =>{
                  setId(id);
                  setType(2);
                  openModal();
                }}
              />
           )} 
        </Fragment>
      ))}

      <Link className="justify-end" href="/movements" label="Mostrar más" />
    </View>
  );
};

export default MovementsLanding;
