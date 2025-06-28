import colors from "tailwindcss/colors";
import { View, Text, FlatList } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Header from "@/widgets/Header";
import Progress from "@/widgets/Progress";
import EditBudget from "@/budget/EditBudget";
import Card from "@/movements/expenses/Card";
import Pagination from "@/widgets/Pagination";

import useDate from "@/hooks/useDate";
import useModal from "@/hooks/useModal";
import useBudget from "@/hooks/useBudget";

const Budget = () => {
  const { id } = useLocalSearchParams();

  if (!id) return router.back();

  const budget = useBudget(id as Id);

  if (!budget) return router.back();

  const {
    info,
    icon,
    color,
    historic,
    expensesIds,
    currentAmount,
    pagination,
  } = budget;

  const { visible, openModal, closeModal } = useModal();

  const { dateShort } = useDate(
    pagination.currentKey
      ? historic[pagination.currentKey as string].startDate
      : 0
  );

  const limit = pagination.currentKey
    ? historic[pagination.currentKey].amountLimit
    : info.amountLimit;

  return (
    <View className="max-w-xl w-full mx-auto">
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

      <Pagination
        canGoBack={pagination.hasPrev}
        canGoForward={pagination.currentKey !== undefined}
        backwards={pagination.getPrev}
        forward={pagination.getNext}
        label={pagination.currentKey ? dateShort : "Actual"}
      />

      <View className="flex-row items-center justify-between px-8">
        <Text className="dark:text-white text-2xl font-medium text-center">
          {currentAmount}
        </Text>
        <Text className="dark:text-white text-2xl font-medium text-center">
          {limit}
        </Text>
      </View>

      <View className="mx-4">
        <Progress max={limit} current={currentAmount} hideLimits />
      </View>

      <View className="flex-row items-center justify-between px-8 -mt-1">
        <Text className="text-zinc-700 dark:text-zinc-200 text-sm">
          Gastado
        </Text>
        <Text className="text-zinc-700 dark:text-zinc-200 text-sm">Límite</Text>
      </View>

      <View className="gap-1 mt-5">
        <Text className="px-5 text-zinc-700 dark:text-zinc-300 text-2xl font-medium">
          Movimientos ({expensesIds.length})
        </Text>
        <FlatList
          className="max-h-[26rem] mx-3 bg-zinc-100 dark:bg-zinc-950 rounded-md"
          contentContainerClassName="px-3"
          data={expensesIds}
          renderItem={({ item }) => (
            <Card
              movementId={item}
              onPress={() => {}}
              onLongPress={() => {}}
              setOnDelete={() => {}}
              showTime={false}
            />
          )}
        />
      </View>

      <EditBudget id={id as Id} visible={visible} closeModal={closeModal} />
    </View>
  );
};

export default Budget;
