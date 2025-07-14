import useTinybase from "./useDatabase";
import useRecurringType from "./useRecurringType";

import { getDayRange } from "@/utils/dates";
import { PLANNING_STAGES_ID, PLANNINGS_TYPES_ID } from "@/db/ui";

const usePlanning = (id: Id) => {
  const { useRowById, query, getById } = useTinybase();

  const planning = useRowById("plannings", id);

  const recurringType = useRecurringType(
    planning?.recurringType as PLANNINGS_TYPES_ID
  );

  const recurringInfoId = query(
    "recurringPlannings",
    { type: "select", column: "idPlanning" },
    { type: "where", column: "idPlanning", operator: "==", value: id }
  ).ids[0];

  const recurringInfo = useRowById("recurringPlannings", recurringInfoId as Id);

  const payDaysIds = query(
    "payDaysPlannings",
    { type: "select", column: "idPlanning" },
    { type: "where", column: "idPlanning", operator: "==", value: id }
  ).ids;

  const payDays = payDaysIds.map((id) => {
    const data = getById("payDaysPlannings", id) as Row<"payDaysPlannings">;
    return { day: data.day, month: data.month };
  });

  const history = query(
    "historicPlannings",
    { type: "select", column: "idPlanning" },
    { type: "select", column: "status" },
    {
      type: "where",
      column: "idPlanning",
      operator: "==",
      value: id,
    },
    {
      type: "where",
      column: "status",
      operator: "!=",
      value: PLANNING_STAGES_ID.PENDING,
    }
  ).ids.map(
    (id) => getById("historicPlannings", id) as Row<"historicPlannings">
  );

  const currentPendingId = query(
    "historicPlannings",
    { type: "select", column: "idPlanning" },
    { type: "select", column: "status" },
    { type: "where", column: "idPlanning", operator: "==", value: id },
    {
      type: "where",
      column: "status",
      operator: "==",
      value: PLANNING_STAGES_ID.PENDING,
    }
  ).ids[0];

  const currentPending = useRowById("historicPlannings", currentPendingId);

  let dailyPays = null;

  if (recurringType.isDaily) {
    const { start, end } = getDayRange(currentPending?.date as number);

    const todayPay = query(
      "historicPlannings",
      { type: "select", column: "idPlanning" },
      { type: "select", column: "date" },
      { type: "select", column: "status" },
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
        column: "status",
        operator: "!=",
        value: PLANNING_STAGES_ID.PENDING,
      }
    );

    dailyPays = { paid: todayPay.ids.length, missing: recurringInfo?.times };
  }

  return {
    planning,
    recurringType,
    recurringInfoId,
    recurringInfo,
    payDaysIds,
    payDays,
    history,
    currentPendingId,
    currentPending,
    dailyPays,
  };
};

export default usePlanning;
