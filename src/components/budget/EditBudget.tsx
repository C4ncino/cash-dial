import Form from "./Form";

import useTinybase from "@/hooks/useDatabase";
import useForm from "@/hooks/useForm";

interface Props {
  id: string;
  visible: boolean;
  closeModal: () => void;
}

const EditBudget = ({ closeModal, ...props }: Props) => {
  const { update, getById } = useTinybase();

  const budget = getById("budgets", props.id);

  if (!budget) return null;

  const { values, setFieldValue, validate, resetForm } =
    useForm<Row<"budgets">>(budget);

  const onSubmit = () => {
    if (typeof values.amountLimit === "string")
      values.amountLimit = Number(values.amountLimit);

    update("budgets", props.id, values);
    closeModal();
  };

  return (
    <Form
      label="Presupuesto"
      closeButtonLabel="Cancelar"
      values={values}
      setFieldValue={setFieldValue}
      canSubmit={validate() && values.amountLimit > 0}
      onSubmit={onSubmit}
      closeModal={() => {
        resetForm();
        closeModal();
      }}
      {...props}
    />
  );
};

export default EditBudget;
