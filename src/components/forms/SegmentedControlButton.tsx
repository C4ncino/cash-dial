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
  readonly?: boolean;
}

const SegmentedControlButton = ({
  isFirst,
  isLast,
  isCurrent,
  name,
  icon,
  onPress,
  readonly,
}: Props) => {
  return (
    <Pressable
      className={`
        flex-1 h-12
        flex-row justify-center items-center gap-2
        border-y-2 ${isFirst && "border-l-2"} border-r-2
      `}
      disabled={isCurrent || readonly}
      onPress={onPress}
      style={{
        borderTopLeftRadius: isFirst ? 6 : 0,
        borderBottomLeftRadius: isFirst ? 6 : 0,
        borderTopRightRadius: isLast ? 6 : 0,
        borderBottomRightRadius: isLast ? 6 : 0,
        borderColor: readonly ? colors.zinc[500] : colors.blue[500],
        backgroundColor:
          readonly && isCurrent
            ? colors.zinc[500]
            : isCurrent
              ? colors.blue[500]
              : colors.transparent,
      }}
    >
      {icon &&
        icon(
          isCurrent
            ? colors.white
            : readonly
              ? colors.zinc[500]
              : colors.blue[500]
        )}
      <Text
        className={`font-semibold group-active:text-white ${isCurrent && "text-white"}
        `}
        style={{
          color: isCurrent
            ? colors.white
            : readonly
              ? colors.zinc[500]
              : colors.blue[500],
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default SegmentedControlButton;
