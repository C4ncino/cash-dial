import { useState } from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";

import BaseModal from "@/BaseModal";
import IncomesForm from "./incomes/Form";
import ExpensesForm from "./expenses/Form";
import TransfersForm from "./transfers/Form";

import SegmentedControl from "@/forms/SegmentedControl";
import { MOVEMENT_TYPES, MOVEMENT_TYPES_ID } from "@/db/ui";

interface Props extends Omit<PropsBaseModal, "onSubmit" | "canSubmit"> {
  type: MOVEMENT_TYPES_ID;
  movementId?: Id;
}

const Form = ({type = MOVEMENT_TYPES_ID.EXPENSE, movementId, closeModal, ...props }: Props) => {
  const [movementType, setType] = useState(type);
  const [onSubmit, setOnSubmit] = useState(() => () => {});
  const [canSubmit, setCanSubmit] = useState(false);

  const formProps = { setOnSubmit, setCanSubmit, movementId };  

  return (
    <BaseModal
      {...props}
      onSubmit={() => {
        onSubmit();
        closeModal();
      }}
      canSubmit={canSubmit}
      closeModal={() => {
        closeModal();
      }}
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
            data={Object.values(MOVEMENT_TYPES)}
            value={movementType}
            onChange={(v) => {
              setType(v as MOVEMENT_TYPES_ID )
              setOnSubmit(() => () => {});
              setCanSubmit(false);
            }}
            readonly={!!movementId}
          />

          {movementType === MOVEMENT_TYPES_ID.EXPENSE ? (
            <ExpensesForm {...formProps} />
          ) : movementType === MOVEMENT_TYPES_ID.INCOME ? (
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
