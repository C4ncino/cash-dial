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
  id: Id;
}
const EditAccount = ({ visible, closeModal, id }: Props) => {
  const { update, getById, query } = useDatabase();
  const [error, setError] = useState("");

  const data = getById("accounts", id);
  const creditData = getById("creditAccounts", id);

  if (!data) return null;
  else if (data.type === ACCOUNT_TYPES_ID.CREDIT && !creditData) return null;

  const { setFieldValue, values, resetForm, validate } =
    useForm<Row<"accounts">>(data);

  const {
    values: creditValues,
    setFieldValue: setCreditFieldValue,
    resetForm: resetCreditForm,
    validate: validateCredit,
  } = useForm<Row<"creditAccounts">>(
    creditData || { creditLimit: 0, cutOffDay: NaN, paymentDueDay: NaN }
  );

  const onSubmit = () => {
    setError("");

    if (!validate()) return setError(errors.INCOMPLETE);
    else if (values.type === ACCOUNT_TYPES_ID.CREDIT && !validateCredit())
      return setError(errors.INCOMPLETE);

    values.currentBalance = Number(values.currentBalance);
    if (isNaN(values.currentBalance)) return setError(errors.MUST_BE_NUMBER);

    update("accounts", id, values);

    if (values.type === ACCOUNT_TYPES_ID.CREDIT) {
      creditValues.creditLimit = Number(creditValues.creditLimit);
      if (isNaN(creditValues.creditLimit))
        return setError(errors.MUST_BE_NUMBER_C);

      const { ids } = query(
        "creditAccounts",
        { type: "select", column: "idAccount" },
        {
          type: "where",
          column: "idAccount",
          value: id,
          operator: "==",
        }
      );

      update("creditAccounts", ids[0], { ...creditValues });
    }

    closeModal();
  };

  return (
    <Form
      label="Editar cuenta"
      closeButtonLabel="Cancelar"
      visible={visible}
      closeModal={() => {
        resetForm();
        resetCreditForm();
        closeModal();
      }}
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

export default EditAccount;
