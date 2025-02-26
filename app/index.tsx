import useDatabase from "@/hooks/useDatabase";
import { View, Text, Button, Pressable, FlatList } from "react-native";
import { useRow, useSortedRowIds, useStore } from "tinybase/ui-react";

const Home = () => {
  const { create, getAll, getById, remove } = useDatabase();

  return (
    <View>
      <Text>Home</Text>

      <Button
        onPress={() => {
          create("categories", {
            name: "New Category 2",
          });
        }}
        title="Add"
      />

      <FlatList
        data={getAll("categories")}
        renderItem={({ item }) => {
          const cat = getById("categories", item);

          return (
            <Pressable onPress={() => remove("categories", item)}>
              <Text>
                {item}: {cat?.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Home;
