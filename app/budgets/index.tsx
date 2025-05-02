import { View, Text, FlatList } from "react-native";
import React from "react";
import Header from "@/components/widgets/Header";
import useModal from "@/hooks/useModal";
import CreateBudget from "@/components/budget/CreateBudget";
import useTinybase from "@/hooks/useDatabase";
import BudgetCard from "@/components/budget/BudgetCard";
import { router } from "expo-router";

const Budgets = () => {
  const { visible, openModal, closeModal } = useModal();
  const { useAll } = useTinybase();

  const budgets = useAll("budgets");

  return (
    <View>
      <Header title="Presupuestos" openModal={openModal} />

      <FlatList
        contentContainerClassName="px-5"
        data={budgets}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <BudgetCard
            id={item}
            onPress={() => router.push(`/budgets/${item}`)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="my-2 border-t border-zinc-200 dark:border-zinc-700" />
        )}
      />

      <CreateBudget visible={visible} closeModal={closeModal} />
    </View>
  );
};

export default Budgets;
