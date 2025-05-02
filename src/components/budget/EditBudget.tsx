import Form from "./Form";

import useTinybase from "@/hooks/useDatabase";
import useForm from "@/hooks/useForm";

interface Props {
  id: string;
  visible: boolean;
  closeModal: () => void;
}

const EditBudget = (props: Props) => {
  const { update, getById } = useTinybase();

  const budget = getById("budgets", props.id);

  if (!budget) return null;

  const { values, setFieldValue, validate } = useForm<Row<"budgets">>(budget);

  const onSubmit = () => {
    update("budgets", props.id, values);
    props.closeModal();
  };

  return (
    <Form
      label="Presupuesto"
      closeButtonLabel="Cancelar"
      values={values}
      setFieldValue={setFieldValue}
      canSubmit={validate() && values.amountLimit > 0}
      onSubmit={onSubmit}
      {...props}
    />
  );
};

export default EditBudget;
