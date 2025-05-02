import BaseModal from "@/BaseModal";
import CategorySelect from "../forms/CategorySelect";
import Input from "../forms/Input";
import { formatNumber } from "@/utils/formatters";
import SegmentedControl from "../forms/SegmentedControl";
import { View } from "react-native";
import CurrencySelect from "../forms/CurrencySelect";
import { BUDGET_TYPES } from "@/db/ui";

interface Props extends PropsBaseModal {
  id?: string;
  values: Row<"budgets">;
  setFieldValue: (
    field: keyof Row<"budgets">,
    value: Row<"budgets">[keyof Row<"budgets">]
  ) => void;
}

const Form = ({ values, setFieldValue, id, ...props }: Props) => {
  return (
    <BaseModal {...props}>
      <View className="px-4 gap-2">
        <Input
          type="text"
          label="Nombre"
          value={values.name}
          onChangeText={(s) => setFieldValue("name", s)}
        />

        <View className="flex-row justify-between items-end">
          <Input
            className="w-[70%] mr-2"
            label="Límite"
            type="number"
            value={formatNumber(values.amountLimit)}
            onChangeText={(s) =>
              setFieldValue("amountLimit", s.replaceAll(",", ""))
            }
            onBlur={() =>
              setFieldValue("amountLimit", Number(values.amountLimit))
            }
            selectTextOnFocus={true}
          />

          <CurrencySelect
            value={values.currency}
            onSelect={(v) => setFieldValue("currency", v)}
          />
        </View>

        <CategorySelect
          value={values.idCategory}
          onSelect={(v) => setFieldValue("idCategory", v)}
        />

        <SegmentedControl
          label="Recurrencia"
          data={Object.values(BUDGET_TYPES)}
          value={values.type}
          onChange={(v) => setFieldValue("type", v)}
          readonly={id !== undefined}
        />
      </View>
    </BaseModal>
  );
};

export default Form;
