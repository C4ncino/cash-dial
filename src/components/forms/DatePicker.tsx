import colors from "tailwindcss/colors";
import { Calendar, Clock } from "iconoir-react-native";
import { View, Text, Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Label from "./Label";

import useDate from "@/hooks/useDate";
import useModal from "@/hooks/useModal";
import { lang } from "@/utils/formatters";
import { useSystemContext } from "@/contexts/hooks";

interface Props {
  label?: string;
  value?: number;
  onSelect: (value: number) => void;
  mode?: "date" | "time" | "datetime";
}

const DatePicker = ({ label, value, onSelect, mode = "date" }: Props) => {
  const { isDark } = useSystemContext();

  const { dateObject, dateLong, time, dateShort } = useDate(
    value ?? Date.now()
  );
  const { openModal, closeModal, visible } = useModal();

  const handleConfirm = (date: Date) => {
    onSelect(date.getTime());
    closeModal();
  };

  const getText = () => {
    switch (mode) {
      case "date":
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
            {value ? getText() : "Elija una fecha"}
          </Text>

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
