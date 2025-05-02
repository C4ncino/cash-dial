import { View, Text } from "react-native";
import useTinybase from "@/hooks/useDatabase";
import BudgetCard from "./BudgetCard";
import Link from "@/widgets/Link";
import { router } from "expo-router";

const BudgetsCard = () => {
  const { useAll } = useTinybase();

  const budgets = useAll("budgets");

  return (
    <>
      <View className="w-full max-w-2xl mx-auto px-4 py-4 rounded-md bg-zinc-100 dark:bg-zinc-950">
        <Text className="text-2xl font-semibold dark:text-white pb-2">
          Presupuestos
        </Text>

        {budgets.slice(0, 3).map((id) => (
          <View
            className="border-t border-zinc-200 dark:border-zinc-700"
            key={id}
          >
            <BudgetCard id={id} onPress={() => router.push(`/budgets/${id}`)} />
          </View>
        ))}

        <Link className="justify-end" href="/budgets" label="Mostrar más" />
      </View>
    </>
  );
};

export default BudgetsCard;
