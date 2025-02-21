import ContextProvider from "@/contexts/ContextProvider";
import { Stack } from "expo-router";
import "src/assets/global.css";

const Layout = () => {
  return (
    <ContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </ContextProvider>
  );
};

export default Layout;
