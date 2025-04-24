import React from "react";
import { ScrollView } from "react-native";

import CategoryItem from "./CategoryItem";

interface Props {
  categories: CategoryNode[];
  onPress: (id: string) => void;
}

const Categories = ({ categories, onPress }: Props) => {
  return (
    <ScrollView nestedScrollEnabled contentContainerClassName="pb-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category} onPress={onPress} />
      ))}
    </ScrollView>
  );
};

export default Categories;
