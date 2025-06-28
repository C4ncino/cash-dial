import { View, Text } from "react-native";
import { DataTransferUp, DotArrowRight } from "iconoir-react-native";

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
  const data = useRowById("transfers", movementId);

  if (!data) return null;

  const origin = getById("accounts", data.idFrom);
  const destiny = getById("accounts", data.idTo);

  if (!origin || !destiny) return null;

  const deleteMovement = () => {
    remove("transfers", movementId);
    update("accounts", data.idFrom as Id, {
      ...origin,
      currentBalance: origin.currentBalance + data.amount,
    });
    update("accounts", data.idTo as Id, {
      ...destiny,
      currentBalance: destiny.currentBalance - data.amount,
    });
  };

  return (
    <MovementCard
      type="transfer"
      id={movementId}
      amount={data.amount}
      date={data.date}
      title="Transferencia"
      Subtitle={() => (
        <View className="flex-row items-center gap-2">
          <Text className="text-zinc-500">{origin.name}</Text>
          <DotArrowRight
            width={16}
            height={16}
            color="#71717a"
            strokeWidth={2}
          />
          <Text className="text-zinc-500">{destiny.name}</Text>
        </View>
      )}
      Icon={() => (
        <View className="w-12 h-12 rounded-md justify-center items-center bg-lime-500 rotate-90">
          <DataTransferUp width={24} height={24} color="#fff" />
        </View>
      )}
      onDelete={() => {
        onLongPress();
        setOnDelete(() => deleteMovement);
      }}
      {...props}
    />
  );
};

export default Card;
