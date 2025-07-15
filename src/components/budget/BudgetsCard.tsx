import { useEffect, useState } from "react";
import { router } from "expo-router";
import { View, Text } from "react-native";

import BudgetCard from "./BudgetCard";

import Link from "@/widgets/Link";
import ConfirmationModal from "@/widgets/ConfirmationModal";

import useModal from "@/hooks/useModal";
import useTinybase from "@/hooks/useDatabase";
import { useSystemContext } from "@/contexts/hooks";
import {
  getAmount,
  getCategoryIds,
  getIntervalFunction,
} from "@/utils/budgets";

const BudgetsCard = () => {
  const deleteModal = useModal();
  const { useAll, remove, query, getById } = useTinybase();
  const [selectedId, setSelectedId] = useState<Id>();
  const [criticalBudgets, setCriticalBudgets] = useState<Id[]>([]);
  const { categories } = useSystemContext();

  const budgets = useAll("budgets");
  const _ = useAll("expenses");

  useEffect(() => {
    if (!budgets) return;

    const relations: Array<{ id: Id; relation: number }> = [];

    budgets.forEach((id) => {
      const budget = getById("budgets", id);
      if (!budget) return;
      const categoryIds = getCategoryIds(budget.idCategory, categories);
      const getInterval = getIntervalFunction(budget.type);

      const amount = getAmount(
        query,
        budget.idCategory,
        categoryIds,
        getInterval()
      );

      relations.push({ id, relation: amount / budget.amountLimit });
    });

    relations.sort((a, b) => b.relation - a.relation);

    setCriticalBudgets(relations.slice(0, 3).map((r) => r.id));
  }, [budgets]);

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

        {criticalBudgets.map((id) => (
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

      <ConfirmationModal
        onConfirm={handleDelete}
        text="Seguro que desea eliminar este presupuesto? No podrá deshacerlo."
        {...deleteModal}
      />
    </>
  );
};

export default BudgetsCard;
