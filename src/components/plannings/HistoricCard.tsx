import { View, Text } from "react-native";
import React from "react";
import useDate from "@/hooks/useDate";
import AmountText from "../widgets/AmountText";
import { CheckCircleSolid } from "iconoir-react-native";
import colors from "tailwindcss/colors";

interface Props {
  amount: number;
  date: number;
  type: "in" | "out";
}

const HistoricCard = ({ date, amount, type }: Props) => {
  const { dateShort } = useDate(date as number);

  return (
    <View className="flex-row items-end justify-between pe-4 gap-2 border-t border-zinc-300 dark:border-zinc-700 px-2 py-1 rounded-md my-2">
      <View>
        <Text className="dark:text-white text-xl">{dateShort}</Text>
        <View className="flex-row items-center gap-1">
          <CheckCircleSolid color={colors.zinc[500]} width={18} height={18} />
          <Text className="dark:text-zinc-400 text-lg">Pagado</Text>
        </View>
      </View>
      <AmountText type={type} amount={amount} fontSize="base" />
    </View>
  );
};

export default HistoricCard;
