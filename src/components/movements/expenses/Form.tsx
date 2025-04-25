import { View } from "react-native";
import { useEffect, useState } from "react";

import Input from "@/forms/Input";
import TextArea from "@/forms/TextArea";
import DatePicker from "@/forms/DatePicker";
import AccountSelect from "@/forms/AccountSelect";
import CurrencySelect from "@/forms/CurrencySelect";
import CategorySelect from "@/forms/CategorySelect";

import { ACCOUNT_TYPES_ID } from "@/db/ui";
import { formatInt, formatNumber } from "@/utils/formatters";

import useForm from "@/hooks/useForm";
import useTinybase from "@/hooks/useDatabase";

interface Props extends PropsMovementsForm {}

const Form = ({ setOnSubmit, setCanSubmit }: Props) => {
  const { create, getById } = useTinybase();

  const [isCredit, setIsCredit] = useState(false);
  const { values, setFieldValue, resetForm, validate } = useForm<
    Row<"expenses">
  >({
    idAccount: "",
    idCategory: "",
    msi: 0,
    amount: 0,
    currency: "0",
    date: Date.now(),
  });

  const onSubmit = () => {
    create("expenses", values);
    resetForm();
  };

  useEffect(() => {
    setOnSubmit(() => onSubmit);
  }, []);

  useEffect(() => {
    setCanSubmit(validate());
  }, [values]);

  return (
    <>
      <AccountSelect
        value={values.idAccount}
        onSelect={(v) => {
          setFieldValue("idAccount", v);
          const account = getById("accounts", v);
          if (account?.type === ACCOUNT_TYPES_ID.CREDIT) setIsCredit(true);
        }}
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
          onEndEditing={(e) => {
            const value = Number(e.nativeEvent.text.replaceAll(",", ""));
            setFieldValue("amount", value);
            e.target.setNativeProps({ text: formatNumber(value) });
          }}
          selectTextOnFocus={true}
        />
        <CurrencySelect
          value={values.currency}
          onSelect={(v) => setFieldValue("currency", v)}
        />
      </View>

      {isCredit && (
        <Input
          label="Meses sin intereses"
          type="number"
          onLayout={(e) =>
            e.target.setNativeProps({ text: formatInt(values.msi) })
          }
          onEndEditing={(e) => {
            const value = Number(e.nativeEvent.text.replaceAll(",", ""));
            setFieldValue("msi", value);
            e.target.setNativeProps({ text: formatInt(value) });
          }}
          selectTextOnFocus={true}
        />
      )}

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
