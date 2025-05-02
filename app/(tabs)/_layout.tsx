import {
  HomeSimpleDoor,
  StatsUpSquare,
  Clock,
  MoreHorizCircle,
} from "iconoir-react-native";
import { Tabs } from "expo-router";

import colors from "tailwindcss/colors";
import { View } from "react-native";
import { useSystemContext } from "@/contexts/hooks";

const Layout = () => {
  const { isDark } = useSystemContext();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? colors.zinc[900] : colors.zinc[50],
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
          <View className="min-h-full bg-zinc-50 dark:bg-zinc-900">
            {props.children}
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <HomeSimpleDoor height={28} width={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Estadísticas",
          tabBarIcon: ({ color }) => (
            <StatsUpSquare height={28} width={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedules"
        options={{
          title: "Planificación",
          tabBarIcon: ({ color }) => (
            <Clock height={28} width={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "Más",
          tabBarIcon: ({ color }) => (
            <MoreHorizCircle height={28} width={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
