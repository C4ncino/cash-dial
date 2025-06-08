import { View } from "react-native";

import Form from "./Form";
import Button from "@/widgets/Button";
import useForm from "@/hooks/useForm";
import useModal from "@/hooks/useModal";
import { PLANNINGS_TYPES_ID } from "@/db/ui";
import useTinybase from "@/hooks/useDatabase";
import { getNextPayDate } from "@/utils/plannings";
import { now } from "@/utils/dates";

const CreatePlanning = () => {
  const { openModal, closeModal, visible } = useModal();
  const { create } = useTinybase();

  const { values, setFieldValue, validate, resetForm } = useForm<PlanningsForm>(
    {
      idAccount: "",
      idCategory: "",
      name: "",
      amount: 0,
      currency: "0",
      type: 0,
      recurringType: 0,

      interval: 1,
      times: 1,
      startDate: Date.now(),
    }
  );

  const validateValues = () => {
    if (!validate()) return false;
    else if (values.amount <= 0) return false;
    else if (
      values.recurringType === PLANNINGS_TYPES_ID.UNIQUE &&
      (values.date === 0 || values.date === undefined)
    )
      return false;
    else if (values.recurringType !== PLANNINGS_TYPES_ID.UNIQUE) {
      if (values.interval <= 0) return false;
      else if (values.times <= 0) return false;

      if (
        values.recurringType !== PLANNINGS_TYPES_ID.DAILY &&
        (!values.payDaysData || values.payDaysData.length === 0)
      )
        return false;
    }

    return true;
  };

  const onSubmit = () => {
    const isUnique = values.recurringType === PLANNINGS_TYPES_ID.UNIQUE;
    const isDaily = values.recurringType === PLANNINGS_TYPES_ID.DAILY;

    const planningId = create("plannings", { ...values });

    if (!isUnique)
      create("recurringPlannings", {
        idPlanning: planningId as string,
        ...values,
      });

    let nextDate = 0;

    if (isUnique) nextDate = values.date as number;
    else if (isDaily) nextDate = values.startDate;
    else if (!isUnique && !isDaily && values.payDaysData !== undefined) {
      values.payDaysData.forEach((d) =>
        create("payDaysPlannings", {
          idPlanning: planningId as string,
          ...d,
        })
      );

      nextDate = getNextPayDate(
        values.recurringType,
        values.startDate,
        values.interval,
        values.payDaysData || []
      );
    }

    create("historicPlannings", {
      idPlanning: planningId as string,
      date: nextDate,
    });

    closeModal();
    resetForm();
  };

  return (
    <View>
      <Button title="Crear" onPress={openModal} />
      <Form
        submitButtonLabel="Crear"
        label="Planificación"
        {...{ visible, values, setFieldValue, onSubmit, closeModal }}
        canSubmit={validateValues()}
      />
    </View>
  );
};

export default CreatePlanning;
