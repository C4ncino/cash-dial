import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { NavArrowDown, NavArrowRight } from "iconoir-react-native";

import Label from "./Label";
import { useColorScheme } from "nativewind";

import colors from "tailwindcss/colors";

type Props<T> = {
  label?: string;
  placeholder?: string;

  data: T[];
  labelField: keyof T;
  valueField: keyof T;
  renderItem: (item: T) => JSX.Element;

  value: string;
  onSelect: (value: T) => void;

  needSearch?: boolean;
  maxHeight?: number;
};

const Select = <T,>({
  label,
  placeholder,
  labelField,
  valueField,
  data,
  renderItem,
  value,
  onSelect,
  needSearch,
  maxHeight = 300,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View>
      <Label label={label} />
      <Dropdown
        style={[
          styles.dropdown,
          {
            borderColor: isDark ? colors.white : colors.zinc[900],
          },
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          {
            color: isDark ? colors.zinc[400] : colors.zinc[600],
          },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {
            color: isDark ? colors.white : colors.zinc[900],
          },
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          {
            color: isDark ? colors.white : colors.zinc[900],
          },
        ]}
        containerStyle={{
          backgroundColor: isDark ? colors.zinc[900] : colors.white,
          borderColor: isDark ? colors.zinc[900] : colors.white,
          borderWidth: 4,
          borderRadius: 6,
          shadowColor: isDark ? colors.zinc[100] : colors.zinc[800],
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: isDark ? 2 : 5,
        }}
        disable={data.length === 0}
        data={data}
        renderItem={renderItem}
        search={needSearch}
        searchPlaceholder="Buscar..."
        maxHeight={maxHeight}
        labelField={labelField}
        valueField={valueField}
        placeholder={
          data.length === 0
            ? "No hay opciones"
            : (placeholder ?? "Seleccione una opción")
        }
        value={value}
        onChange={onSelect}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        renderRightIcon={() => (
          <>
            {isOpen ? (
              <NavArrowDown
                height={24}
                width={24}
                color={isDark ? colors.white : colors.zinc[900]}
              />
            ) : (
              <NavArrowRight
                height={24}
                width={24}
                color={isDark ? colors.white : colors.zinc[900]}
              />
            )}
          </>
        )}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdown: {
    height: 44,
    backgroundColor: "transparent",
    borderRadius: 6,
    borderWidth: 1,
    padding: 12,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
