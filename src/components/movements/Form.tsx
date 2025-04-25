import { useState } from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";

import BaseModal from "@/BaseModal";
import IncomesForm from "./incomes/Form";
import ExpensesForm from "./expenses/Form";
import TransfersForm from "./transfers/Form";

import SegmentedControl from "@/forms/SegmentedControl";

interface Props extends Omit<PropsBaseModal, "onSubmit" | "canSubmit"> {}

const movementTypes = [
  {
    id: 0,
    name: "Gasto",
  },
  {
    id: 1,
    name: "Ingreso",
  },
  {
    id: 2,
    name: "Transferencia",
  },
];

const Form = ({ ...props }: Props) => {
  const [type, setType] = useState(0);
  const [onSubmit, setOnSubmit] = useState(() => () => {});
  const [canSubmit, setCanSubmit] = useState(false);

  const formProps = { setOnSubmit, setCanSubmit };

  return (
    <BaseModal
      {...props}
      onSubmit={() => {
        onSubmit();
        props.closeModal();
      }}
      canSubmit={canSubmit}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          role="form"
          contentContainerClassName="gap-3 px-4 flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          <SegmentedControl
            data={movementTypes}
            value={type}
            onChange={(v) => setType(v as number)}
          />

          {type === 0 ? (
            <ExpensesForm {...formProps} />
          ) : type === 1 ? (
            <IncomesForm {...formProps} />
          ) : (
            <TransfersForm {...formProps} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseModal>
  );
};

export default Form;
