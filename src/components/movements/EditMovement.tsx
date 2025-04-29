import Form from "./Form";
import { MOVEMENT_TYPES_ID } from "@/db/ui";

interface Props {
  visible: boolean;
  closeModal: () => void;
  movementId: Id;
  type: MOVEMENT_TYPES_ID;
}

const EditMovement = (props: Props) =>  (
  <>
    {props.visible && <Form {...props} label="Editar registro" closeButtonLabel="Cancelar" /> }
  </>
);

export default EditMovement;
