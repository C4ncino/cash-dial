import { useMemo } from "react";
import { createQueries, GetTableCell } from "tinybase/queries";
import { useRow, useSortedRowIds, useStore } from "tinybase/ui-react";

const useTinybase: () => UseTinyBase = () => {
  const store = useStore();

  const queries = useMemo(() => {
    if (!store) return;
    return createQueries(store);
  }, [store]);

  const create = <T extends TableId>(tableName: T, value: Row<T>) => {
    if (!store) return;

    return store.addRow(tableName, value);
  };

  const getAll = (tableName: TableId) => {
    if (!store) return [];

    return store.getSortedRowIds(tableName);
  };

  const getById = <T extends TableId>(tableName: T, id: Id) => {
    if (!store) return null;

    const row = store.getRow(tableName, id) as Table<T>[string];

    return Object.keys(row).length === 0 ? null : row;
  };

  const useAll = (tableName: TableId) => {
    if (!store) return [];

    return useSortedRowIds(tableName);
  };

  const useRowById = <T extends TableId>(tableName: T, id: Id) => {
    if (!store) return null;

    return useRow(tableName, id) as Table<T>[string];
  };

  const compare = <T>(operator: Operator, valueA: T, valueB: T) => {
    switch (operator) {
      case ">":
        return valueA > valueB;
      case "<":
        return valueA < valueB;
      case ">=":
        return valueA >= valueB;
      case "<=":
        return valueA <= valueB;
      case "!=":
        return valueA !== valueB;
      case "==":
        return valueA === valueB;
      default:
        return false;
    }
  };

  const whereQuery = <T extends TableId, U extends TableId>(
    getTableCell: GetTableCell,
    tableName: TableId,
    arg: WhereClause<T, U>
  ): boolean => {
    const firstArgs: [string, string] | [string] = [arg.column];

    if (arg.joinTable) firstArgs.unshift(arg.joinTable);
    else firstArgs.unshift(tableName);

    const value = getTableCell(...firstArgs);

    if (!value) return false;

    let result = false;

    if ("value" in arg) result = compare(arg.operator, value, arg.value);
    else
      for (const val of arg.values)
        result ||= compare(arg.operator, value, val);

    if (arg.or) result ||= whereQuery(getTableCell, tableName, arg.or);

    return result;
  };

  const query = <T extends TableId, U extends TableId>(
    tableName: T,
    ...args: QueryParams<T, U>[]
  ) => {
    if (!queries) return { ids: [], results: {} };

    queries.setQueryDefinition(
      "tempQuery",
      tableName,
      ({ select, join, where, group, having }) => {
        let result;

        for (const arg of args) {
          switch (arg.type) {
            case "select":
              result = arg.joinTable
                ? select(arg.joinTable, arg.column)
                : select(arg.column);

              if (arg.as) result.as(arg.as);
              break;

            case "join":
              result = join(arg.table, arg.on);
              if (arg.as) result.as(arg.as);
              break;

            case "where":
              const firstArgs: [string, string] | [string] = [arg.column];

              if (arg.joinTable) firstArgs.unshift(arg.joinTable);

              if (arg.operator === "==" && "value" in arg && !arg.or)
                where(...firstArgs, arg.value);
              else
                where((getTableCell) =>
                  whereQuery(getTableCell, tableName, arg)
                );

              break;

            case "group":
              result = group(arg.column, arg.aggregate);
              if (arg.as) result.as(arg.as);
              break;

            case "having":
              having(arg.column, arg.value);
              break;
          }
        }
      }
    );

    const results = queries.getResultTable("tempQuery");

    queries.delQueryDefinition("tempQuery");

    return {
      ids: Object.keys(results),
      results: results,
    };
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
    useAll,
    useRowById,
  };
};

export default useTinybase;
