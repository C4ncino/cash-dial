import useTinybase from "@/hooks/useDatabase";
import { View, Text } from "react-native";
import MovementCard from "../MovementCard";

import {
  ArrowRight,
  DataTransferUp,
  DotArrowRight,
} from "iconoir-react-native";

interface Props {
  movementId: Id;
  showTime?: boolean;
  onPress?: (id?: Id) => void;
}

const Card = ({ movementId, ...props }: Props) => {
  const { useRowById, getById } = useTinybase();
  const data = useRowById("transfers", movementId);

  if (!data) return null;

  const origin = getById("accounts", data.idFrom);
  const destiny = getById("accounts", data.idTo);

  if (!origin || !destiny) return null;

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
          {/* <ArrowRight width={16} height={16} color="#71717a" /> */}
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
      {...props}
    />
  );
};

export default Card;
