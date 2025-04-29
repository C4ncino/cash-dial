import colors from "tailwindcss/colors";
import { Pressable } from "react-native";
import { Plus } from "iconoir-react-native";

import Form from "./Form";
import useModal from "@/hooks/useModal";

const CreateMovement = () => {
  const { visible, closeModal, openModal } = useModal();

  return (
    <>
      <Pressable className="absolute right-4 bottom-8 rounded-full bg-green-600 p-1" onPress={openModal}>
        <Plus width={40} height={40} color={colors.white} />        
      </Pressable>

      <Form visible={visible} closeModal={closeModal} label="Crear registro" submitButtonLabel="Crear"  />
    </>
  );
};

export default CreateMovement;
