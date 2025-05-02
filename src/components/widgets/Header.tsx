import { View, Text } from "react-native";
import React from "react";
import ReturnButton from "./ReturnButton";
import { router } from "expo-router";
import Button from "./Button";
import colors from "tailwindcss/colors";

interface Props {
  title: string;
  openModal: () => void;
  buttonTitle?: string;
  buttonColor?: string;
}

const Header = ({
  title,
  openModal,
  buttonTitle = "Crear",
  buttonColor = colors.green[500],
}: Props) => {
  return (
    <View className="flex-row justify-between items-center mb-2 px-2">
      <ReturnButton onPress={() => router.back()} />
      <Text className="text-2xl font-semibold dark:text-white text-center">
        {title}
      </Text>

      <View className="m-2 p-1 w-24">
        <Button
          style="outline"
          title={buttonTitle}
          color={buttonColor}
          onPress={openModal}
        />
      </View>
    </View>
  );
};

export default Header;
