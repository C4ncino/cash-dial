import { KeyboardAvoidingView, ScrollView, Platform, Text } from "react-native";

import BaseModal from "@/BaseModal";

import Input from "@/forms/Input";
import DatePicker from "@/forms/DatePicker";

import { getDayRange } from "@/utils/dates";
import { formatNumber } from "@/utils/formatters";
import { getNextPayDate } from "@/utils/plannings";

import useForm from "@/hooks/useForm";
import useTinybase from "@/hooks/useDatabase";
import useRecurringType from "@/hooks/useRecurringType";

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
  const { useRowById, query, update, create } = useTinybase();

  const planning = useRowById("plannings", id);

  const idHistoric = query(
    "historicPlannings",
    { type: "select", column: "idPlanning" },
    { type: "select", column: "isPending" },
    { type: "where", column: "idPlanning", operator: "==", value: id },
    { type: "where", column: "isPending", operator: "==", value: true }
  ).ids[0];

  const historicPlanning = useRowById("historicPlannings", idHistoric);

  if (!planning || !historicPlanning) {
    props.closeModal();
    return null;
  }

  const { isUnique, isDaily } = useRecurringType(planning.recurringType);

  let date = planning.date;
  if (!isUnique) date = historicPlanning.date;

  const { values, setFieldValue, validate } = useForm<ConfirmPlanning>({
    date: date as number,
    amount: planning.amount,
  });

  const onSubmit = () => {
    update("historicPlannings", idHistoric, {
      idPlanning: id,
      isPending: false,
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

    if (isUnique) {
      const { ids, results } = query(
        "recurringPlannings",
        {
          type: "select",
          column: "idPlanning",
        },
        {
          type: "select",
          column: "interval",
        },
        {
          type: "select",
          column: "times",
        },
        {
          type: "where",
          column: "idPlanning",
          operator: "==",
          value: id,
        }
      );

      const recurringInfo = results[ids[0]];

      const { ids: _, results: historicResults } = query(
        "payDaysPlannings",
        {
          type: "select",
          column: "idPlanning",
        },
        {
          type: "select",
          column: "day",
        },
        {
          type: "select",
          column: "month",
        },
        {
          type: "where",
          column: "idPlanning",
          operator: "==",
          value: id,
        }
      );

      const payDays = Object.values(historicResults).map(({ day, month }) => ({
        day,
        month,
      }));

      let needRepeatToday = false;

      if (isDaily) {
        const { start, end } = getDayRange(date as number);

        const todayPay = query(
          "historicPlannings",
          { type: "select", column: "idPlanning" },
          { type: "select", column: "date" },
          { type: "select", column: "isPending" },
          {
            type: "where",
            column: "idPlanning",
            operator: "==",
            value: id,
          },
          {
            type: "where",
            column: "date",
            operator: ">=",
            value: start,
          },
          {
            type: "where",
            column: "date",
            operator: "<=",
            value: end,
          },
          {
            type: "where",
            column: "isPending",
            operator: "==",
            value: false,
          }
        );

        needRepeatToday = todayPay.ids.length < recurringInfo.times;
      }

      const nextDate = getNextPayDate(
        planning.recurringType,
        date as number,
        recurringInfo.interval,
        payDays,
        needRepeatToday
      );

      create("historicPlannings", {
        idPlanning: id,
        isPending: true,
        amount: values.amount,
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
            value={date}
            onSelect={(v) => setFieldValue("date", v)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseModal>
  );
};

export default ConfirmForm;
