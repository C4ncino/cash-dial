import { PropsWithChildren } from "react";
import { Modal, ScrollView, View } from "react-native";

interface Props extends PropsWithChildren {
  visible: boolean;
  closeModal: () => void;
}

const BaseModal = ({ children, visible, closeModal }: Props) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={closeModal}
      presentationStyle="formSheet"
    >
      <ScrollView contentContainerClassName="px-2 py-2 flex-1 dark:bg-zinc-900">
        {children}
      </ScrollView>
    </Modal>
  );
};

export default BaseModal;
