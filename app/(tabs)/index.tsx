import CreateAccount from "@/components/modals/CreateAccount";
import { ScrollView, Text } from "react-native";

const Home = () => {
  return (
    <ScrollView>
      <Text>Home</Text>
      <CreateAccount />
    </ScrollView>
  );
};

export default Home;
