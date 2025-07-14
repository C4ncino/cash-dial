import { useMemo } from "react";
import { View } from "react-native";

import Button from "@/widgets/Button";
import ConfirmationModal from "@/widgets/ConfirmationModal";

import { PLANNING_STAGES_ID } from "@/db/ui";
import { getNextPayDate } from "@/utils/plannings";

import useModal from "@/hooks/useModal";
import useTinybase from "@/hooks/useDatabase";
import usePlanning from "@/hooks/usePlanning";

interface Props {
  id: Id;
}

const CancelPayment = ({ id }: Props) => {
  const cancelModal = useModal();

  const { update, create } = useTinybase();

  const {
    planning,
    currentPendingId,
    currentPending,
    recurringType,
    payDays,
    recurringInfo,
    dailyPays,
  } = usePlanning(id);

  if (!planning || !currentPending || !recurringInfo) {
    cancelModal.closeModal();
    return null;
  }

  const { isUnique } = recurringType;

  const prevDate = useMemo(() => {
    let prevDate = planning.date;
    if (!isUnique) prevDate = currentPending.date;

    return prevDate;
  }, [planning.date, currentPending.date, isUnique]);

  const onCancel = () => {
    update("historicPlannings", currentPendingId, {
      idPlanning: id,
      status: PLANNING_STAGES_ID.CANCELLED,
      amount: planning.amount,
      date: prevDate as number,
    });

    if (!isUnique) {
      const nextDate = getNextPayDate(
        planning.recurringType,
        prevDate as number,
        recurringInfo.interval,
        payDays,
        !((dailyPays?.paid as number) + 1 === dailyPays?.missing)
      );

      create("historicPlannings", {
        idPlanning: id,
        date: nextDate,
      });
    }

    cancelModal.closeModal();
  };

  return (
    <View>
      <Button
        title="Cancelar"
        color="red"
        style="outline"
        onPress={cancelModal.openModal}
      />

      <ConfirmationModal
        text="¿Esta seguro que desea cancelar el pago? Esto no se puede deshacer."
        onConfirm={onCancel}
        confirmButtonLabel="Cancelar"
        {...cancelModal}
      />
    </View>
  );
};

export default CancelPayment;
