import Form from "./Form";

interface Props {
  visible: boolean;
  closeModal: () => void;
}

const CreateMovement = ({ visible, closeModal }: Props) => {
  return (
    <Form
      visible={visible}
      closeModal={closeModal}
      label="Crear registro"
      submitButtonLabel="Crear"
    />
  );
};

export default CreateMovement;
