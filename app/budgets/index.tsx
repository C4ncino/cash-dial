import { useState } from "react";
import { router } from "expo-router";
import { View, FlatList } from "react-native";

import Header from "@/widgets/Header";
import BudgetCard from "@/budget/BudgetCard";
import ConfirmationModal from "@/widgets/ConfirmationModal";
import CreateBudget from "@/budget/CreateBudget";

import useModal from "@/hooks/useModal";
import useTinybase from "@/hooks/useDatabase";

const Budgets = () => {
  const createModal = useModal();
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
    <View>
      <Header title="Presupuestos" openModal={createModal.openModal} />

      <FlatList
        contentContainerClassName="px-5"
        data={budgets}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <BudgetCard
            id={item}
            onPress={() => router.push(`/budgets/${item}`)}
            onLongPress={() => {
              setSelectedId(item);
              deleteModal.openModal();
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="my-2 border-t border-zinc-200 dark:border-zinc-700" />
        )}
      />

      <CreateBudget {...createModal} />
      <ConfirmationModal
        onConfirm={handleDelete}
        text="Seguro que desea eliminar este presupuesto? No podrá deshacerlo."
        {...deleteModal}
      />
    </View>
  );
};

export default Budgets;
