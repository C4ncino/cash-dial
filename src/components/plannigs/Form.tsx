import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import BaseModal from "@/BaseModal";

import Input from "@/forms/Input";
import DatePicker from "@/forms/DatePicker";
import AccountSelect from "@/forms/AccountSelect";
import CurrencySelect from "@/forms/CurrencySelect";
import CategorySelect from "@/forms/CategorySelect";
import SegmentedControl from "@/forms/SegmentedControl";

import RecurrenceForm from "./RecurrenceForm";
import { formatNumber } from "@/utils/formatters";
import { MOVEMENT_TYPES, PLANNINGS_TYPES, PLANNINGS_TYPES_ID } from "@/db/ui";

interface Props extends PropsBaseModal {
  values: PlanningsForm;
  setFieldValue: (
    field: keyof PlanningsForm,
    value: PlanningsForm[keyof PlanningsForm]
  ) => void;
}

const Form = ({ values, setFieldValue, onSubmit, ...props }: Props) => {
  return (
    <BaseModal
      {...props}
      onSubmit={() => {
        if (typeof values.amount === "string")
          values.amount = Number(values.amount);
        onSubmit();
      }}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          role="form"
          contentContainerClassName="px-4 gap-3 pb-32"
          keyboardShouldPersistTaps="handled"
        >
          <SegmentedControl
            value={values.type}
            data={Object.values(MOVEMENT_TYPES).slice(0, 2)}
            onChange={(v) => setFieldValue("type", v)}
          />

          <Input
            label="Nombre"
            value={values.name}
            onChangeText={(s) => setFieldValue("name", s)}
          />

          <View className="flex-row justify-between items-end">
            <Input
              className="w-[70%] mr-2"
              label="Cantidad"
              type="number"
              value={formatNumber(values.amount)}
              onChangeText={(s) =>
                setFieldValue("amount", s.replaceAll(",", ""))
              }
              onBlur={() => setFieldValue("amount", Number(values.amount))}
              selectTextOnFocus={true}
            />

            <CurrencySelect
              value={values.currency}
              onSelect={(v) => setFieldValue("currency", v)}
            />
          </View>

          <AccountSelect
            value={values.idAccount}
            onSelect={(s) => setFieldValue("idAccount", s)}
          />

          <CategorySelect
            value={values.idCategory}
            onSelect={(s) => setFieldValue("idCategory", s)}
          />

          <DatePicker
            label={
              values.recurringType === PLANNINGS_TYPES_ID.UNIQUE
                ? "Fecha"
                : "Fecha final"
            }
            value={values.endDate}
            onSelect={(v) => setFieldValue("endDate", v)}
          />

          <SegmentedControl
            label="Recurrencia"
            value={values.recurringType}
            data={Object.values(PLANNINGS_TYPES)}
            onChange={(v) => {
              setFieldValue("recurringType", v);

              if (
                v !== PLANNINGS_TYPES_ID.UNIQUE &&
                v !== PLANNINGS_TYPES_ID.DAILY
              )
                setFieldValue("times", 0);
              else setFieldValue("times", 1);

              setFieldValue("payDaysData", []);
            }}
          />

          <RecurrenceForm {...{ values, setFieldValue }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseModal>
  );
};

export default Form;
