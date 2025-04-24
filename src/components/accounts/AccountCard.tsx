import { View, Text, Pressable } from "react-native";

import { ACCOUNT_TYPES, ACCOUNT_TYPES_ID } from "@/db/ui";
import useDatabase from "@/hooks/useDatabase";
import { formatNumber, hyphenateText } from "@/utils/formatters";

interface Props {
  id: string;
  onPress?: () => void;
}

const AccountCard = ({ id, onPress }: Props) => {
  const { useRowById, getById } = useDatabase();

  const data = useRowById("accounts", id);
  if (!data) return null;

  const currency = getById("currencies", data.currency);

  if (!currency) return null;

  const type = ACCOUNT_TYPES[data.type as ACCOUNT_TYPES_ID];

  return (
    <Pressable
      className="h-28 w-48 bg-zinc-100 dark:bg-zinc-950 rounded-md p-2 px-3 justify-evenly shadow-lg ios:shadow-sm flex-col"
      onPress={onPress}
    >
      <View className="flex-row gap-2 mb-1">
        <View
          className="w-10 h-9 items-center justify-center rounded-md"
          style={{ backgroundColor: type.color }}
        >
          {type.icon("#fff")}
        </View>

        <Text
          className="uppercase text-sm ios:tracking-tight font-medium text-zinc-600 dark:text-zinc-400 flex-1 -mt-[2px] line-clamp-2"
          android_hyphenationFrequency="full"
        >
          {hyphenateText(data.name, 13).padEnd(25, " ")}
        </Text>
      </View>

      <Text className="text-2xl text-right font-medium dark:text-white line-clamp-1">
        {formatNumber(data.currentBalance, 99999999)}
      </Text>
      <Text className="text-right text-lg font-light dark:text-white -mt-1">
        {currency.code}
      </Text>
    </Pressable>
  );
};

export default AccountCard;
