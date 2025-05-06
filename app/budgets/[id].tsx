import { View, Text, FlatList } from "react-native";

import Header from "@/components/widgets/Header";
import colors from "tailwindcss/colors";
import { router, useLocalSearchParams } from "expo-router";
import useBudget from "@/hooks/useBudget";
import Progress from "@/components/widgets/Progress";
import EditBudget from "@/components/budget/EditBudget";
import useModal from "@/hooks/useModal";
import Card from "@/components/movements/expenses/Card";

const Budget = () => {
  const { id } = useLocalSearchParams();

  if (!id) return router.back();

  const budget = useBudget(id as Id);

  if (!budget) return router.back();

  const { info, icon, color, historic, currentKey, expensesIds } = budget;
  const { visible, openModal, closeModal } = useModal();

  const amount = historic[currentKey] ? historic[currentKey].amountSpent : 0;

  const e = [
    ...expensesIds,
    ...expensesIds,
    ...expensesIds,
    ...expensesIds,
    ...expensesIds,
  ];

  return (
    <View>
      <Header
        title=""
        openModal={openModal}
        buttonTitle="Editar"
        buttonColor={colors.blue[500]}
      />
      <View className="mb-4">
        <View
          className="rounded-md items-center justify-center mx-auto"
          style={{ backgroundColor: color, padding: 12 }}
        >
          {icon("#fff", 48)}
        </View>
        <Text className="dark:text-white text-2xl font-semibold text-center mt-1">
          {info.name}
        </Text>
      </View>

      <Text className="dark:text-white text-lg font-medium text-center">
        {amount} / {info.amountLimit}
      </Text>

      <View className="mx-4">
        <Progress max={info.amountLimit} current={amount} hideLimits />
      </View>

      <View className="gap-1 mt-4">
        <Text className="px-5 text-zinc-700 dark:text-zinc-300 text-2xl font-medium">
          Movimientos ({e.length})
        </Text>
        <FlatList
          className="max-h-[26rem] mx-3 bg-zinc-100 dark:bg-zinc-950 rounded-md"
          contentContainerClassName="px-3"
          data={e}
          renderItem={({ item }) => (
            <Card movementId={item} onPress={() => {}} />
          )}
        />
      </View>

      <EditBudget id={id as Id} visible={visible} closeModal={closeModal} />
    </View>
  );
};

export default Budget;
