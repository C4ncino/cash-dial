import colors from "tailwindcss/colors";
import { View, Text, StyleSheet } from "react-native";
import { Minus, Plus } from "iconoir-react-native";

import { formatNumber, formatShortAmount } from "@/utils/formatters";
import { useSystemContext } from "@/contexts/hooks";

interface Props {
  type: "in" | "out" | "transfer";
  amount: number;
  needShort?: boolean;
  fontSize?: "sm" | "base" | "lg" | "xl" | "2xl";
}

const AmountText = ({ type, amount, needShort, fontSize = "2xl" }: Props) => {
  const { isDark } = useSystemContext();
  const iconSize = fontSize === "2xl" ? 24 : fontSize === "sm" ? 16 : 20;

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
        <Plus
          color={amountColor}
          width={iconSize}
          height={iconSize}
          strokeWidth={2}
        />
      ) : (
        type === "out" && (
          <Minus
            color={amountColor}
            width={iconSize}
            height={iconSize}
            strokeWidth={2}
          />
        )
      )}
      <Text
        className="font-semibold dark:text-white"
        style={{ color: amountColor, ...styles[fontSize] }}
      >
        {needShort ? formatShortAmount(amount) : formatNumber(amount, 1000)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl: {
    fontSize: 20,
    lineHeight: 28,
  },
  "2xl": {
    fontSize: 24,
    lineHeight: 32,
  },
});

export default AmountText;
