import { useMemo } from "react";
import { Text } from "react-native";
import colors from "tailwindcss/colors";

import { PLANNINGS_TYPES_ID } from "@/db/ui";
import { getDayRange, IsToday, IsTomorrow } from "@/utils/dates";

import useTinybase from "@/hooks/useDatabase";
import { useSystemContext } from "@/contexts/hooks";

interface Props {
  idPlanning: string;
  recurringType: PLANNINGS_TYPES_ID;
}

const NextDate = ({ idPlanning, recurringType }: Props) => {
  const { isDark } = useSystemContext();
  const { query, useRowById, getById } = useTinybase();

  const isDaily = recurringType === PLANNINGS_TYPES_ID.DAILY;

  const historicPlanning = useRowById(
    "historicPlannings",
    query(
      "historicPlannings",
      { type: "select", column: "idPlanning" },
      { type: "select", column: "isPending" },
      {
        type: "where",
        column: "idPlanning",
        operator: "==",
        value: idPlanning,
      },
      { type: "where", column: "isPending", operator: "==", value: true }
    ).ids[0]
  );

  if (!historicPlanning) return null;

  // TODO: Test after add completing payment form
  const dailyPays = useMemo(() => {
    if (!isDaily) return null;

    const { start, end } = getDayRange(historicPlanning.date);

    const config = getById(
      "recurringPlannings",
      query(
        "recurringPlannings",
        {
          type: "select",
          column: "idPlanning",
        },
        {
          type: "where",
          column: "idPlanning",
          operator: "==",
          value: idPlanning,
        }
      ).ids[0]
    );

    const todayPay = query(
      "historicPlannings",
      { type: "select", column: "idPlanning" },
      { type: "select", column: "date" },
      { type: "select", column: "isPending" },
      {
        type: "where",
        column: "idPlanning",
        operator: "==",
        value: idPlanning,
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

    return { paid: todayPay.ids.length, missing: config?.times };
  }, []);

  const today = new Date();
  const diffTime = historicPlanning.date - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isToday = IsToday(historicPlanning.date);
  const isTomorrow = IsTomorrow(historicPlanning.date);

  const color = isToday
    ? colors.red[500]
    : isTomorrow
      ? colors.amber[500]
      : isDark
        ? colors.zinc[300]
        : colors.zinc[700];

  return (
    <Text className="text-sm" style={{ color }}>
      Pagar {isToday ? "hoy !!" : isTomorrow ? "mañana" : `en ${diffDays} días`}
      {isDaily &&
        dailyPays &&
        ` (${dailyPays.paid}\u200A/\u200A${dailyPays.missing})`}
    </Text>
  );
};

export default NextDate;
