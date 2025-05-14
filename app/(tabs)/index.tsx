import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import AccountsCards from "@/accounts/AccountsCards";
import CreateMovement from "@/components/movements/CreateMovement";
import Movements from "@/movements/MovementsLanding";
import { Plus } from "iconoir-react-native";
import colors from "tailwindcss/colors";
import useModal from "@/hooks/useModal";
import BudgetsCard from "@/components/budget/BudgetsCard";

const Home = () => {
  const { visible, closeModal, openModal } = useModal();
  const [reRender, setReRender] = useState(true);

  return (
    <>
      <ScrollView contentContainerClassName="px-4 pb-24 gap-5">
        <View role="presentation" className="my-5">
          <Text className="text-3xl font-semibold text-center dark:text-white">
            Bienvenido
          </Text>
        </View>

        <AccountsCards />
        <Movements
          onEdit={() => setReRender(!reRender)}
          afterEdit={() => setReRender(!reRender)}
        />

        {reRender && <BudgetsCard />}
      </ScrollView>

      <CreateMovement visible={visible} closeModal={closeModal} />
      <Pressable
        className="absolute right-4 bottom-8 rounded-full bg-green-600/85 p-1"
        onPress={openModal}
      >
        <Plus width={40} height={40} color={colors.white} />
      </Pressable>
    </>
  );
};

export default Home;
