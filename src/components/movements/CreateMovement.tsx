import Button from "../forms/Button";
import Form from "./Form";

import useModal from "@/hooks/useModal";

const CreateMovement = () => {
  const { visible, closeModal, openModal } = useModal();

  return (
    <>
      <Button title="+" onPress={openModal} />

      <Form visible={visible} closeModal={closeModal} label="Crear registro" />
    </>
  );
};

export default CreateMovement;
