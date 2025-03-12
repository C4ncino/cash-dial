import ContextProvider from "@/contexts/ContextProvider";
import { Stack } from "expo-router";
import "src/assets/global.css";

const Layout = () => {
  return (
    <ContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)" options={{ headerShown: false }} />
      </Stack>
    </ContextProvider>
  );
};

export default Layout;
