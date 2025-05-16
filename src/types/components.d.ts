interface PropsBaseModal {
  visible: boolean;
  closeModal: () => void;
  onSubmit: () => void;
  label: string;
  closeButtonLabel?: string;
  submitButtonLabel?: string;
  canSubmit?: boolean;
}

interface PropsMovementsForm {
  setOnSubmit: React.Dispatch<React.SetStateAction<() => void>>;
  setReset?: React.Dispatch<React.SetStateAction<() => void>>;
  setCanSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  movementId?: Id;
}
