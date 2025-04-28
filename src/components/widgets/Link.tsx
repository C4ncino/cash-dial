import { View, Text, Platform } from "react-native";
import { Link as ExpoLink, LinkProps } from "expo-router";
import { NavArrowRight } from "iconoir-react-native";

interface Props extends Omit<LinkProps, "className" & "children"> {
  label?: string;
  className?: string;
}

const Link = ({ label, className, ...props }: Props) => {
  return (
    <ExpoLink {...props}>
      <View className={`flex-row items-center w-full ${className}`}>
        <Text className="ios:text-blue-500 android:text-zinc-400">{label}</Text>
        {Platform.OS === "android" && (
          <NavArrowRight width={16} height={16} color={"#a1a1aa"} />
        )}
      </View>
    </ExpoLink>
  );
};

export default Link;
