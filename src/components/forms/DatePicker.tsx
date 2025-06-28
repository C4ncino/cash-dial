import colors from "tailwindcss/colors";
import { View, Text, Pressable } from "react-native";
import { Calendar, Clock, Xmark } from "iconoir-react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Label from "./Label";

import useDate from "@/hooks/useDate";
import useModal from "@/hooks/useModal";
import { lang } from "@/utils/formatters";
import { useSystemContext } from "@/contexts/hooks";

interface Props {
  label?: string;
  placeholder?: string;
  value?: number;
  onSelect: (value: number | undefined) => void;
  needReset?: boolean;
  mode?: "date" | "time" | "datetime";
}

const DatePicker = ({
  label,
  placeholder = "Elija una fecha",
  value,
  onSelect,
  needReset,
  mode = "date",
}: Props) => {
  const { isDark, currentDateInfo } = useSystemContext();

  const { day, month, year } = currentDateInfo;

  const { dateObject, dateLong, time, dateShort } = useDate(
    value ?? Date.now()
  );
  const { openModal, closeModal, visible } = useModal();

  const handleConfirm = (date: Date) => {
    if (mode === "date") date.setHours(0, 0, 0, 0);

    onSelect(date.getTime());
    closeModal();
  };

  const getText = () => {
    switch (mode) {
      case "date":
        if (
          dateObject.getDate() === day &&
          dateObject.getMonth() === month &&
          dateObject.getFullYear() === year
        )
          return `Hoy, ${dateLong}`;

        return dateLong;
      case "time":
        return time;
      case "datetime":
        return `${dateShort} ${time}`;
    }
  };

  return (
    <>
      <View>
        <Label label={label} />
        <Pressable
          className="h-12 px-2 flex-row justify-between items-center border rounded-md"
          onPress={openModal}
        >
          <Text className="dark:text-white">
            {value ? getText() : placeholder}
          </Text>

          <View className="flex-row items-center">
            {needReset && value !== undefined && (
              <Pressable
                className="w-12 h-12 items-center justify-center"
                onPress={() => onSelect(undefined)}
              >
                <Xmark width={24} height={24} color={colors.red[500]} />
              </Pressable>
            )}

            {mode === "time" ? (
              <Clock
                height={24}
                width={24}
                color={isDark ? colors.white : colors.zinc[900]}
              />
            ) : (
              <Calendar
                width={24}
                height={24}
                color={isDark ? colors.white : colors.zinc[900]}
              />
            )}
          </View>
        </Pressable>
      </View>
      <DateTimePickerModal
        minimumDate={new Date()}
        locale={lang}
        date={dateObject}
        isVisible={visible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={closeModal}
        isDarkModeEnabled={isDark}
      />
    </>
  );
};

export default DatePicker;
