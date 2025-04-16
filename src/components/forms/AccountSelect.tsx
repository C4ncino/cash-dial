import { useMemo } from "react";
import { Text } from "react-native";

import Select from "./Select";
import useDatabase from "@/hooks/useDatabase";

interface Props {
  value: string;
  onSelect: (value: string) => void;
}

const AccountSelect = ({ value, onSelect }: Props) => {
  const { getAll, getById } = useDatabase();

  const accounts = useMemo(
    () =>
      getAll("accounts").map((id) => {
        const account = getById("accounts", id);
        return { id, ...account };
      }),
    []
  );

  return (
    <Select
      label="Cuenta"
      placeholder="Elija una cuenta"
      labelField="name"
      valueField="id"
      data={accounts}
      renderItem={(item) => (
        <Text className="bg-white dark:text-white dark:bg-zinc-900 px-4 py-2">
          {item.name}
        </Text>
      )}
      value={value}
      onSelect={(item) => onSelect(item.id)}
      maxHeight={160}
    />
  );
};

export default AccountSelect;
