import { useEffect } from "react";
import useTinybase from "./useDatabase";

type MovementTable = "incomes" | "expenses" | "transfers";

interface Params<T extends MovementTable> {
  table: T;
  values: Row<T>;
  movementId?: Id;
  resetForm: () => void;
  validate: () => boolean;
  setReset?: (resetForm: () => void) => void;
  setOnSubmit: (onSubmit: () => void) => void;
  setCanSubmit: (canSubmit: boolean) => void;
}

const useMovementForm = <T extends MovementTable>(params: Params<T>) => {
  const {
    table,
    values,
    movementId,
    resetForm,
    validate,
    setReset,
    setOnSubmit,
    setCanSubmit,
  } = params;

  const { create, update } = useTinybase();

  useEffect(() => {
    setReset && setReset(() => resetForm);
  }, []);

  const onSubmit = () => {
    if (typeof values.amount === "string")
      values.amount = Number(values.amount);

    if (movementId) update(table, movementId, values);
    else {
      create(table, values);
      resetForm();
    }
  };

  useEffect(() => {
    if (validate() && values.amount > 0) {
      setCanSubmit(true);
      setOnSubmit(() => onSubmit);
    } else setCanSubmit(false);
  }, [values]);
};

export default useMovementForm;
