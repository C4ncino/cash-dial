import { useState } from "react";
import { router } from "expo-router";
import { View, Text } from "react-native";

import BudgetCard from "./BudgetCard";

import Link from "@/widgets/Link";
import DeleteModal from "@/widgets/DeleteModal";

import useTinybase from "@/hooks/useDatabase";
import useModal from "@/hooks/useModal";

const BudgetsCard = () => {
  const deleteModal = useModal();
  const { useAll, remove, query } = useTinybase();
  const [selectedId, setSelectedId] = useState<Id>();

  const budgets = useAll("budgets");

  const handleDelete = () => {
    remove("budgets", selectedId as Id);

    query(
      "historicBudgets",
      { type: "select", column: "idBudget" },
      { type: "where", column: "idBudget", value: selectedId, operator: "==" }
    ).ids.forEach((id) => remove("historicBudgets", id));

    deleteModal.closeModal();
  };

  return (
    <>
      <View className="w-full max-w-2xl mx-auto px-4 py-4 rounded-md bg-zinc-100 dark:bg-zinc-950">
        <Text className="text-2xl font-semibold dark:text-white pb-2">
          Presupuestos
        </Text>

        {budgets.slice(0, 3).map((id) => (
          <View
            className="border-t border-zinc-200 dark:border-zinc-700"
            key={id}
          >
            <BudgetCard
              id={id}
              onPress={() => router.push(`/budgets/${id}`)}
              onLongPress={() => {
                setSelectedId(id);
                deleteModal.openModal();
              }}
            />
          </View>
        ))}

        <Link className="justify-end" href="/budgets" label="Mostrar más" />
      </View>

      <DeleteModal
        text="Seguro que desea eliminar este presupuesto? No podrá deshacerlo."
        onDelete={handleDelete}
        {...deleteModal}
      />
    </>
  );
};

export default BudgetsCard;
