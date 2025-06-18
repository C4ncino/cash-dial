import { View, Text, Pressable } from "react-native";
import { useState, useMemo, useEffect } from "react";

interface Props {
  type: "week" | "month";
  onChange: (days: number[]) => void;
  values?: number[];
  readonly?: boolean;
}

const WEEK_DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

const MONTH_DAYS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28,
] as const;

const DaySelector = ({ onChange, type, values = [], readonly }: Props) => {
  const [selectedDays, setSelectedDays] = useState<number[]>(values);

  useEffect(() => {
    setSelectedDays(values);
  }, [values]);

  const DAYS = useMemo(
    () => (type === "week" ? WEEK_DAYS : MONTH_DAYS),
    [type]
  );

  const handlePress = (day: number) => {
    const addedDay = type === "week" ? day : day + 1;

    const newDays = isDaySelected(day)
      ? selectedDays.filter((d) => d !== addedDay)
      : [...selectedDays, addedDay];

    setSelectedDays(newDays);
    onChange(newDays);
  };

  const isDaySelected = (day: number) =>
    type === "week"
      ? selectedDays.includes(day)
      : selectedDays.includes(day + 1);

  return (
    <View className="flex-row justify-center flex-wrap gap-3 w-full my-5 max-w-lg mx-auto">
      {DAYS.map((day, i) => (
        <Pressable
          key={day}
          className={`w-10 h-10 justify-center border-2 rounded-full ${isDaySelected(i) ? "bg-blue-500 border-blue-500" : "border-zinc-800 dark:border-white"}`}
          onPress={() => (readonly ? null : handlePress(i))}
        >
          <Text
            className={`${isDaySelected(i) ? "text-white" : ""} dark:text-white text-center`}
          >
            {typeof day === "string" ? day.slice(0, 2) : day}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default DaySelector;
