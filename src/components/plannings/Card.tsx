import { View, Text, Pressable } from "react-native";

import NextDate from "./NextDate";
import useTinybase from "@/hooks/useDatabase";
import AmountText from "@/widgets/AmountText";
import { getUiElements } from "@/utils/categories";
import { PLANNINGS_TYPES, PLANNINGS_TYPES_ID } from "@/db/ui";

interface Props {
  id: string;
  onPress: () => void;
}

const Card = ({ id, onPress }: Props) => {
  const { useRowById, getById } = useTinybase();

  const data = useRowById("plannings", id) as Row<"plannings">;

  const recurringType =
    PLANNINGS_TYPES[data.recurringType as PLANNINGS_TYPES_ID];
  const isUnique = data.recurringType === PLANNINGS_TYPES_ID.UNIQUE;

  const account = getById("accounts", data.idAccount);

  const category = getById("categories", data.idCategory);

  if (!data || !account || !category) return null;

  const { icon, color } = getUiElements(data.idCategory, category?.idFather);

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
            {data.name}
          </Text>

          <View className="flex-row items-end">
            <AmountText
              type={data.type === 0 ? "out" : "in"}
              amount={data.amount}
              needShort={data.amount > 999_999}
              fontSize="base"
            />
            {!isUnique && (
              <Text className="text-zinc-500 pb-px mb-px">
                {"\u200A/\u200A"}
                {recurringType.name}
              </Text>
            )}
          </View>
        </View>

        <View className="flex-row justify-between ">
          <Text className="text-sm text-zinc-500">{account.name}</Text>

          <NextDate idPlanning={id} {...data} />
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
