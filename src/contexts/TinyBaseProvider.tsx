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
          date: new Date(2025, 3, 24, 15, 27, 0).getTime(),
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
