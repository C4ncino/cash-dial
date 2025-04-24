import { ReactNode } from "react";
import { Text, Pressable } from "react-native";

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
  return (
    <Pressable
      className={`
        flex-1 h-12
        flex-row justify-center items-center gap-2
        border-y-2 border-blue-500 ${isFirst && "border-l-2"} border-r-2
        ${isCurrent && "bg-blue-500"}  
      `}
      disabled={isCurrent}
      onPress={onPress}
      style={{
        borderTopLeftRadius: isFirst ? 6 : 0,
        borderBottomLeftRadius: isFirst ? 6 : 0,
        borderTopRightRadius: isLast ? 6 : 0,
        borderBottomRightRadius: isLast ? 6 : 0,
      }}
    >
      {icon && icon(isCurrent ? colors.white : colors.blue[500])}
      <Text
        className={`font-semibold text-blue-500 group-active:text-white ${isCurrent && "text-white"}
        `}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default SegmentedControlButton;
