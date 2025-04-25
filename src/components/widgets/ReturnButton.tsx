import { Text, Pressable, PressableProps, Platform } from "react-native";
import React from "react";
import { ArrowLeft, NavArrowLeft } from "iconoir-react-native";
import { useColorScheme } from "nativewind";

interface Props extends PressableProps {}

const ReturnButton = (props: Props) => {
  if (Platform.OS === "ios") {
    return (
      <Pressable className="flex-row items-center p-1 m-2" {...props}>
        <NavArrowLeft width={22} height={22} color={"#3b82f6"} />
        <Text className="text-blue-500">Volver</Text>
      </Pressable>
    );
  }

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Pressable className="flex-row items-center p-1 m-2 gap-2" {...props}>
      <ArrowLeft
        width={24}
        height={24}
        strokeWidth={2}
        color={isDark ? "#fff" : "#3b82f6"}
      />
      <Text className="dark:text-white text-xl font-medium">Volver</Text>
    </Pressable>
  );
};

export default ReturnButton;
