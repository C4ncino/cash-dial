import { View, Text } from "react-native";

import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  CategoryColorKey,
  CategoryIconKey,
} from "@/db/ui";
import useTinybase from "@/hooks/useDatabase";
import MovementCard from "@/movements/MovementCard";

interface Props {
  movementId: Id;
  showTime?: boolean;
  onLongPress: () => void;
  setOnDelete: React.Dispatch<React.SetStateAction<() => void>>;
  onPress: (id: Id) => void;
}

const Card = ({ movementId, setOnDelete, onLongPress, ...props }: Props) => {
  const { useRowById, getById, remove, update } = useTinybase();
  const data = useRowById("incomes", movementId);

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

  const deleteMovement = () => {
    remove("incomes", movementId);
    update("accounts", data.idAccount as Id, {
      ...account,
      currentBalance: account.currentBalance - data.amount,
    });
  };

  return (
    <MovementCard
      type="in"
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
      onDelete={() => {
        onLongPress();
        setOnDelete(() => () => deleteMovement);
      }}
      {...props}
    />
  );
};

export default Card;
