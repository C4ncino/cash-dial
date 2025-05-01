type TableConfig = { [cellId: string]: CellSchema };

type Index = { id: string; tableId: string; cellId: string };

type ForeignKey = {
  id: string;
  tableId: string;
  oTableId: string;
  cellId: string;
};

type Id = string;

type Tables = {
  currencies: {
    [rowId: Id]: {
      name: string;
      symbol: string;
      code: string
    }
  };
  accounts: {
    [rowId: Id]: {
      name: string;
      type: number;
      currentBalance: number;
      currency: string;
    };
  };
  creditAccounts: {
    [rowId: Id]: {
      idAccount?: string;
      creditLimit: number;
      cutOffDay: number;
      paymentDueDay: number;
    };
  };
  goals: {
    [rowId: Id]: {
      name: string;
      targetAmount: number;
      currentAmount: number;
      startDate: number;
      endDate?: number;
      currency: string;
    };
  };
  categories: { [rowId: Id]: { idFather?: string; name: string } };
  incomes: {
    [rowId: Id]: {
      idAccount: string;
      idCategory: string;
      amount: number;
      currency: string;
      date: number;
      description?: string;
    };
  };
  expenses: {
    [rowId: Id]: {
      idAccount: string;
      idCategory: string;
      amount: number;
      currency: string;
      msi: number;
      date: number;
      description?: string;
    };
  };
  transfers: {
    [rowId: Id]: {
      idFrom: string;
      idTo: string;
      amount: number;
      currency: string;
      date: number;
      description?: string;
    };
  };
  templates: {
    [rowId: Id]: {
      idAccount?: string;
      idCategory?: string;
      currency: string;
      amount?: number;
      description?: string;
    };
  };
  plannings: {
    [rowId: Id]: {
      idAccount: string;
      idCategory: string;
      name: string;
      amount: number;
      currency: string;
      date: number;
      type: number;
      isRecurring: boolean;
    };
  };
  recurringPlannings: {
    [rowId: Id]: { idPlanning: string; endDate: number; interval: number };
  };
  payDaysPlannings: {
    [rowId: Id]: { idPlanning: string; day: number; month: number };
  };
  historicPlannings: {
    [rowId: Id]: {
      idPlanning: string;
      date: number;
      amount: number;
      idOrigin?: number;
    };
  };
  budgets: {
    [rowId: Id]: {
      idCategory: string;
      name: string;
      amountLimit: number;
      type: number;
      currency: string;
    };
  };
  historicBudgets: {
    [rowId: Id]: {
      idBudget: string;
      startDate: number;
      amountSpent: number;
    };
  };
};

/** A Table Id in the Store. */
type TableId = keyof Tables;

/** A Table in the Store. */
type Table<TId extends TableId> = NonNullable<Tables[TId]>;

/** A Row in a Table. */
type Row<TId extends TableId> = Table<TId>[Id];

/** A Cell Id in a Row. */
type CellId<TId extends TableId> = Extract<keyof Row<TId>, Id>;

/** A Cell in a Row. */
type Cell<TId extends TableId, CId extends CellId<TId>> = NonNullable<
  Tables[TId]
>[Id][CId];

/** Cell Ids and types in a Row. */
type CellIdCellArray<
  TId extends TableId,
  CId = CellId<TId>,
> = CId extends CellId<TId> ? [cellId: CId, cell: Cell<TId, CId>] : never;

type CategoryData = Map<Id, Row<"categories"> & { id: Id, children: CategoryNode[] }>

type CategoryNode = {
  id: string;
  name: string;
  children: CategoryNode[];
}

type Movement = {
  id: Id,
  type: "in" | "out" | "transfer",
  date: number,
};

type MovementsByDate = {
  date: number;
  data: Movement[];
}

type QueryParams<T extends TableId> =
  | {
    type: "select";
    joinTable?: TableId;
    column: CellId<T> | CellId<TableId>;
    as?: string;
  }
  | {
    type: "join";
    table: TableId;
    on: CellId<TableId>;
    as?: string;
  }
  | {
    type: "where";
    joinTable?: TableId;
    column: CellId<T> | CellId<TableId>;
    operator: "==" | ">" | "<" | ">=" | "<=" | "!=";
    value: number | string | boolean;
  }
  | {
    type: "group";
    column: CellId<T>;
    aggregate: "sum" | "count" | "avg" | "max" | "min";
    as?: string;
  }
  | {
    type: "having";
    column: CellId<T>;
    value: number | string | boolean;
  };

type QueryResults = {
  ids: Id[];
  results: { [key: Id]: any };
};

type UseDatabase = {
  create: <T extends TableId>(tableName: T, value: Row<T>) => Id | undefined;

  getAll: (tableName: TableId) => Id[];
  getById: <T extends TableId>(tableName: T, id: Id) => Row<T> | null;

  query: <T extends TableId>(
    tableName: T,
    ...args: QueryParams<T>[]
  ) => QueryResults;

  update: <T extends TableId>(tableName: T, id: Id, value: Row<T>) => boolean;

  remove: (tableName: TableId, id: Id) => boolean;
};

type UseTinyBase = UseDatabase & {
  useAll: (tableName: TableId) => Id[];
  useRowById: <T extends TableId>(tableName: T, id: Id) => Row<T> | null;
}