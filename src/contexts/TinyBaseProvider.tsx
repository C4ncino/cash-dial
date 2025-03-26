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
