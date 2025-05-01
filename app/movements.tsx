import { router } from "expo-router";
import colors from "tailwindcss/colors";
import { View, Text, SectionList } from "react-native";

import Button from "@/widgets/Button";
import DateTitle from "@/widgets/DateTitle";
import IncomeCard from "@/movements/incomes/Card";

import ReturnButton from "@/widgets/ReturnButton";
import EditMovement from "@/movements/EditMovement";
import ExpenseCard from "@/movements/expenses/Card";
import TransferCard from "@/movements/transfers/Card";
import CreateMovement from "@/movements/CreateMovement";

import { MOVEMENT_TYPES_ID } from "@/db/ui";
import { groupMovementsByDate } from "@/utils/movements";

import useModal from "@/hooks/useModal";
import useMovements from "@/hooks/useMovements";
import useEditMovement from "@/hooks/useEditMovement";

const Movements = () => {
  const { visible, closeModal, openModal } = useModal();
  const {
    visible: editVisible,
    closeModal: editCloseModal,
    type,
    movementId,
    onPress,
  } = useEditMovement();

  const movements = useMovements(groupMovementsByDate) as MovementsByDate[];

  return (
    <View>
      <View className="flex-row justify-between items-center mb-2 px-2">
        <ReturnButton onPress={() => router.back()} />
        <Text className="text-2xl font-semibold dark:text-white text-center">
          Movimientos
        </Text>

        <View className="m-2 p-1 w-24">
          <Button
            style="outline"
            title="Crear"
            color={colors.green[500]}
            onPress={openModal}
          />
        </View>
      </View>
      <SectionList
        className="px-6 max-w-2xl mx-auto"
        sections={movements}
        keyExtractor={(item) => item.date.toString()}
        renderItem={({ item }) => {
          if (item.type === "transfer") {
            return (
              <TransferCard
                movementId={item.id}
                onPress={(id) => onPress(id, MOVEMENT_TYPES_ID.TRANSFER)}
              />
            );
          } else if (item.type === "in") {
            return (
              <IncomeCard
                movementId={item.id}
                onPress={(id) => onPress(id, MOVEMENT_TYPES_ID.INCOME)}
              />
            );
          } else {
            return (
              <ExpenseCard
                movementId={item.id}
                onPress={(id) => onPress(id, MOVEMENT_TYPES_ID.EXPENSE)}
              />
            );
          }
        }}
        renderSectionHeader={({ section }) => <DateTitle date={section.date} />}
      />

      <EditMovement
        type={type}
        movementId={movementId}
        visible={editVisible}
        closeModal={editCloseModal}
      />
      <CreateMovement visible={visible} closeModal={closeModal} />
    </View>
  );
};

export default Movements;
