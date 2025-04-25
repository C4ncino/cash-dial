import colors from "tailwindcss/colors";
import { PropsWithChildren } from "react";
import { Modal, View, Text } from "react-native";

import Button from "./widgets/Button";

interface Props extends PropsWithChildren, PropsBaseModal {}

const BaseModal = ({
  children,
  visible,
  closeModal,
  onSubmit,
  label,
  closeButtonLabel = "Cerrar",
  submitButtonLabel = "Guardar",
  canSubmit = false,
}: Props) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={closeModal}
      presentationStyle="formSheet"
    >
      <View className="px-2 py-2 flex-1 dark:bg-zinc-900">
        <View
          role="presentation"
          className="py-2 my-2 flex-row items-center px-4 ios:px-0"
        >
          <View className="w-1/4">
            <Button
              title={closeButtonLabel}
              onPress={closeModal}
              color={colors.red[600]}
              style="outline"
            />
          </View>
          <Text className="text-2xl font-semibold text-center dark:text-white flex-1">
            {label}
          </Text>
          <View className="w-1/4">
            <Button
              onPress={onSubmit}
              title={submitButtonLabel}
              disabled={!canSubmit}
            />
          </View>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default BaseModal;
