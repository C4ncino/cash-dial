import colors from "tailwindcss/colors";
import { View, Text } from "react-native";
import { CheckCircleSolid, XmarkCircleSolid } from "iconoir-react-native";

import useDate from "@/hooks/useDate";
import AmountText from "@/widgets/AmountText";
import { PLANNING_STAGES, PLANNING_STAGES_ID, PLANNINGS_TYPES } from "@/db/ui";

interface Props {
  amount: number;
  date: number;
  status: PLANNING_STAGES_ID;
  type: "in" | "out";
}

const HistoricCard = ({ date, amount, type, status }: Props) => {
  const { dateShort } = useDate(date as number);
  const isCancelled = status === PLANNING_STAGES_ID.CANCELLED;
  const statusInfo = PLANNING_STAGES[status];

  return (
    <View className="flex-row items-end justify-between pe-4 gap-2 border-t border-zinc-300 dark:border-zinc-700 px-2 py-1 rounded-md my-2">
      <View className="relative">
        <Text
          className={`dark:text-white text-xl ${isCancelled ? "line-through" : ""}`}
        >
          {dateShort}
        </Text>

        <View className="flex-row items-center gap-1">
          {isCancelled ? (
            <XmarkCircleSolid color={colors.zinc[500]} width={18} height={18} />
          ) : (
            <CheckCircleSolid color={colors.zinc[500]} width={18} height={18} />
          )}
          <Text className="dark:text-zinc-400 text-lg">{statusInfo.name}</Text>
        </View>
      </View>
      <AmountText
        type={type}
        amount={isCancelled ? 0 : amount}
        fontSize="base"
      />
    </View>
  );
};

export default HistoricCard;
