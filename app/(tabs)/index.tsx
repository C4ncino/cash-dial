import { ScrollView, Text, View } from "react-native";

import AccountsCards from "@/accounts/AccountsCards";
import CreateMovement from "@/components/movements/CreateMovement";
import useTinybase from "@/hooks/useDatabase";
import Button from "@/components/widgets/Button";
import Movements from "@/movements/MovementsLanding";

const Home = () => {
  const { getAll } = useTinybase();

  return (
    <ScrollView contentContainerClassName="px-4 pb-24 h-full">
      <View role="presentation" className="my-5">
        <Text className="text-3xl font-semibold text-center dark:text-white">
          Bienvenido
        </Text>
      </View>
      <AccountsCards />
      <CreateMovement />

      <Button
        title="Log"
        onPress={() => {
          console.log("E:", getAll("expenses"));
          console.log("I:", getAll("incomes"));
          console.log("T:", getAll("transfers"));
        }}
      />

      <Movements />
    </ScrollView>
  );
};

export default Home;
