import colors from "tailwindcss/colors";
import { View, Text } from "react-native";
import { Minus, Plus } from "iconoir-react-native";

import { formatNumber, formatShortAmount } from "@/utils/formatters";
import { useSystemContext } from "@/contexts/hooks";

interface Props {
  type: "in" | "out" | "transfer";
  amount: number;
  needShort?: boolean;
}

const AmountText = ({ type, amount, needShort }: Props) => {
  const { isDark } = useSystemContext();

  const amountColor =
    type === "in"
      ? colors.green[500]
      : type === "out"
        ? colors.red[500]
        : isDark
          ? colors.white
          : colors.black;

  return (
    <View className="flex-row items-center">
      {type === "in" ? (
        <Plus color={amountColor} width={24} height={24} strokeWidth={2} />
      ) : (
        type === "out" && (
          <Minus color={amountColor} width={24} height={24} strokeWidth={2} />
        )
      )}
      <Text
        className="text-2xl font-semibold dark:text-white"
        style={{ color: amountColor }}
      >
        {needShort ? formatShortAmount(amount) : formatNumber(amount, 1000)}
      </Text>
    </View>
  );
};

export default AmountText;
