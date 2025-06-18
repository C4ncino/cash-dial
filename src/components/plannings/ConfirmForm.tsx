import { KeyboardAvoidingView, ScrollView, Platform, Text } from "react-native";

import BaseModal from "@/BaseModal";

interface Props {
  visible: boolean;
  closeModal: () => void;
}

const ConfirmForm = ({ ...props }: Props) => {
  return (
    <BaseModal
      label="Confirmar Pago"
      submitButtonLabel="Guardar"
      onSubmit={() => {}}
      {...props}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          role="form"
          contentContainerClassName="px-4 gap-3 pb-32"
          keyboardShouldPersistTaps="handled"
        >
          <Text className="dark:text-white">Form</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseModal>
  );
};

export default ConfirmForm;
