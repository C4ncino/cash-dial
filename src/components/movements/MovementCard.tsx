import { View, Text, Pressable } from "react-native";
import React from "react";
import useDate from "@/hooks/useDate";
import colors from "tailwindcss/colors";
import { Minus, Plus } from "iconoir-react-native";

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
  const amountColor =
    type === "in"
      ? colors.green[500]
      : type === "out"
        ? colors.red[500]
        : colors.white;

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
        <View className="flex-row items-center justify-end">
          {type === "in" ? (
            <Plus color={amountColor} width={24} height={24} strokeWidth={2} />
          ) : (
            type === "out" && (
              <Minus
                color={amountColor}
                width={24}
                height={24}
                strokeWidth={2}
              />
            )
          )}
          <Text
            className="text-3xl font-semibold"
            style={{ color: amountColor }}
          >
            {amount}
          </Text>
        </View>
        <Text className="dark:text-zinc-400 text-sm text-right">
          {showTime ? time : dateShort}
        </Text>
      </View>
    </Pressable>
  );
};

export default MovementCard;
