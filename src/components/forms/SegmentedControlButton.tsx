import { ReactNode, useEffect } from "react";
import { Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import colors from "tailwindcss/colors";

interface Props {
  name: string;
  icon?: (color: string) => ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
  isCurrent?: boolean;
  onPress: () => void;
}

const SegmentedControlButton = ({
  isFirst,
  isLast,
  isCurrent,
  name,
  icon,
  onPress,
}: Props) => {
  const backgroundColor = useSharedValue<string>(
    isCurrent ? colors.blue[500] : colors.transparent
  );

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  useEffect(() => {
    if (!isCurrent)
      backgroundColor.value = withTiming(colors.transparent, {
        duration: 300,
      });
  }, [isCurrent]);

  return (
    <Pressable
      className="flex-1 h-12 min-w-12"
      disabled={isCurrent}
      onPress={() => {
        onPress();
        backgroundColor.value = withTiming(colors.blue[500], { duration: 200 });
      }}
    >
      <Animated.View
        style={[animatedStyle, { pointerEvents: "none" }]}
        className={`
            py-2
            flex-row justify-center items-center gap-2
            border-y-2 border-r-2 ${isFirst && "border-l-2"} border-blue-500
            ${isFirst && "rounded-l-md"} ${isLast && "rounded-r-md"}
            group
        `}
      >
        {icon && icon(isCurrent ? colors.white : colors.blue[500])}
        <Text
          className={`font-semibold text-blue-500 group-active:text-white ${isCurrent && "text-white"}`}
        >
          {name}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default SegmentedControlButton;
