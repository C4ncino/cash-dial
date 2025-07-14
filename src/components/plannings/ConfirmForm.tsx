import { useEffect, useMemo } from "react";
import { KeyboardAvoidingView, ScrollView, Platform, Text } from "react-native";

import BaseModal from "@/BaseModal";

import Input from "@/forms/Input";
import DatePicker from "@/forms/DatePicker";

import { PLANNING_STAGES_ID } from "@/db/ui";
import { formatNumber } from "@/utils/formatters";
import { getNextPayDate } from "@/utils/plannings";

import useForm from "@/hooks/useForm";
import useTinybase from "@/hooks/useDatabase";
import usePlanning from "@/hooks/usePlanning";

interface Props {
  id: Id;
  visible: boolean;
  closeModal: () => void;
}

type ConfirmPlanning = {
  date: number;
  amount: number;
  comment?: string;
};

const ConfirmForm = ({ id, ...props }: Props) => {
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
    props.closeModal();
    return null;
  }

  const { isUnique } = recurringType;

  const prevDate = useMemo(() => {
    let prevDate = planning.date;
    if (!isUnique) prevDate = currentPending.date;

    return prevDate;
  }, [planning.date, currentPending.date, isUnique]);

  const { values, setFieldValue, validate } = useForm<ConfirmPlanning>({
    date: prevDate as number,
    amount: planning.amount,
  });

  useEffect(() => {
    setFieldValue("date", prevDate as number);
  }, [prevDate]);

  const onSubmit = () => {
    update("historicPlannings", currentPendingId, {
      idPlanning: id,
      status: PLANNING_STAGES_ID.COMPLETED,
      amount: values.amount,
      date: values.date as number,
    });

    const movementData = {
      idAccount: planning.idAccount,
      idCategory: planning.idCategory,
      amount: values.amount,
      currency: planning.currency,
      date: values.date as number,
      description: `Movimiento automático de ${planning.name}`,
    };

    if (planning.type === 1) create("incomes", movementData);
    else
      create("expenses", {
        ...movementData,
        msi: 0,
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

    props.closeModal();
  };

  return (
    <BaseModal
      label="Confirmar Pago"
      submitButtonLabel="Guardar"
      onSubmit={onSubmit}
      canSubmit={validate()}
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
          <Text className="text-xl font-semibold dark:text-white text-center">
            {planning.name}
          </Text>
          <Text className="text-center px-8 -mb-3">
            Es importante que una vez confirmado el pago{" "}
            <Text className="font-bold">no se pueda editar</Text>
          </Text>

          <Input
            label="Cantidad"
            type="number"
            value={formatNumber(values.amount)}
            onChangeText={(s) => setFieldValue("amount", s.replaceAll(",", ""))}
            onBlur={() => setFieldValue("amount", Number(values.amount))}
            selectTextOnFocus
          />

          <DatePicker
            needReset
            label="Fecha de pago"
            value={values.date}
            onSelect={(v) => setFieldValue("date", v)}
            minimumDate={new Date(values.date as number)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseModal>
  );
};

export default ConfirmForm;
