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
      .setTable("currencies", {
        "0": {
          name: "Peso Mexicano",
          symbol: "$",
          code: "MXN",
        },
      })
      .setTable("categories", categoriesData)
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
