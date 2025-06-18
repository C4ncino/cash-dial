import {
  Provider,
  useCreatePersister,
  useCreateStore,
} from "tinybase/ui-react";
import { PropsWithChildren } from "react";
import { createIndexes, createRelationships, createStore } from "tinybase";
import { openDatabaseSync } from "expo-sqlite";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import { tableSchema, indexes, foreignKeys } from "@/db";
import { data as categoriesData } from "@/db/categoriesConfig";

interface Props extends PropsWithChildren<{}> {}

const TinyBaseProvider = ({ children }: Props) => {
  // TODO: Add TableSchema
  const store = useCreateStore(() =>
    createStore()
      .setTablesSchema(tableSchema)
      .setValuesSchema({})
      .setTable("categories", categoriesData)
      .setTable("currencies", {
        "0": {
          name: "Peso Mexicano",
          symbol: "$",
          code: "MXN",
        },
      })
      .setTable("accounts", {
        "0": {
          name: "Cash",
          type: 1,
          currentBalance: 200,
          currency: "0",
        },
        "1": {
          name: "Savings",
          type: 2,
          currentBalance: 100,
          currency: "0",
        },
        "2": {
          name: "BBVA Credit",
          type: 3,
          currentBalance: 100,
          currency: "0",
        },
      })
      .setTable("creditAccounts", {
        "2": {
          idAccount: "2",
          creditLimit: 1000,
          cutOffDay: 10,
          paymentDueDay: 15,
        },
      })
      .setTable("transfers", {
        "0": {
          idFrom: "0",
          idTo: "1",
          amount: 100,
          currency: "0",
          date: new Date(2025, 3, 24, 15, 30, 0).getTime(),
        },
      })
      .setTable("incomes", {
        "0": {
          idAccount: "0",
          idCategory: "1",
          amount: 100,
          currency: "0",
          date: new Date(2025, 3, 24, 15, 33, 0).getTime(),
        },
      })
      .setTable("expenses", {
        "0": {
          idAccount: "2",
          idCategory: "2",
          amount: 100,
          currency: "0",
          msi: 6,
          date: new Date(2025, 4, 4, 15, 27, 0).getTime(),
        },
        "1": {
          idAccount: "2",
          idCategory: "55",
          amount: 100,
          currency: "0",
          msi: 6,
          date: new Date(2025, 4, 5, 15, 27, 0).getTime(),
        },
        "2": {
          idAccount: "2",
          idCategory: "5",
          amount: 50,
          currency: "0",
          msi: 6,
          date: new Date(2025, 4, 5, 15, 28, 0).getTime(),
        },
        "3": {
          idAccount: "2",
          idCategory: "61",
          amount: 100,
          currency: "0",
          msi: 6,
          date: new Date(2025, 4, 1, 15, 27, 0).getTime(),
        },
      })
      .setTable("budgets", {
        "0": {
          idCategory: "5",
          name: "Presupuesto 1",
          amountLimit: 500,
          type: 0,
          currency: "0",
        },
        "1": {
          idCategory: "55",
          name: "Presupuesto 2",
          amountLimit: 8000,
          type: 1,
          currency: "0",
        },
        "2": {
          idCategory: "30",
          name: "Presupuesto 3",
          amountLimit: 500320,
          type: 2,
          currency: "0",
        },
      })
      .setTable("historicBudgets", {
        "0": {
          idBudget: "0",
          startDate: new Date(2025, 3, 28, 15, 30, 0).getTime(),
          amountLimit: 500,
        },
        "1": {
          idBudget: "0",
          startDate: new Date(2025, 4, 5, 0, 0, 0).getTime(),
          amountLimit: 500,
        },
      })
      .setTable("plannings", {
        "0": {
          idAccount: "0",
          idCategory: "5",
          name: "Unique",
          amount: 500,
          currency: "0",
          type: 1,
          recurringType: 0,
          date: new Date(2025, 8, 28, 0, 0, 0).getTime(),
        },
        "1": {
          idAccount: "0",
          idCategory: "55",
          name: "Daily",
          amount: 500,
          currency: "0",
          type: 0,
          recurringType: 1,
        },
        "2": {
          idAccount: "0",
          idCategory: "30",
          name: "Weekly",
          amount: 500,
          currency: "0",
          type: 0,
          recurringType: 2,
        },
        "3": {
          idAccount: "0",
          idCategory: "30",
          name: "Monthly",
          amount: 500,
          currency: "0",
          type: 0,
          recurringType: 3,
        },
        "4": {
          idAccount: "0",
          idCategory: "30",
          name: "Yearly",
          amount: 500,
          currency: "0",
          type: 0,
          recurringType: 4,
        },
      })
      .setTable("recurringPlannings", {
        "0": {
          idPlanning: "1",
          interval: 1,
          times: 3,
          startDate: new Date(2025, 5, 16, 0, 0, 0).getTime(),
        },
        "1": {
          idPlanning: "2",
          interval: 1,
          times: 2,
          startDate: new Date(2025, 5, 17, 0, 0, 0).getTime(),
        },
        "2": {
          idPlanning: "3",
          interval: 1,
          times: 3,
          startDate: new Date(2025, 5, 17, 0, 0, 0).getTime(),
        },
        "3": {
          idPlanning: "4",
          interval: 1,
          times: 2,
          startDate: new Date(2025, 5, 17, 0, 0, 0).getTime(),
        },
      })
      .setTable("payDaysPlannings", {
        "0": {
          idPlanning: "2",
          day: 0,
        },
        "1": {
          idPlanning: "2",
          day: 1,
        },
        "2": {
          idPlanning: "3",
          day: 8,
        },
        "3": {
          idPlanning: "3",
          day: 16,
        },
        "4": {
          idPlanning: "3",
          day: 28,
        },
        "5": {
          idPlanning: "4",
          day: 16,
          month: 5,
        },
        "6": {
          idPlanning: "4",
          day: 10,
          month: 8,
        },
      })
      .setTable("historicPlannings", {
        "0": {
          idPlanning: "0",
          date: new Date(2025, 8, 28, 0, 0, 0).getTime(),
        },
        "1": {
          idPlanning: "1",
          date: new Date(2025, 5, 17, 0, 0, 0).getTime(),
        },
        "2": {
          idPlanning: "2",
          date: new Date(2025, 5, 17, 0, 0, 0).getTime(),
        },
        "3": {
          idPlanning: "3",
          date: new Date(2025, 5, 17, 0, 0, 0).getTime(),
        },
        "4": {
          idPlanning: "4",
          date: new Date(2025, 5, 17, 0, 0, 0).getTime(),
        },
        "5": {
          idPlanning: "1",
          isPending: false,
          amount: 500,
          date: new Date(2025, 5, 16, 0, 0, 0).getTime(),
        },
      })
  );

  const storeIndexes = createIndexes(store);

  for (const { id, tableId, cellId } of indexes) {
    storeIndexes.setIndexDefinition(id, tableId, cellId);
  }

  const relationships = createRelationships(store);
  for (const { id, tableId, oTableId, cellId } of foreignKeys) {
    relationships.setRelationshipDefinition(id, tableId, oTableId, cellId);
  }

  // TODO: uncomment persister
  // useCreatePersister(
  //   store,
  //   (store) =>
  //     createExpoSqlitePersister(store, openDatabaseSync("tinybase.db")),
  //   [],
  //   (persister) => persister.load().then(() => persister.startAutoSave().then())
  // );

  return <Provider store={store}>{children}</Provider>;
};

export default TinyBaseProvider;
