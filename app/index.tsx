import { View, Text, Button, FlatList } from "react-native";

import ListItem from "@/components/ListItem";
import useDatabase from "@/hooks/useDatabase";

const Home = () => {
  const { create, getAll, update, remove } = useDatabase();

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
      <Button
        onPress={() => {
          const a = update("categories", "10", {
            name: "New Category 8",
          });

          console.log(a);
        }}
        title="Update"
      />

      <Button
        onPress={() => {
          const a = remove("categories", "10");

          console.log(a);
        }}
        title="Rm"
      />

      <FlatList
        data={getAll("categories")}
        renderItem={({ item }) => <ListItem id={item} />}
      />
    </View>
  );
};

export default Home;
