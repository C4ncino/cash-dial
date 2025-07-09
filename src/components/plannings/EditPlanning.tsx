import Form from "./Form";

import { getNextPayDate } from "@/utils/plannings";

import useForm from "@/hooks/useForm";
import useTinybase from "@/hooks/useDatabase";
import useRecurringType from "@/hooks/useRecurringType";

interface Props {
  id: Id;
  visible: boolean;
  closeModal: () => void;
}

const EditPlanning = ({ id, visible, closeModal }: Props) => {
  const { update, getById, query, remove, create } = useTinybase();

  const planning = getById("plannings", id) as Row<"plannings">;

  const recurringPlanningId = query(
    "recurringPlannings",
    { type: "select", column: "idPlanning" },
    { type: "where", column: "idPlanning", operator: "==", value: id }
  ).ids[0];

  const recurringPlanning = getById(
    "recurringPlannings",
    recurringPlanningId
  ) as Row<"recurringPlannings">;

  const payDaysDataIds = query(
    "payDaysPlannings",
    { type: "select", column: "idPlanning" },
    { type: "where", column: "idPlanning", operator: "==", value: id }
  ).ids;

  const payDaysData = payDaysDataIds.map((id) => {
    const data = getById("payDaysPlannings", id) as Row<"payDaysPlannings">;
    return { day: data.day, month: data.month };
  });

  const { isUnique, isDaily } = useRecurringType(planning.recurringType);

  if (typeof planning === null) closeModal();
  if (!isUnique && typeof recurringPlanning === null) closeModal();

  const { values, setFieldValue, validate, resetForm } = useForm<PlanningsForm>(
    {
      ...planning,

      interval: isUnique ? 1 : recurringPlanning.interval,
      times: isUnique ? 1 : recurringPlanning.times,
      startDate: isUnique ? 0 : recurringPlanning.startDate,

      payDaysData: isUnique || isDaily ? undefined : [...payDaysData],
    }
  );

  const validateValues = () => {
    if (!validate()) return false;
    else if (values.amount <= 0) return false;
    else if (isUnique && (values.date === 0 || values.date === undefined))
      return false;
    else if (!isUnique) {
      if (values.interval <= 0) return false;
      else if (values.times <= 0) return false;

      if (!isDaily && (!values.payDaysData || values.payDaysData.length === 0))
        return false;
    }

    return true;
  };

  const onSubmit = () => {
    update("plannings", id, { ...values });

    if (!isUnique)
      update("recurringPlannings", recurringPlanningId, {
        idPlanning: id,
        ...values,
      });

    const idHistoric = query(
      "historicPlannings",
      { type: "select", column: "idPlanning" },
      { type: "select", column: "isPending" },
      { type: "where", column: "idPlanning", operator: "==", value: id },
      { type: "where", column: "isPending", operator: "==", value: true }
    ).ids[0];

    let nextDate = 0;

    if (isUnique && values.date !== planning.date)
      nextDate = values.date as number;
    else if (isDaily && values.startDate !== recurringPlanning.startDate)
      nextDate = values.startDate;
    else if (!isUnique && !isDaily && values.payDaysData !== undefined) {
      values.payDaysData.map((d, i) => {
        if (i < payDaysDataIds.length)
          update("payDaysPlannings", payDaysDataIds[i], {
            idPlanning: id,
            ...d,
          });
        else
          create("payDaysPlannings", {
            idPlanning: id,
            ...d,
          });
      });

      if (payDaysDataIds.length > values.payDaysData.length)
        payDaysDataIds
          .slice(values.payDaysData.length)
          .forEach((id) => remove("payDaysPlannings", id));

      nextDate = getNextPayDate(
        values.recurringType,
        values.startDate,
        values.interval,
        values.payDaysData || []
      );
    }

    console.log(nextDate);

    if (nextDate !== 0 && idHistoric !== undefined)
      update("historicPlannings", idHistoric, {
        idPlanning: id,
        date: nextDate,
      });

    closeModal();
  };

  return (
    <Form
      closeButtonLabel="Cancelar"
      label="Editar"
      {...{ visible, values, setFieldValue, onSubmit }}
      closeModal={() => {
        resetForm();
        closeModal();
      }}
      canSubmit={validateValues()}
      isEditing
    />
  );
};

export default EditPlanning;
