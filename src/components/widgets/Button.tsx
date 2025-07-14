import {
  Text,
  Button as NativeButton,
  Pressable,
  ButtonProps,
  Platform,
  View,
} from "react-native";

import colors from "tailwindcss/colors";

interface Props extends ButtonProps {
  style?: "normal" | "outline";
}

const Button = ({
  style = "normal",
  color = "#2196F3",
  disabled,
  ...props
}: Props) => {
  if (style === "outline" && Platform.OS === "android") {
    return (
      <Pressable {...props} className={`w-full`} disabled={disabled}>
        {({ pressed }) => (
          <View
            className="h-10 justify-center border-2 rounded-sm px-2"
            style={{
              borderColor: disabled ? "#dfdfdf" : color,
              backgroundColor: pressed ? color : "transparent",
            }}
          >
            <Text
              className="font-medium dark:text-white text-center uppercase"
              style={{
                color: pressed ? colors.white : disabled ? "#a1a1a1" : color,
              }}
            >
              {props.title}
            </Text>
          </View>
        )}
      </Pressable>
    );
  }

  return <NativeButton {...props} color={color} disabled={disabled} />;
};

export default Button;
