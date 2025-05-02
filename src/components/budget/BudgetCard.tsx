import { View, Text, Pressable } from "react-native";
import React from "react";
import { BUDGET_TYPES_ID } from "@/db/ui";

import {
  currentMonth,
  currentWeek,
  currentYear,
  getDateData,
} from "@/utils/dates";
import Progress from "@/widgets/Progress";
import useBudget from "@/hooks/useBudget";

interface Props {
  id: Id;
  onPress?: () => void;
}

const BudgetCard = ({ id, onPress }: Props) => {
  const budget = useBudget(id);

  if (!budget) return null;

  const { info, historic, icon, color, currentKey } = budget;

  const amount = historic[currentKey] ? historic[currentKey].amountSpent : 0;

  return (
    <Pressable onPress={onPress} className="max-w-2xl mx-auto w-full py-3">
      <View className="w-full gap-2">
        <View className="flex-row items-center justify-between mx-4">
          <View
            className="rounded-md w-8 h-8 items-center justify-center"
            style={{ backgroundColor: color }}
          >
            {icon("#fff", 18)}
          </View>
          <Text className="dark:text-white flex-1 ps-2 font-medium text-lg">
            {info.name}
          </Text>
        </View>

        <Progress max={info.amountLimit} current={amount} />
      </View>
    </Pressable>
  );
};

export default BudgetCard;
