import { Stack } from "expo-router";
import "src/assets/global.css";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="nada" />
    </Stack>
  );
};

export default Layout;
