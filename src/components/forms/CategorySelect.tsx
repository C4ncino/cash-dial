import { useMemo } from "react";
import { NavArrowRight } from "iconoir-react-native";
import { View, Text, Pressable, Modal } from "react-native";

import colors from "tailwindcss/colors";

import Label from "./Label";
import Categories from "@/categories/Categories";
import ReturnButton from "@/widgets/ReturnButton";

import useModal from "@/hooks/useModal";
import useDatabase from "@/hooks/useDatabase";
import { useSystemContext } from "@/contexts/hooks";

import {
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  CategoryColorKey,
  CategoryIconKey,
} from "@/db/ui";

interface Props {
  value: string;
  onSelect: (value: string) => void;
}

const CategorySelect = ({ value, onSelect }: Props) => {
  const { isDark, categories } = useSystemContext();

  const { getById } = useDatabase();
  const { openModal, closeModal, visible } = useModal();

  const category = useMemo(() => getById("categories", value), [value]);

  const icon = CATEGORY_ICONS[value as CategoryIconKey];

  const color =
    CATEGORY_COLORS[
      (category?.idFather as CategoryColorKey) || (value as CategoryColorKey)
    ];

  return (
    <>
      <View>
        <Label label="Categoría" />
        <Pressable
          className="h-12 px-2 flex-row justify-between items-center border rounded-md"
          onPress={openModal}
        >
          {category?.name ? (
            <View className="flex-row items-center gap-2 -mx-4">
              <View
                className="ml-4 rounded-md w-9 h-8 items-center justify-center"
                style={{ backgroundColor: color }}
              >
                {icon("#fff", 20)}
              </View>
              <Text className="dark:text-white">{category.name}</Text>
            </View>
          ) : (
            <Text className="dark:text-white">Elija una categoría</Text>
          )}

          <NavArrowRight
            height={24}
            width={24}
            color={isDark ? colors.white : colors.zinc[900]}
          />
        </Pressable>
      </View>

      <Modal
        visible={visible}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <View className="px-2 py-2 flex-1 dark:bg-zinc-900">
          <ReturnButton onPress={closeModal} />

          <Categories
            categories={categories}
            onPress={(id: string) => {
              onSelect(id);
              closeModal();
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default CategorySelect;
