import Form from "./Form";

import { getNextPayDate } from "@/utils/plannings";

import useForm from "@/hooks/useForm";
import useTinybase from "@/hooks/useDatabase";
import usePlanning from "@/hooks/usePlanning";

interface Props {
  id: Id;
  visible: boolean;
  closeModal: () => void;
}

const EditPlanning = ({ id, visible, closeModal }: Props) => {
  const { update, remove, create } = useTinybase();

  const {
    planning,
    recurringInfo,
    recurringInfoId,
    currentPendingId,
    currentPending,
    payDaysIds,
    payDays,
    recurringType,
  } = usePlanning(id);

  if (!planning || !recurringInfo) return null;

  const { isUnique, isDaily } = recurringType;

  if (typeof planning === null) closeModal();
  if (!isUnique && typeof recurringInfo === null) closeModal();

  const { values, setFieldValue, validate, resetForm } = useForm<PlanningsForm>(
    {
      ...planning,

      interval: isUnique ? 1 : recurringInfo.interval,
      times: isUnique ? 1 : recurringInfo.times,
      startDate: isUnique ? 0 : recurringInfo.startDate,

      payDaysData: isUnique || isDaily ? undefined : [...payDays],
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
    } else if (values.date && values.startDate < values.date) return false;

    return true;
  };

  const onSubmit = () => {
    update("plannings", id, { ...values });

    if (!isUnique)
      update("recurringPlannings", recurringInfoId, {
        idPlanning: id,
        ...values,
      });

    let nextDate = currentPending?.date || 0;

    if (isUnique && values.date !== planning.date)
      nextDate = values.date as number;
    else if (isDaily && values.startDate !== recurringInfo.startDate)
      nextDate = values.startDate;
    else if (!isUnique && !isDaily && values.payDaysData !== undefined) {
      values.payDaysData.map((d, i) => {
        if (i < payDaysIds.length)
          update("payDaysPlannings", payDaysIds[i], {
            idPlanning: id,
            ...d,
          });
        else
          create("payDaysPlannings", {
            idPlanning: id,
            ...d,
          });
      });

      if (payDaysIds.length > values.payDaysData.length)
        payDaysIds
          .slice(values.payDaysData.length)
          .forEach((id) => remove("payDaysPlannings", id));

      nextDate = getNextPayDate(
        values.recurringType,
        values.startDate,
        values.interval,
        values.payDaysData || []
      );
    }

    if (
      currentPendingId !== undefined &&
      (values.date === undefined || (values.date && nextDate <= values.date))
    )
      update("historicPlannings", currentPendingId, {
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
