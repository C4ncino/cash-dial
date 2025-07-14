import { Fragment, useState } from "react";
import { View, Text } from "react-native";

import IncomeCard from "./incomes/Card";
import ExpenseCard from "./expenses/Card";
import TransferCard from "./transfers/Card";

import EditMovement from "./EditMovement";

import Link from "@/widgets/Link";
import { MOVEMENT_TYPES_ID } from "@/db/ui";
import ConfirmationModal from "@/widgets/ConfirmationModal";

import useModal from "@/hooks/useModal";
import useMovements from "@/hooks/useMovements";
import useEditMovement from "@/hooks/useEditMovement";

interface Props {
  onEdit?: () => void;
  afterEdit?: () => void;
}

const MovementsLanding = ({ onEdit, afterEdit }: Props) => {
  const { visible, closeModal, type, movementId, onPress } = useEditMovement();
  const deleteModal = useModal();
  const movements = useMovements((data) =>
    data.sort((a, b) => b.date - a.date)
  );

  const [onDelete, setOnDelete] = useState(() => () => {});

  const openModal = (id: Id, movementType: MOVEMENT_TYPES_ID) => {
    onPress(id, movementType);
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <>
      <View className="w-full max-w-2xl mx-auto px-4 py-4 rounded-md bg-zinc-100 dark:bg-zinc-950">
        <Text className="text-2xl font-semibold dark:text-white pb-2">
          Últimos movimientos
        </Text>

        {movements.slice(0, 3).map((movement, i) => (
          <Fragment key={i}>
            {movement.type === "out" ? (
              <ExpenseCard
                onLongPress={deleteModal.openModal}
                setOnDelete={setOnDelete}
                movementId={movement.id}
                onPress={(id: string) =>
                  openModal(id, MOVEMENT_TYPES_ID.EXPENSE)
                }
              />
            ) : movement.type === "in" ? (
              <IncomeCard
                onLongPress={deleteModal.openModal}
                setOnDelete={setOnDelete}
                movementId={movement.id}
                onPress={(id: string) =>
                  openModal(id, MOVEMENT_TYPES_ID.INCOME)
                }
              />
            ) : (
              <TransferCard
                onLongPress={deleteModal.openModal}
                setOnDelete={setOnDelete}
                movementId={movement.id}
                onPress={(id: string) =>
                  openModal(id, MOVEMENT_TYPES_ID.TRANSFER)
                }
              />
            )}
          </Fragment>
        ))}

        <Link className="justify-end" href="/movements" label="Mostrar más" />
      </View>

      <EditMovement
        visible={visible}
        closeModal={() => {
          if (afterEdit) {
            afterEdit();
          }
          closeModal();
        }}
        movementId={movementId}
        type={type}
      />

      <ConfirmationModal
        onConfirm={onDelete}
        text="Seguro que desea eliminar este movimiento? No podrá deshacerlo."
        {...deleteModal}
      />
    </>
  );
};

export default MovementsLanding;
