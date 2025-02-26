import { useSortedRowIds, useStore } from "tinybase/ui-react";

const useDatabase: UseDatabase = () => {
  const store = useStore();

  const create = (tableName: TableId, value: any) => {
    if (!store) return;

    const id = store.addRow(tableName, value);

    return id;
  };

  const getAll = (tableName: TableId) => {
    if (!store) return [];

    const rows = useSortedRowIds(tableName);

    return rows;
  };

  const getById = <T extends TableId>(tableName: T, id: Id) => {
    if (!store) return null;

    return store.getRow(tableName, id) as Table<T>[string];
  };

  const query = <T extends TableId>(
    tableName: T,
    ...args: [QueryParams<T>]
  ) => {
    return [];
  };

  const update = <T extends TableId>(tableName: T, id: Id, value: any) => {
    if (!store) return null;

    return store.getRow(tableName, id) as Table<T>[string];
  };

  const remove = (tableName: TableId, id: Id) => {
    if (!store) return false;

    try {
      store.delRow(tableName, id);
    } catch (error) {
      // console.error(error);
      return false;
    }

    return true;
  };

  return {
    create,
    getAll,
    getById,
    query,
    update,
    remove,
  };
};

export default useDatabase;
