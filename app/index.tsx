import { View, Text, Button, FlatList } from "react-native";

import ListItem from "@/components/ListItem";
import useDatabase from "@/hooks/useDatabase";

const Home = () => {
  const { create, getAll, update, remove, query } = useDatabase();

  const results = query(
    "plannings",
    { type: "select", column: "name" },
    { type: "select", column: "amount" },
    { type: "where", column: "amount", value: 100, operator: "<" }
  );

  console.log(results);

  return (
    <View>
      <Text>Home</Text>

      <Button
        onPress={() => {
          create("plannings", {
            name: "New Category 2",
            idAccount: "0",
            idCategory: "2",
            amount: 60,
            date: Date.now(),
            isRecurring: true,
            type: 1,
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
        data={getAll("plannings")}
        renderItem={({ item }) => <ListItem id={item} />}
      />
    </View>
  );
};

export default Home;
