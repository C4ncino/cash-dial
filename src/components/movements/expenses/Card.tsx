import useTinybase from "@/hooks/useDatabase";
import { View, Text } from "react-native";
import MovementCard from "../MovementCard";
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  CategoryColorKey,
  CategoryIconKey,
} from "@/db/ui";

interface Props {
  movementId: Id;
  showTime?: boolean;
  onPress?: (id?: Id) => void;
}

const Card = ({ movementId, ...props }: Props) => {
  const { useRowById, getById } = useTinybase();
  const data = useRowById("expenses", movementId);

  if (!data) return null;

  const category = getById("categories", data.idCategory);

  if (!category) return null;

  const iconColor =
    CATEGORY_COLORS[
      (category?.idFather as CategoryColorKey) ||
        (data.idCategory as CategoryColorKey)
    ];

  const account = getById("accounts", data.idAccount);

  if (!account) return null;

  return (
    <MovementCard
      type="out"
      id={movementId}
      amount={data.amount}
      date={data.date}
      title={category.name}
      Subtitle={() => <Text className="text-zinc-500">{account.name}</Text>}
      Icon={() => (
        <View
          className="w-12 h-12 rounded-md justify-center items-center"
          style={{ backgroundColor: iconColor }}
        >
          {CATEGORY_ICONS[data.idCategory as CategoryIconKey]("#fff", 24)}
        </View>
      )}
      {...props}
    />
  );
};

export default Card;
