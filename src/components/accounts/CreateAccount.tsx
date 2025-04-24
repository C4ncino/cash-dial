import { useState } from "react";
import { Text } from "react-native";

import { ACCOUNT_TYPES_ID } from "@/db/ui";
import ExitingView from "@/animations/ExitingView";
import { errors } from "@/messages/create-account";

import Form from "./Form";
import useForm from "@/hooks/useForm";
import useDatabase from "@/hooks/useDatabase";

interface Props {
  visible: boolean;
  closeModal: () => void;
}

const CreateAccount = ({ visible, closeModal }: Props) => {
  const { create } = useDatabase();
  const [error, setError] = useState("");
  const { setFieldValue, values, resetForm, validate } = useForm<
    Row<"accounts">
  >({
    name: "",
    currency: "0",
    currentBalance: 0,
    type: ACCOUNT_TYPES_ID.CASH,
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
    else if (values.type === ACCOUNT_TYPES_ID.CREDIT && !validateCredit())
      return setError(errors.INCOMPLETE);

    values.currentBalance = Number(values.currentBalance);
    if (isNaN(values.currentBalance)) return setError(errors.MUST_BE_NUMBER);

    const id = create("accounts", values);

    if (values.type === ACCOUNT_TYPES_ID.CREDIT) {
      creditValues.creditLimit = Number(creditValues.creditLimit);
      if (isNaN(creditValues.creditLimit))
        return setError(errors.MUST_BE_NUMBER_C);

      create("creditAccounts", { ...creditValues, idAccount: id });
    }

    resetForm();
    resetCreditForm();
    closeModal();
  };

  return (
    <Form
      label="Crea cuenta"
      visible={visible}
      closeModal={closeModal}
      submitButtonLabel="Crear"
      //----------------------------
      values={values}
      validValues={validate()}
      setFieldValue={setFieldValue}
      //----------------------------
      creditValues={creditValues}
      validCreditValues={validateCredit()}
      setCreditFieldValue={setCreditFieldValue}
      //----------------------------
      resetCreditForm={resetCreditForm}
      onSubmit={onSubmit}
      //----------------------------
      ErrorMessage={() => (
        <>
          {error && (
            <ExitingView onFinish={() => setError("")}>
              <Text
                className="text-red-500 text-center mt-1"
                aria-label="error"
              >
                {error}
              </Text>
            </ExitingView>
          )}
        </>
      )}
    />
  );
};

export default CreateAccount;
