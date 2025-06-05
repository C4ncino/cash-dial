import { View, Text, Pressable } from "react-native";

import useDate from "@/hooks/useDate";
import AmountText from "@/widgets/AmountText";

interface Props {
  id: Id;
  type: "in" | "out" | "transfer";
  title: string;
  Subtitle: () => JSX.Element;
  amount: number;
  date: number;
  showTime?: boolean;
  Icon: () => JSX.Element;
  onPress: (id: Id) => void;
}

const MovementCard = ({
  type,
  title,
  Subtitle,
  id,
  amount,
  date,
  showTime,
  Icon,
  onPress,
}: Props) => {
  const { dateShort, time } = useDate(date || 0);
  const textLength = title.length + amount.toString().length;

  return (
    <Pressable
      className="w-full flex-row justify-between items-center py-2 border-t border-zinc-500 dark:border-zinc-700"
      onPress={() => onPress(id)}
    >
      <View className="flex-row gap-2">
        {Icon && Icon()}
        <View className="ps-px">
          <Text className="dark:text-white text-xl font-medium">{title}</Text>
          {Subtitle && Subtitle()}
        </View>
      </View>

      <View>
        <AmountText type={type} amount={amount} needShort={textLength > 25} />
        <Text className="dark:text-zinc-400 text-sm text-right">
          {showTime ? time : dateShort}
        </Text>
      </View>
    </Pressable>
  );
};

export default MovementCard;
