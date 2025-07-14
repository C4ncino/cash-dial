import colors from "tailwindcss/colors";
import { Calendar } from "iconoir-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, FlatList, Pressable } from "react-native";

import Header from "@/widgets/Header";
import AmountText from "@/widgets/AmountText";

import DaySelector from "@/forms/DaySelector";

import NextDate from "@/plannings/NextDate";
import ConfirmForm from "@/plannings/ConfirmForm";
import HistoricCard from "@/plannings/HistoricCard";
import EditPlanning from "@/plannings/EditPlanning";

import { getUiElements } from "@/utils/categories";
import { ACCOUNT_TYPES, ACCOUNT_TYPES_ID, MONTHS } from "@/db/ui";

import useModal from "@/hooks/useModal";
import useTinybase from "@/hooks/useDatabase";
import usePlanning from "@/hooks/usePlanning";

const planning = () => {
  const { id } = useLocalSearchParams();
  const { getById } = useTinybase();

  const editModal = useModal();
  const confirmModal = useModal();

  if (!id) return router.back();

  const { planning, recurringType, recurringInfo, payDays, history } =
    usePlanning(id as Id);

  if (!planning) return router.back();

  const account = getById("accounts", planning.idAccount);

  const category = getById("categories", planning.idCategory);

  if (!account || !category) return router.back();

  const { icon, color } = getUiElements(
    planning.idCategory,
    category?.idFather
  );

  const type = ACCOUNT_TYPES[account.type as ACCOUNT_TYPES_ID];

  const { details, isUnique, isDaily, isWeekly, isYearly } = recurringType;

  return (
    <View className="max-w-xl w-full mx-auto">
      <Header
        title=""
        openModal={editModal.openModal}
        buttonTitle="Editar"
        buttonColor={colors.blue[500]}
      />

      <Text className="dark:text-white text-3xl font-semibold text-center my-1">
        {planning.name}
      </Text>

      <View className="items-center">
        <AmountText
          type={planning.type === 0 ? "out" : "in"}
          amount={planning.amount}
          needShort={planning.amount > 999_999_999_999}
        />

        <NextDate fontSize="base" idPlanning={id as Id} {...planning} />
      </View>

      <Pressable
        onPress={confirmModal.openModal}
        className="border-2 border-blue-500 rounded-md mx-auto p-2 my-3 bg-blue-500"
      >
        <Text className="text-white text-center font-semibold">
          Confirmar Pago
        </Text>
      </Pressable>

      {!isUnique && (
        <View>
          {!isDaily && (
            <View className="px-10 -mt-2">
              {!isYearly ? (
                <DaySelector
                  readonly
                  values={payDays?.map((d) => d.day)}
                  onChange={() => {}}
                  type={isWeekly ? "week" : "month"}
                />
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="gap-2 justify-center flex-1"
                  className="py-2 my-2"
                >
                  {payDays.map((d, i) => (
                    <View
                      key={i}
                      className="border rounded-md p-2 dark:border-white"
                    >
                      <Text className="dark:text-white">
                        {d.day} de {MONTHS[d.month || 0].id}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          )}

          <Text className="dark:text-white text-center text-lg -mt-2 mb-2">
            {recurringInfo?.times}{" "}
            {(recurringInfo?.times as number) > 1 ? "veces" : "vez"} cada{" "}
            {(recurringInfo?.interval as number) > 1
              ? details.plural
              : details.singular}
          </Text>
        </View>
      )}

      {!isUnique && (
        <View className="flex-row gap-4 my-2 mx-4">
          <View className="flex-1 flex-row items-center gap-2 bg-zinc-100 dark:bg-zinc-950 p-2 rounded-md">
            <View
              className="items-center p-1 rounded-md"
              style={{ backgroundColor: colors.blue[600] }}
            >
              <Calendar width={20} height={20} color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-zinc-700 dark:text-zinc-300 text-xs italic">
                Desde
              </Text>
              <Text className="dark:text-white font-semibold w-full">
                {new Date(
                  recurringInfo?.startDate as number
                ).toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View className="flex-1 flex-row items-center gap-2 bg-zinc-100 dark:bg-zinc-950 p-2 rounded-md">
            <View
              className="items-center p-1 rounded-md"
              style={{ backgroundColor: colors.red[500] }}
            >
              <Calendar width={20} height={20} color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-zinc-700 dark:text-zinc-300 text-xs italic">
                Hasta
              </Text>
              <Text className="dark:text-white font-medium w-full">
                {planning.date
                  ? new Date(planning.date as number).toLocaleDateString()
                  : "Nunca"}
              </Text>
            </View>
          </View>
        </View>
      )}

      <View className="flex-row gap-4 my-2 mx-4">
        <View className="flex-1 flex-row items-center gap-2 bg-zinc-100 dark:bg-zinc-950 p-2 rounded-md">
          <View
            className="items-center p-1 rounded-md"
            style={{ backgroundColor: type.color }}
          >
            {type.icon("#fff")}
          </View>
          <View className="flex-1">
            <Text className="text-zinc-700 dark:text-zinc-300 text-xs italic">
              De
            </Text>
            <Text className="dark:text-white font-semibold w-full">
              {account.name}
            </Text>
          </View>
        </View>
        <View className="flex-1 flex-row items-center gap-2 bg-zinc-100 dark:bg-zinc-950 p-2 rounded-md">
          <View
            className="items-center p-1 rounded-md"
            style={{ backgroundColor: color }}
          >
            {icon("#fff")}
          </View>
          <View className="flex-1">
            <Text className="text-zinc-700 dark:text-zinc-300 text-xs italic">
              A
            </Text>
            <Text className="dark:text-white font-medium w-full">
              {category.name}
            </Text>
          </View>
        </View>
      </View>

      {!isUnique && (
        <View className="mt-3 mb-2 mx-4">
          <Text className="dark:text-white text-2xl font-medium ps-1">
            Historial
          </Text>
          <FlatList
            className="mt-2 max-h-[29.5rem]"
            data={history}
            keyExtractor={(item, i) => item.date.toString() + i.toString()}
            renderItem={({ item }) => (
              <HistoricCard
                date={item.date}
                amount={item.amount || 0}
                type={planning.type === 0 ? "out" : "in"}
              />
            )}
            ListEmptyComponent={() => (
              <View className="flex-row items-center gap-2 border-t border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded-md my-1">
                <Text className="text-zinc-600 dark:text-zinc-400 text-lg italic">
                  No hay pagos aún
                </Text>
              </View>
            )}
          />
        </View>
      )}

      <EditPlanning id={id as Id} {...editModal} />
      <ConfirmForm id={id as Id} {...confirmModal} />
    </View>
  );
};

export default planning;
