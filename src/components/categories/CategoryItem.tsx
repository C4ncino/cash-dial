import { useState } from "react";
import { useColorScheme } from "nativewind";
import { Text, TouchableHighlight, View } from "react-native";
import { NavArrowDown, NavArrowRight } from "iconoir-react-native";

import colors from "tailwindcss/colors";

import {
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  CategoryColorKey,
  CategoryIconKey,
} from "@/db/ui";

interface Props extends CategoryNode {
  onPress: (id: string) => void;
  fatherColor?: string;
}

const CategoryItem = ({ id, name, children, onPress, fatherColor }: Props) => {
  const [childrenOpen, setChildrenOpen] = useState(false);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const icon = CATEGORY_ICONS[id as CategoryIconKey];
  const color = fatherColor || CATEGORY_COLORS[id as CategoryColorKey];

  if (children.length === 0) {
    return (
      <TouchableHighlight
        className="p-3 flex-row items-center gap-2"
        activeOpacity={0.8}
        underlayColor={isDark ? colors.zinc[800] : colors.zinc[100]}
        onPress={() => onPress(id)}
      >
        <>
          <View
            className="ml-4 rounded-md w-9 h-8 items-center justify-center"
            style={{ backgroundColor: color }}
          >
            {icon("#fff", 20)}
          </View>
          <Text className="dark:text-white text-lg">{name}</Text>
        </>
      </TouchableHighlight>
    );
  }

  return (
    <>
      <TouchableHighlight
        className="flex-row items-center justify-between p-3 "
        activeOpacity={0.8}
        underlayColor={isDark ? colors.zinc[800] : colors.zinc[100]}
        onPress={() => setChildrenOpen(!childrenOpen)}
      >
        <>
          <View className="ml-4 flex-row items-center gap-2">
            {!childrenOpen && (
              <View
                className="rounded-md w-9 h-8 items-center justify-center"
                style={{ backgroundColor: color }}
              >
                {icon("#fff", 20)}
              </View>
            )}
            <Text className="dark:text-white text-lg">{name}</Text>
          </View>
          {childrenOpen ? (
            <NavArrowDown width={24} height={24} color="#fff" />
          ) : (
            <NavArrowRight width={24} height={24} color="#fff" />
          )}
        </>
      </TouchableHighlight>

      {childrenOpen &&
        children.map((child) => (
          <CategoryItem
            key={child.id}
            id={child.id}
            name={child.name}
            children={child.children}
            onPress={onPress}
            fatherColor={color}
          />
        ))}
    </>
  );
};

export default CategoryItem;
