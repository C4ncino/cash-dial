import colors from "tailwindcss/colors";
import { WarningSquare } from "iconoir-react-native";
import { Modal, Pressable, Text, View } from "react-native";

import Button from "./Button";

interface Props {
  visible: boolean;
  closeModal: () => void;
  onConfirm: () => void;
  confirmButtonLabel?: string;
  text: string;
}

const ConfirmationModal = ({
  visible,
  closeModal,
  text,
  onConfirm,
  confirmButtonLabel = "Borrar",
}: Props) => {
  return (
    <Modal visible={visible} transparent onRequestClose={closeModal}>
      <Pressable
        className="bg-zinc-500/50 w-full h-screen items-center justify-center"
        onPress={closeModal}
      >
        <View className="bg-white rounded-md w-80 p-4 gap-4">
          <View className="w-full">
            <View className="flex-row items-center justify-center gap-2">
              <WarningSquare height={24} width={24} color={colors.red[500]} />
              <Text className="text-2xl font-semibold text-red-500 text-center ">
                Cuidado
              </Text>
              <WarningSquare height={24} width={24} color={colors.red[500]} />
            </View>
            <Text className="text-base text-zinc-600 text-center">{text}</Text>
          </View>

          <View className="flex-row gap-2">
            <View className="flex-1">
              <Button title="Cancelar" onPress={closeModal} />
            </View>
            <View className="flex-1">
              <Button
                title={confirmButtonLabel}
                color={colors.red[500]}
                style="outline"
                onPress={() => {
                  onConfirm?.();
                  closeModal?.();
                }}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ConfirmationModal;
