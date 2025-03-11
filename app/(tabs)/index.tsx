import { View, Text } from "react-native";
import { useColorScheme } from "react-native";

const Home = () => {
  const colors = useColorScheme();
  console.log(colors);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
