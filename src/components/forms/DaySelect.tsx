import { Text } from "react-native";

import Select from "./Select";

import { DAYS } from "@/db/ui";

interface Props {
  value: string;
  onSelect: (value: string) => void;
}

const DaySelect = ({ value, onSelect }: Props) => {
  return (
    <Select
      label="Fecha límite de pago"
      placeholder="Elija un día"
      labelField="id"
      valueField="id"
      data={DAYS}
      renderItem={(item) => (
        <Text className="bg-white dark:text-white dark:bg-zinc-900 text-xl px-4 py-2">
          {item.id}
        </Text>
      )}
      value={value}
      onSelect={(item) => onSelect(item.id)}
      maxHeight={160}
    />
  );
};

export default DaySelect;
