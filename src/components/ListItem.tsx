import { Text, Pressable } from "react-native";

import useDatabase from "@/hooks/useDatabase";

interface Props {
  id: string;
}

const ListItem = ({ id }: Props) => {
  const { getById, remove } = useDatabase();

  return (
    <Pressable onPress={() => remove("categories", id)}>
      <Text>
        {id}: {getById("categories", id)?.name}
      </Text>
    </Pressable>
  );
};

export default ListItem;
