import ContextProvider from "@/contexts/ContextProvider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import "src/assets/global.css";

const Layout = () => {
  return (
    <ContextProvider>
      <Stack
        screenOptions={{ headerShown: false }}
        screenLayout={(props) => {
          return (
            <SafeAreaView className="min-h-full bg-zinc-50 dark:bg-zinc-900">
              <StatusBar animated style="auto" />
              {props.children}
            </SafeAreaView>
          );
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movements" options={{ headerShown: false }} />
      </Stack>
    </ContextProvider>
  );
};

export default Layout;
