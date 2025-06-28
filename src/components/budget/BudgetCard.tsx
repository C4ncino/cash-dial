import { View, Text, Pressable } from "react-native";

import Progress from "@/widgets/Progress";
import useBudget from "@/hooks/useSimpleBudget";

interface Props {
  id: Id;
  onPress?: () => void;
  onLongPress?: () => void;
}

const BudgetCard = ({ id, onPress, onLongPress }: Props) => {
  const budget = useBudget(id);

  if (!budget) return null;

  const { info, icon, color, getAmountSpent } = budget;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="max-w-2xl mx-auto w-full py-3"
    >
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

        <Progress max={info.amountLimit} current={getAmountSpent()} />
      </View>
    </Pressable>
  );
};

export default BudgetCard;
