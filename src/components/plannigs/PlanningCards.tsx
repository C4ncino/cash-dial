import { View, Text } from "react-native";
import React from "react";
import Link from "@/widgets/Link";
import useTinybase from "@/hooks/useDatabase";
import Card from "./Card";

const PlanningCards = () => {
  const { useAll } = useTinybase();

  const plannings = useAll("plannings");

  return (
    <View className="w-full max-w-2xl mx-auto px-4 py-4 rounded-md bg-zinc-100 dark:bg-zinc-950">
      <Text className="text-2xl font-semibold dark:text-white pb-2">
        Próximos Pagos
      </Text>

      {plannings.map((id) => (
        <Card key={id} id={id} />
      ))}

      <Link className="justify-end" href="/plannings" label="Mostrar más" />
    </View>
  );
};

export default PlanningCards;
