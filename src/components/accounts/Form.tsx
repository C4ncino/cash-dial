import { View, Text, ScrollView } from "react-native";

import BaseModal from "@/BaseModal";
import { ACCOUNT_TYPES, ACCOUNT_TYPES_ID } from "@/db/ui";
import { formatNumber } from "@/utils/formatters";

import Input from "@/forms/Input";
import DaySelect from "@/forms/DaySelect";
import CurrencySelect from "@/forms/CurrencySelect";
import SegmentedControl from "@/forms/SegmentedControl";

interface Props {
  label: string;

  visible: boolean;
  closeModal: () => void;

  values: Row<"accounts">;
  creditValues: Row<"creditAccounts">;

  validValues: boolean;
  validCreditValues: boolean;

  setFieldValue: (
    field: keyof Row<"accounts">,
    value: Row<"accounts">[keyof Row<"accounts">]
  ) => void;
  setCreditFieldValue: (
    field: keyof Row<"creditAccounts">,
    value: Row<"creditAccounts">[keyof Row<"creditAccounts">]
  ) => void;

  resetCreditForm: () => void;

  onSubmit: () => void;

  ErrorMessage: () => JSX.Element;

  closeButtonLabel?: string;
  submitButtonLabel?: string;
}

const Form = ({
  label,
  visible,
  closeModal,
  values,
  creditValues,
  validValues,
  validCreditValues,
  setFieldValue,
  setCreditFieldValue,
  resetCreditForm,
  onSubmit,
  ErrorMessage,
  closeButtonLabel = "Cerrar",
  submitButtonLabel = "Guardar",
}: Props) => {
  return (
    <BaseModal
      visible={visible}
      closeModal={closeModal}
      label={label}
      onSubmit={onSubmit}
      closeButtonLabel={closeButtonLabel}
      submitButtonLabel={submitButtonLabel}
      canSubmit={
        (values.type !== ACCOUNT_TYPES_ID.CREDIT && validValues) ||
        (values.type === ACCOUNT_TYPES_ID.CREDIT &&
          validValues &&
          validCreditValues)
      }
    >
      <ScrollView role="form" contentContainerClassName="pb-16 gap-3 px-4">
        <Input
          label="Nombre"
          type="text"
          value={values.name}
          onChangeText={(s) => setFieldValue("name", s)}
          enterKeyHint="next"
          maxLength={25}
        />
        <View className="flex-row justify-between items-end">
          <Input
            className="w-[70%] mr-2"
            label="Saldo inicial"
            type="number"
            value={formatNumber(values.currentBalance)}
            onChangeText={(s) =>
              setFieldValue("currentBalance", s.replaceAll(",", ""))
            }
            onBlur={() =>
              setFieldValue("currentBalance", Number(values.currentBalance))
            }
            selectTextOnFocus={true}
          />

          <CurrencySelect
            value={values.currency}
            onSelect={(v) => setFieldValue("currency", v)}
          />
        </View>

        <SegmentedControl
          label="Tipo de cuenta"
          data={Object.values(ACCOUNT_TYPES)}
          value={values.type}
          onChange={(v) => {
            if (v !== ACCOUNT_TYPES_ID.CREDIT) resetCreditForm();

            setFieldValue("type", v);
          }}
        />

        {values.type === ACCOUNT_TYPES_ID.CREDIT && (
          <>
            <Text className="text-xl font-semibold mt-2 -mb-1 dark:text-white">
              Información de crédito
            </Text>

            <Input
              label="Límite de crédito"
              type="number"
              value={formatNumber(creditValues.creditLimit)}
              onChangeText={(s) =>
                setCreditFieldValue("creditLimit", s.replaceAll(",", ""))
              }
              onBlur={() =>
                setCreditFieldValue(
                  "creditLimit",
                  Number(creditValues.creditLimit)
                )
              }
              selectTextOnFocus={true}
            />

            <View className="flex-row justify-between gap-2">
              <DaySelect
                value={creditValues.cutOffDay?.toString() as string}
                onSelect={(v) => setCreditFieldValue("cutOffDay", Number(v))}
              />

              <DaySelect
                value={creditValues.paymentDueDay?.toString() as string}
                onSelect={(v) =>
                  setCreditFieldValue("paymentDueDay", Number(v))
                }
              />
            </View>
          </>
        )}

        <View className="mt-2">
          <ErrorMessage />
        </View>
      </ScrollView>
    </BaseModal>
  );
};

export default Form;
