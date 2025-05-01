import { Fragment } from "react";
import { View, Text } from "react-native";

import IncomeCard from "./incomes/Card";
import ExpenseCard from "./expenses/Card";
import TransferCard from "./transfers/Card";

import EditMovement from "./EditMovement";

import Link from "@/widgets/Link";
import { MOVEMENT_TYPES_ID } from "@/db/ui";

import useMovements from "@/hooks/useMovements";
import useEditMovement from "@/hooks/useEditMovement";

const MovementsLanding = () => {
  const { visible, closeModal, type, movementId, onPress } = useEditMovement();
  const movements = useMovements((data) =>
    data.sort((a, b) => b.date - a.date)
  );

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
                movementId={movement.id}
                onPress={(id: string) => onPress(id, MOVEMENT_TYPES_ID.EXPENSE)}
              />
            ) : movement.type === "in" ? (
              <IncomeCard
                movementId={movement.id}
                onPress={(id: string) => onPress(id, MOVEMENT_TYPES_ID.INCOME)}
              />
            ) : (
              <TransferCard
                movementId={movement.id}
                onPress={(id: string) =>
                  onPress(id, MOVEMENT_TYPES_ID.TRANSFER)
                }
              />
            )}
          </Fragment>
        ))}

        <Link className="justify-end" href="/movements" label="Mostrar más" />
      </View>

      <EditMovement
        visible={visible}
        closeModal={closeModal}
        movementId={movementId}
        type={type}
      />
    </>
  );
};

export default MovementsLanding;
