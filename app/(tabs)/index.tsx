import { ScrollView, Text, View } from "react-native";

import AccountsCards from "@/accounts/AccountsCards";

const Home = () => {
  return (
    <ScrollView contentContainerClassName="px-4">
      <View role="presentation" className="my-5">
        <Text className="text-3xl font-semibold text-center dark:text-white">
          Bienvenido
        </Text>
      </View>
      <AccountsCards />
    </ScrollView>
  );
};

export default Home;
