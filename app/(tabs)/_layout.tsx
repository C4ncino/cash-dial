import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Iconoir } from "iconoir-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      screenLayout={(props) => {
        return (
          <SafeAreaView className="px-2 dark:bg-gray-950">
            <StatusBar animated />
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
            <Iconoir height={36} width={36} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Iconoir height={36} width={36} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Iconoir height={36} width={36} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedules"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Iconoir height={36} width={36} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Iconoir height={36} width={36} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
