import { View } from "react-native";

import Input from "@/forms/Input";
import TextArea from "@/forms/TextArea";
import DatePicker from "@/forms/DatePicker";
import AccountSelect from "@/forms/AccountSelect";
import CurrencySelect from "@/forms/CurrencySelect";
import CategorySelect from "@/forms/CategorySelect";

import useForm from "@/hooks/useForm";
import useTinybase from "@/hooks/useDatabase";
import useMovementForm from "@/hooks/useMovementForm";

import { formatNumber } from "@/utils/formatters";

interface Props extends PropsMovementsForm {}

const Form = ({ setOnSubmit, setCanSubmit, movementId, setReset }: Props) => {
  const { getById, update } = useTinybase();

  const data = getById("incomes", movementId as Id);

  const { values, setFieldValue, resetForm, validate } = useForm<
    Row<"incomes">
  >(
    data || {
      idAccount: "",
      idCategory: "",
      amount: 0,
      currency: "0",
      date: Date.now(),
    }
  );

  const updateAccounts = () => {
    const account = getById("accounts", values.idAccount as Id);
    if (!account) return;

    update("accounts", values.idAccount as Id, {
      ...account,
      currentBalance:
        account.currentBalance + values.amount - (data?.amount || 0),
    });
  };

  useMovementForm({
    table: "incomes",
    values,
    movementId,
    resetForm,
    validate,
    setReset,
    setOnSubmit,
    setCanSubmit,
    updateAccounts,
  });

  return (
    <>
      <AccountSelect
        value={values.idAccount}
        onSelect={(v) => setFieldValue("idAccount", v)}
      />

      <CategorySelect
        value={values.idCategory}
        onSelect={(v) => setFieldValue("idCategory", v)}
      />

      <View className="flex-row justify-between items-end">
        <Input
          className="w-[70%] mr-2"
          label="Monto"
          type="number"
          placeholder="0.00"
          value={formatNumber(values.amount)}
          onChangeText={(s) => setFieldValue("amount", s.replaceAll(",", ""))}
          onBlur={() => setFieldValue("amount", Number(values.amount))}
          selectTextOnFocus={true}
        />
        <CurrencySelect
          value={values.currency}
          onSelect={(v) => setFieldValue("currency", v)}
        />
      </View>

      <DatePicker
        label="Fecha"
        value={values.date}
        onSelect={(v) => setFieldValue("date", v)}
      />

      <TextArea
        placeholder="Deja alguna nota aquí..."
        className="max-h-32 mb-24"
        numberOfLines={5}
        maxLength={256}
        value={values.description}
        onChangeText={(s) => setFieldValue("description", s)}
        onEndEditing={(e) => {
          const value = e.nativeEvent.text;
          setFieldValue("description", value);
          e.target.setNativeProps({ text: value });
        }}
      />
    </>
  );
};

export default Form;
