import { useMemo } from "react";
import { Text } from "react-native";

import Select from "./Select";

import useDatabase from "@/hooks/useDatabase";

interface Props {
  label?: string;
  value: string;
  onSelect: (value: string) => void;
}

const CurrencySelect = ({ label, value, onSelect }: Props) => {
  const { getAll, getById } = useDatabase();

  const currencies = useMemo(() => {
    const currenciesIds = getAll("currencies");
    const currencies: Array<Row<"currencies"> & { id: string }> = [];

    currenciesIds.map((id) => {
      const currency = getById("currencies", id);

      if (currency) currencies.push({ id, ...currency });
    });

    return currencies;
  }, []);

  return (
    <Select
      label={label}
      labelField="code"
      valueField="id"
      data={currencies}
      renderItem={(item) => (
        <Text className="bg-white dark:text-white dark:bg-zinc-900 text-xl px-4 py-2">
          {item.code}
        </Text>
      )}
      value={value}
      onSelect={(item) => onSelect(item.id)}
    />
  );
};

export default CurrencySelect;
