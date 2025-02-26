import { useRow, useSortedRowIds, useStore } from "tinybase/ui-react";

const useDatabase: UseDatabase = () => {
  const store = useStore();

  const create = <T extends TableId>(tableName: T, value: Row<T>) => {
    if (!store) return;

    return store.addRow(tableName, value);
  };

  const getAll = (tableName: TableId) => {
    if (!store) return [];

    return useSortedRowIds(tableName);
  };

  const getById = <T extends TableId>(tableName: T, id: Id) => {
    if (!store) return null;

    return useRow(tableName, id) as Table<T>[string];
  };

  const query = <T extends TableId>(
    tableName: T,
    ...args: [QueryParams<T>]
  ) => {
    return [];
  };

  const update = <T extends TableId>(tableName: T, id: Id, value: Row<T>) => {
    if (!store) return false;

    const row = store.getRow(tableName, id);
    if (Object.keys(row).length === 0) return false;

    store.setRow(tableName, id, value);
    return true;
  };

  const remove = (tableName: TableId, id: Id) => {
    if (!store) return false;

    const row = store.getRow(tableName, id);
    if (Object.keys(row).length === 0) return false;

    store.delRow(tableName, id);
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
