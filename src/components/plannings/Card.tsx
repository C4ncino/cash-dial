import { View, Text, Pressable } from "react-native";

import NextDate from "./NextDate";
import AmountText from "@/widgets/AmountText";

import { getUiElements } from "@/utils/categories";

import useTinybase from "@/hooks/useDatabase";
import usePlanning from "@/hooks/usePlanning";

interface Props {
  id: string;
  onPress: () => void;
}

const Card = ({ id, onPress }: Props) => {
  const { getById } = useTinybase();

  const { planning, recurringType } = usePlanning(id);

  const { details, isUnique } = recurringType;

  if (!planning) return null;

  const account = getById("accounts", planning.idAccount);

  const category = getById("categories", planning.idCategory);

  if (!account || !category) return null;

  const { icon, color } = getUiElements(
    planning.idCategory,
    category?.idFather
  );

  return (
    <Pressable
      className="py-3 flex-row items-center border-t border-zinc-300 dark:border-zinc-700 gap-2"
      onPress={onPress}
    >
      <View
        className="w-12 h-12 rounded-md justify-center items-center"
        style={{ backgroundColor: color }}
      >
        {icon("#fff", 24)}
      </View>

      <View className="flex-1">
        <View className="flex-row justify-between">
          <Text className="dark:text-white font-medium text-lg">
            {planning.name}
          </Text>

          <View className="flex-row items-end">
            <AmountText
              type={planning.type === 0 ? "out" : "in"}
              amount={planning.amount}
              needShort={planning.amount > 999_999}
              fontSize="base"
            />
            {!isUnique && (
              <Text className="text-zinc-500 pb-px mb-px">
                {"\u200A/\u200A"}
                {details.name}
              </Text>
            )}
          </View>
        </View>

        <View className="flex-row justify-between ">
          <Text className="text-sm text-zinc-500">{account.name}</Text>

          <NextDate idPlanning={id} {...planning} />
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
