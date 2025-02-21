import {
  Provider,
  useCreatePersister,
  useCreateStore,
} from "tinybase/ui-react";
import { PropsWithChildren } from "react";
import { createStore } from "tinybase/store";
import { openDatabaseSync } from "expo-sqlite";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";

interface Props extends PropsWithChildren<{}> {}

const TinyBaseProvider = ({ children }: Props) => {
  // TODO: Add TableSchema
  const store = useCreateStore(() => createStore());

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
