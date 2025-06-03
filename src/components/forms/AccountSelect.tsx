import { useMemo } from "react";
import { Text, View } from "react-native";

import Select from "./Select";
import useDatabase from "@/hooks/useDatabase";
import { ACCOUNT_TYPES, ACCOUNT_TYPES_ID } from "@/db/ui";

interface Props {
  value: string;
  label?: string;
  onSelect: (value: string) => void;
}

const AccountSelect = ({ value, onSelect, label = "Cuenta" }: Props) => {
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
      label={label}
      placeholder="Elija una cuenta"
      labelField="name"
      valueField="id"
      needSearch
      data={accounts}
      renderItem={(item) => {
        const type = ACCOUNT_TYPES[item.type as ACCOUNT_TYPES_ID];

        return (
          <View className="flex-row items-center dark:bg-zinc-900 px-3 py-2 gap-2">
            <View
              className="w-8 h-7 items-center justify-center rounded-md"
              style={{ backgroundColor: type.color }}
            >
              {type.icon("#fff", 20)}
            </View>
            <Text className="dark:text-white bg-transparent">{item.name}</Text>
          </View>
        );
      }}
      value={value}
      renderLeftIcon={() => {
        const account = getById("accounts", value);

        if (!account?.type) return <></>;

        const type = ACCOUNT_TYPES[account.type as ACCOUNT_TYPES_ID];

        return (
          <View
            className="w-8 h-7 items-center justify-center rounded-md me-2"
            style={{ backgroundColor: type.color }}
          >
            {type.icon("#fff", 20)}
          </View>
        );
      }}
      onSelect={(item) => onSelect(item.id)}
      maxHeight={175}
    />
  );
};

export default AccountSelect;
