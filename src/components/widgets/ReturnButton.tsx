import React from "react";
import { ArrowLeft, NavArrowLeft } from "iconoir-react-native";
import { Text, Pressable, PressableProps, Platform } from "react-native";

import { useSystemContext } from "@/contexts/hooks";
import colors from "tailwindcss/colors";

interface Props extends PressableProps {}

const ReturnButton = (props: Props) => {
  if (Platform.OS === "ios") {
    return (
      <Pressable className="flex-row items-center p-1 m-2" {...props}>
        <NavArrowLeft width={24} height={24} color={colors.blue[500]} />
        <Text className="text-blue-500 text-lg">Volver</Text>
      </Pressable>
    );
  }

  const { isDark } = useSystemContext();

  return (
    <Pressable className="flex-row items-center p-1 m-2 gap-1" {...props}>
      <ArrowLeft
        width={24}
        height={24}
        strokeWidth={2}
        color={isDark ? colors.white : colors.black}
      />
      <Text className="dark:text-white text-xl font-medium">Volver</Text>
    </Pressable>
  );
};

export default ReturnButton;
