import { useState } from "react";
import BaseModal from "./BaseModal";
import { Text, Button, View, ScrollView } from "react-native";

import Input from "@/forms/Input";
import Select from "@/forms/Select";
import SegmentedControl from "@/forms/SegmentedControl";

import useForm from "@/hooks/useForm";
import { ACCOUNT_TYPES, DAYS } from "@/db/ui";
import { errors } from "@/messages/create-account";

import ExitingView from "@/animations/ExitingView";
import useDatabase from "@/hooks/useDatabase";

interface Props {
  visible: boolean;
  closeModal: () => void;
}

const CreateAccount = ({ visible, closeModal }: Props) => {
  const [error, setError] = useState("");
  const { create } = useDatabase();

  const { setFieldValue, values, resetForm, validate } = useForm<
    Row<"accounts">
  >({
    name: "",
    currentBalance: 0,
    type: ACCOUNT_TYPES.CASH.id,
  });
  const {
    values: creditValues,
    setFieldValue: setCreditFieldValue,
    resetForm: resetCreditForm,
    validate: validateCredit,
  } = useForm<Row<"creditAccounts">>({
    creditLimit: 0,
    cutOffDay: NaN,
    paymentDueDay: NaN,
  });

  const onSubmit = () => {
    setError("");

    if (!validate()) return setError(errors.INCOMPLETE);
    else if (values.type === 2 && !validateCredit())
      return setError(errors.INCOMPLETE);

    const id = create("accounts", values);

    if (values.type === ACCOUNT_TYPES.CREDIT.id)
      create("creditAccounts", { ...creditValues, idAccount: id });

    resetForm();
    resetCreditForm();
    closeModal();
  };

  return (
    <BaseModal visible={visible} closeModal={closeModal}>
      <Text className="text-2xl font-semibold text-center my-2 dark:text-white">
        Crea una nueva cuenta
      </Text>

      <ScrollView role="form" contentContainerClassName="pb-16 gap-3 px-4">
        <Input
          label="Nombre"
          type="text"
          value={values.name}
          onChangeText={(s) => setFieldValue("name", s)}
          enterKeyHint="next"
        />
        <Input
          label="Saldo inicial"
          type="number"
          value={values.currentBalance?.toString()}
          onChangeText={(s) => setFieldValue("currentBalance", s)}
          selectTextOnFocus={true}
        />

        <SegmentedControl
          label="Tipo de cuenta"
          data={Object.values(ACCOUNT_TYPES)}
          value={values.type}
          onChange={(v) => {
            if (v !== ACCOUNT_TYPES.CREDIT.id) resetCreditForm();

            setFieldValue("type", v);
          }}
        />

        {values.type === ACCOUNT_TYPES.CREDIT.id && (
          <>
            <Text className="text-xl font-semibold mt-2 -mb-1 dark:text-white">
              Información de crédito
            </Text>

            <Input
              label="Límite de crédito"
              type="number"
              value={creditValues.creditLimit?.toString()}
              onChangeText={(s) => setCreditFieldValue("creditLimit", s)}
              selectTextOnFocus={true}
            />

            <View className="flex-row justify-between gap-2">
              <Select
                label="Fecha de corte"
                placeholder="Elija un día"
                labelField="id"
                valueField="id"
                data={DAYS}
                renderItem={(item) => (
                  <Text
                    className={`bg-white dark:text-white dark:bg-zinc-900 text-xl px-4 py-2`}
                  >
                    {item.id}
                  </Text>
                )}
                value={creditValues.cutOffDay?.toString() as string}
                onSelect={(s) => {
                  const day = Number(s.id);
                  setCreditFieldValue("cutOffDay", day);

                  if (day <= 8)
                    setCreditFieldValue("paymentDueDay", Number(s.id) + 20);
                }}
                maxHeight={160}
              />

              <Select
                label="Fecha límite de pago"
                placeholder="Elija un día"
                labelField="id"
                valueField="id"
                data={DAYS}
                renderItem={(item) => (
                  <Text
                    className={`bg-white dark:text-white dark:bg-zinc-900 text-xl px-4 py-2`}
                  >
                    {item.id}
                  </Text>
                )}
                value={creditValues.paymentDueDay?.toString() as string}
                onSelect={(s) => {
                  setCreditFieldValue("paymentDueDay", s.id);
                }}
                maxHeight={160}
              />
            </View>
          </>
        )}

        <View className="mt-2">
          <Button
            onPress={onSubmit}
            title="Crear cuenta"
            disabled={
              (values.type !== ACCOUNT_TYPES.CREDIT.id && !validate()) ||
              (values.type === ACCOUNT_TYPES.CREDIT.id &&
                (!validate() || !validateCredit()))
            }
          />
          {error && (
            <ExitingView onFinish={() => setError("")}>
              <Text className="text-red-500 text-center mt-1">{error}</Text>
            </ExitingView>
          )}
        </View>
      </ScrollView>
    </BaseModal>
  );
};

export default CreateAccount;
