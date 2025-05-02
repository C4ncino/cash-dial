import { View, Text } from "react-native";
import React from "react";
import colors from "tailwindcss/colors";
import { formatInt, formatShortAmount } from "@/utils/formatters";

interface Props {
  max: number;
  current: number;
  hideLimits?: boolean;
}

const getColor = (percentage: number) => {
  if (percentage < 25) return colors.green[500];
  if (percentage < 50) return colors.lime[500];
  if (percentage < 75) return colors.amber[400];
  if (percentage < 90) return colors.orange[400];
  if (percentage < 100) return colors.red[500];
  else return colors.red[600];
};

const Progress = ({ max, current, hideLimits = false }: Props) => {
  const percentage = Math.floor((current / max) * 100);

  return (
    <View
      className="flex-row items-center mx-4 gap-2"
      style={{
        paddingVertical: hideLimits ? 8 : 0,
      }}
    >
      {!hideLimits && (
        <Text className="text-zinc-700 dark:text-zinc-300 text-sm">{0}</Text>
      )}

      <View className="border border-zinc-200 dark:border-zinc-800 h-6 flex-1 ios:rounded-lg rounded-sm">
        <View
          className="h-full ios:rounded-lg rounded-sm px-1 justify-center"
          style={{
            backgroundColor: getColor(percentage),
            width: `${percentage > 100 ? 100 : percentage === 0 ? 1 : percentage}%`,
          }}
        >
          {percentage > 30 && !hideLimits && (
            <Text className="text-white text-sm text-right font-medium">
              {formatShortAmount(current)}
            </Text>
          )}
        </View>
      </View>

      {!hideLimits && (
        <Text className="text-zinc-700 dark:text-zinc-300 text-sm w-9">
          {formatInt(max).length < 6 ? formatInt(max) : formatShortAmount(max)}
        </Text>
      )}
    </View>
  );
};

export default Progress;
