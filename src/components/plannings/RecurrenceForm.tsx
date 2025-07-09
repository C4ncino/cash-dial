import colors from "tailwindcss/colors";
import { View, Text, Pressable } from "react-native";
import { MinusCircle, Plus } from "iconoir-react-native";

import Input from "@/forms/Input";
import DaySelector from "@/forms/DaySelector";
import DayMonthSelect from "@/forms/DayMonthSelect";

import { formatInt } from "@/utils/formatters";

import useRecurringType from "@/hooks/useRecurringType";

interface Props {
  values: PlanningsForm;
  setFieldValue: (
    field: keyof PlanningsForm,
    value: PlanningsForm[keyof PlanningsForm]
  ) => void;
}

const RecurrenceForm = ({ values, setFieldValue }: Props) => {
  const {
    recurringType: type,
    isUnique,
    isWeekly,
    isMonthly,
    isYearly,
  } = useRecurringType(values.recurringType);

  if (isUnique) return null;

  return (
    <View>
      <View className="flex-row items-center gap-2 pt-2 px-2">
        <Input
          className="flex-1"
          placeholder=""
          type="number"
          value={formatInt(values.times)}
          onChangeText={(s) =>
            setFieldValue("times", Number(s.replaceAll(",", "")))
          }
          onBlur={() => setFieldValue("times", Number(values.times))}
          selectTextOnFocus={true}
          readOnly={isWeekly || isMonthly || isYearly}
        />

        <Text className="dark:text-white">
          {values.times > 1 ? "veces" : "vez"} cada
        </Text>

        <Input
          className="flex-1"
          placeholder=""
          type="number"
          value={formatInt(values.interval)}
          onChangeText={(s) =>
            setFieldValue("interval", Number(s.replaceAll(",", "")))
          }
          onBlur={() => setFieldValue("interval", Number(values.interval))}
          selectTextOnFocus={true}
        />

        <Text className="dark:text-white">
          {values.interval > 1 ? type.plural : type.singular}
        </Text>
      </View>

      {(isWeekly || isMonthly) && (
        <DaySelector
          values={values.payDaysData?.map((d) => d.day)}
          onChange={(days) => {
            setFieldValue("times", days.length);
            setFieldValue(
              "payDaysData",
              days.map((d) => ({ day: d }))
            );
          }}
          type={isWeekly ? "week" : "month"}
        />
      )}

      {isYearly && (
        <View className="gap-3 my-4">
          {values.payDaysData?.map((data, i) => (
            <View
              className="flex-row gap-2 items-center"
              key={JSON.stringify(data)}
            >
              <DayMonthSelect
                value={data as { day: number; month: number }}
                onChange={(day, month) => {
                  setFieldValue(
                    "payDaysData",
                    values.payDaysData?.map((d, j) =>
                      j === i ? { day, month } : d
                    )
                  );
                }}
              />

              <Pressable
                onPress={() => {
                  const data =
                    values.payDaysData?.filter((_, j) => j !== i) || [];

                  console.log(data);

                  setFieldValue(
                    "payDaysData",
                    values.payDaysData?.filter((_, j) => j !== i) || []
                  );
                  setFieldValue("times", values.times - 1);
                }}
              >
                <MinusCircle height={28} width={28} color={colors.red[600]} />
              </Pressable>
            </View>
          ))}
          <Pressable
            onPress={() => {
              setFieldValue("times", values.times + 1);
              setFieldValue(
                "payDaysData",
                values.payDaysData
                  ? [...values.payDaysData, { day: 1, month: 0 }]
                  : [{ day: 1, month: 0 }]
              );
            }}
          >
            {({ pressed }) => (
              <View
                className="flex-row items-center justify-center gap-2 my-2 border-2 border-green-500 py-2 rounded-md"
                style={{
                  backgroundColor: pressed ? colors.green[500] : "transparent",
                }}
              >
                <Plus
                  height={28}
                  width={28}
                  color={pressed ? colors.white : colors.green[500]}
                />
                <Text
                  style={{ color: pressed ? colors.white : colors.green[500] }}
                  className=" text-lg"
                >
                  Agregar fecha
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default RecurrenceForm;
