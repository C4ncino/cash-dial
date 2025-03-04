import { Text, Pressable } from "react-native";

import useDatabase from "@/hooks/useDatabase";
import useDate from "@/hooks/useDate";

interface Props {
  id: string;
}

const ListItem = ({ id }: Props) => {
  const { getById, remove } = useDatabase();
  const data = getById("plannings", id);
  if (data === null) return null;
  if (!data.date) return null;

  const { date, time } = useDate(data.date);

  return (
    <Pressable onPress={() => remove("plannings", id)}>
      <Text>
        {id}: {data.name}
      </Text>
      <Text>{date}</Text>
      <Text>{time}</Text>
      <Text>{data.amount}</Text>
    </Pressable>
  );
};

export default ListItem;
