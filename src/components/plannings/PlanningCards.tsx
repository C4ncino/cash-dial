import { View, Text } from "react-native";
import React, { useState } from "react";
import Link from "@/widgets/Link";
import useTinybase from "@/hooks/useDatabase";
import Card from "./Card";

import useModal from "@/hooks/useModal";
import EditPlanning from "./EditPlanning";

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
