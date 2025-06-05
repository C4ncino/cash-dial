import { useState } from "react";
import { View, Text } from "react-native";

import Select from "./Select";
import { DAYS, MONTHS, MONTH_DAYS } from "@/db/ui";

interface Props {
  value?: { day: number; month: number };
  onChange: (day: number, month: number) => void;
}

const DayMonthSelect = ({ value, onChange }: Props) => {
  const [day, setDay] = useState(value ? value.day.toString() : "");
  const [month, setMonth] = useState(value ? MONTHS[value.month].id : "");

  const monthDays = MONTH_DAYS[month as keyof typeof MONTH_DAYS];

  return (
    <View className="flex-row justify-between gap-2 flex-1">
      <View className="flex-grow">
        <Select
          placeholder="Elija un mes"
          labelField="id"
          valueField="id"
          data={MONTHS.slice()}
          renderItem={(item) => (
            <Text className="bg-white dark:text-white dark:bg-zinc-900 text-xl px-4 py-2">
              {item.id}
            </Text>
          )}
          value={month}
          onSelect={(item) => {
            setDay("");
            setMonth(item.id);
          }}
        />
      </View>

      <View className="flex-grow">
        <Select
          placeholder="Elija un día"
          labelField="id"
          valueField="id"
          data={DAYS.slice(0, monthDays)}
          renderItem={(item) => (
            <Text className="bg-white dark:text-white dark:bg-zinc-900 text-xl px-4 py-2">
              {item.id}
            </Text>
          )}
          value={day}
          onSelect={(item) => {
            setDay(item.id);
            onChange(
              Number(item.id),
              MONTHS.findIndex((m) => m.id === month)
            );
          }}
        />
      </View>
    </View>
  );
};

export default DayMonthSelect;
