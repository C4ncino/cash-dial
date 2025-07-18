import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import AccountsCards from "@/accounts/AccountsCards";
import CreateMovement from "@/movements/CreateMovement";
import Movements from "@/movements/MovementsLanding";
import { Plus } from "iconoir-react-native";
import colors from "tailwindcss/colors";
import useModal from "@/hooks/useModal";
import BudgetsCard from "@/budget/BudgetsCard";
import PlanningCards from "@/plannings/PlanningCards";

const Home = () => {
  const createMovement = useModal();
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

        <PlanningCards />

        <Movements
          onEdit={() => setReRender(!reRender)}
          afterEdit={() => setReRender(!reRender)}
        />

        <BudgetsCard />
      </ScrollView>

      <CreateMovement {...createMovement} />
      <Pressable
        className="absolute right-4 bottom-8 rounded-full bg-green-600/85 p-1"
        onPress={createMovement.openModal}
      >
        <Plus width={40} height={40} color={colors.white} />
      </Pressable>
    </>
  );
};

export default Home;
