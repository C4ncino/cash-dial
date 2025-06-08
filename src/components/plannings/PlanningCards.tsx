import { View, Text } from "react-native";
import React, { useState } from "react";

import Card from "./Card";
import EditPlanning from "./EditPlanning";

import Link from "@/widgets/Link";
import useModal from "@/hooks/useModal";
import useTinybase from "@/hooks/useDatabase";

const PlanningCards = () => {
  const { useAll } = useTinybase();

  const [id, setId] = useState<string>();
  const { visible, closeModal, openModal } = useModal();

  const plannings = useAll("plannings");

  return (
    <View className="w-full max-w-2xl mx-auto px-4 py-4 rounded-md bg-zinc-100 dark:bg-zinc-950">
      <Text className="text-2xl font-semibold dark:text-white pb-2">
        Próximos Pagos
      </Text>

      {plannings.map((id) => (
        <Card
          key={id}
          id={id}
          onPress={() => {
            setId(id);
            openModal();
          }}
        />
      ))}

      <Link className="justify-end" href="/plannings" label="Mostrar más" />

      {id && (
        <EditPlanning
          id={id}
          visible={visible}
          closeModal={() => {
            closeModal();
            setId(undefined);
          }}
        />
      )}
    </View>
  );
};

export default PlanningCards;
