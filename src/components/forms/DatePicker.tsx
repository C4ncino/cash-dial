import colors from "tailwindcss/colors";
import { Calendar } from "iconoir-react-native";
import { View, Text, Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Label from "./Label";

import useDate from "@/hooks/useDate";
import useModal from "@/hooks/useModal";
import { lang } from "@/utils/formatters";
import { useSystemContext } from "@/contexts/hooks";

interface Props {
  label?: string;
  value: number;
  onSelect: (value: number) => void;
}

const DatePicker = ({ label, value, onSelect }: Props) => {
  const { isDark } = useSystemContext();

  const { dateObject, dateLong } = useDate(value);
  const { openModal, closeModal, visible } = useModal();

  const handleConfirm = (date: Date) => {
    onSelect(date.getTime());
    closeModal();
  };

  return (
    <>
      <View>
        <Label label={label} />
        <Pressable
          className="h-12 px-2 flex-row justify-between items-center border rounded-md"
          onPress={openModal}
        >
          <Text className="dark:text-white">{dateLong}</Text>

          <Calendar
            width={24}
            height={24}
            color={isDark ? colors.white : colors.zinc[900]}
          />
        </Pressable>
      </View>
      <DateTimePickerModal
        locale={lang}
        date={dateObject}
        isVisible={visible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </>
  );
};

export default DatePicker;
