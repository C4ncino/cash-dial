import { router } from "expo-router";
import { View, FlatList } from "react-native";

import Card from "@/plannings/Card";
import Header from "@/widgets/Header";
import CreatePlanning from "@/plannings/CreatePlanning";

import useModal from "@/hooks/useModal";
import useTinybase from "@/hooks/useDatabase";

const index = () => {
  const { visible, openModal, closeModal } = useModal();
  const { useAll } = useTinybase();

  const plannings = useAll("plannings");

  return (
    <View>
      <Header title="Presupuestos" openModal={openModal} />

      <FlatList
        contentContainerClassName="px-5"
        data={plannings}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Card id={item} onPress={() => router.push(`/plannings/${item}`)} />
        )}
      />

      <CreatePlanning visible={visible} closeModal={closeModal} />
    </View>
  );
};

export default index;
