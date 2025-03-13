import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  HomeSimpleDoor,
  StatsUpSquare,
  Clock,
  MoreHorizCircle,
} from "iconoir-react-native";

import colors from "tailwindcss/colors";

const Layout = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? colors.zinc[950] : colors.white,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarIconStyle: { marginTop: -2 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#9ca3af",
      }}
      screenLayout={(props) => {
        return (
          <SafeAreaView className="min-h-screen dark:bg-zinc-900 bg-white px-2">
            <StatusBar animated style="auto" />
            {props.children}
          </SafeAreaView>
        );
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <HomeSimpleDoor height={28} width={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <StatsUpSquare height={28} width={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedules"
        options={{
          title: "Schedules",
          tabBarIcon: ({ color }) => (
            <Clock height={28} width={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <MoreHorizCircle height={28} width={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
