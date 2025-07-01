import useTinybase from "@/hooks/useDatabase";
import Form from "./Form";
import useForm from "@/hooks/useForm";

interface Props {
  visible: boolean;
  closeModal: () => void;
}

const CreateBudget = (props: Props) => {
  const { create } = useTinybase();
  const { values, setFieldValue, validate, resetForm } = useForm<
    Row<"budgets">
  >({
    idCategory: "",
    name: "",
    amountLimit: 0,
    type: 0,
    currency: "0",
    startDate: Date.now(),
  });

  const onSubmit = () => {
    const id = create("budgets", values);
    resetForm();
    props.closeModal();
  };

  return (
    <Form
      label="Presupuesto"
      submitButtonLabel="Crear"
      values={values}
      setFieldValue={setFieldValue}
      canSubmit={validate() && values.amountLimit > 0}
      onSubmit={onSubmit}
      {...props}
    />
  );
};

export default CreateBudget;
