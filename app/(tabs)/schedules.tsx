import colors from "tailwindcss/colors";
import { ScrollView, View } from "react-native";

import Button from "@/widgets/Button";
import BudgetsCard from "@/budget/BudgetsCard";
import CreateBudget from "@/budget/CreateBudget";
import PlanningCards from "@/plannings/PlanningCards";
import CreatePlanning from "@/plannings/CreatePlanning";

import useModal from "@/hooks/useModal";

const Schedules = () => {
  const planningForm = useModal();
  const budgetForm = useModal();

  return (
    <>
      <ScrollView
        className="gap-4 mb-3 mt-5 px-4"
        contentContainerClassName="pb-16 gap-4"
      >
        <View className="w-1/4 absolute right-4 top-2 z-10">
          <Button
            style="outline"
            onPress={budgetForm.openModal}
            title="Nuevo"
            color={colors.green[500]}
          />
        </View>
        <BudgetsCard />

        <View className="relative">
          <View className="w-1/4 absolute right-4 top-2 z-10">
            <Button
              style="outline"
              onPress={planningForm.openModal}
              title="Nuevo"
              color={colors.green[500]}
            />
          </View>
          <PlanningCards />
        </View>
      </ScrollView>

      <CreatePlanning {...planningForm} />
      <CreateBudget {...budgetForm} />
    </>
  );
};

export default Schedules;
