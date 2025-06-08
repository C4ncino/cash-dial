import { useState } from "react";
import useModal from "./useModal";

const useUpdateMovement = () => {
  const [type, setType] = useState(0);
  const [movementId, setMovementId] = useState<Id>("");
  const { visible, closeModal, openModal } = useModal();

  const onPress = (id: Id, type: number) => {
    setMovementId(id);
    setType(type);
    openModal();
  };

  return { visible, closeModal, type, movementId, onPress };
};

export default useUpdateMovement;
