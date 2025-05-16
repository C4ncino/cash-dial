import { useState } from "react";
import colors from "tailwindcss/colors";
import { Text, Pressable } from "react-native";
import { NavArrowLeft, NavArrowRight } from "iconoir-react-native";

import { useSystemContext } from "@/contexts/hooks";

interface Props {
  canGoBack: boolean;
  canGoForward: boolean;
  backwards: () => void;
  forward: () => void;
  label: string;
}

const Pagination = ({
  canGoBack,
  canGoForward,
  backwards,
  forward,
  label,
}: Props) => {
  const { isDark } = useSystemContext();

  const [start, setStart] = useState(0);

  const getColor = (condition: boolean) => {
    if (condition) return colors.blue[600];
    else if (isDark) return colors.zinc[700];
    else return colors.zinc[300];
  };

  return (
    <Pressable
      className="flex-row items-center justify-center my-3 mb-6 border-b border-zinc-300 dark:border-zinc-800 py-4"
      onTouchStart={(e) => setStart(e.nativeEvent.pageX)}
      onTouchEnd={(e) => {
        const difference = e.nativeEvent.pageX - start;

        if (difference < 0 && difference < -75 && canGoForward) forward();
        else if (difference > 0 && difference > 75 && canGoBack) backwards();

        setStart(0);
      }}
    >
      <Pressable onPress={backwards} disabled={!canGoBack} className="px-2">
        <NavArrowLeft
          width={28}
          height={28}
          strokeWidth={2}
          color={getColor(canGoBack)}
        />
      </Pressable>
      <Text className="dark:text-white text-xl font-medium text-center w-32 mx-6">
        {label}
      </Text>
      <Pressable onPress={forward} disabled={!canGoForward} className="px-2">
        <NavArrowRight
          width={28}
          height={28}
          strokeWidth={2}
          color={getColor(canGoForward)}
        />
      </Pressable>
    </Pressable>
  );
};

export default Pagination;
