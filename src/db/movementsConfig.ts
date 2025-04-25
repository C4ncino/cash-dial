const incomesConfig: TableConfig = {
  idAccount: { type: "string" },
  idCategory: { type: "string" },
  amount: { type: "number" },
  currency: { type: "string" },
  date: { type: "number", default: Date.now() },
  description: { type: "string", default: "" },
};

const expensesConfig: TableConfig = {
  idAccount: { type: "string" },
  idCategory: { type: "string" },
  amount: { type: "number" },
  currency: { type: "string" },
  msi: { type: "number", default: 0 },
  date: { type: "number", default: Date.now() },
  description: { type: "string", default: "" },
};

const transfersConfig: TableConfig = {
  idFrom: { type: "string" },
  idTo: { type: "string" },
  amount: { type: "number" },
  currency: { type: "string" },
  date: { type: "number", default: Date.now() },
  description: { type: "string", default: "" },
};

const templatesConfig: TableConfig = {
  idAccount: { type: "string" },
  idCategory: { type: "string" },
  amount: { type: "number" },
  currency: { type: "string" },
  description: { type: "string", default: "" },
};

const indexes: Index[] = [
  // { id: "id_incomes", tableId: "incomes", cellId: "id" },
  // { id: "id_expenses", tableId: "expenses", cellId: "id" },
  // { id: "id_transfers", tableId: "transfers", cellId: "id" },
  // { id: "id_templates", tableId: "templates", cellId: "id" },
];

const foreignKeys: ForeignKey[] = [
  {
    id: "incomes_account",
    tableId: "incomes",
    oTableId: "accounts",
    cellId: "idAccount",
  },
  {
    id: "incomes_category",
    tableId: "incomes",
    oTableId: "categories",
    cellId: "idCategory",
  },
  {
    id: "expenses_account",
    tableId: "expenses",
    oTableId: "accounts",
    cellId: "idAccount",
  },
  {
    id: "expenses_category",
    tableId: "expenses",
    oTableId: "categories",
    cellId: "idCategory",
  },
  {
    id: "transfers_from_account",
    tableId: "transfers",
    oTableId: "accounts",
    cellId: "idFrom",
  },
  {
    id: "transfers_to_account",
    tableId: "transfers",
    oTableId: "accounts",
    cellId: "idTo",
  },
  {
    id: "templates_account",
    tableId: "templates",
    oTableId: "accounts",
    cellId: "idAccount",
  },
  {
    id: "templates_category",
    tableId: "templates",
    oTableId: "categories",
    cellId: "idCategory",
  },
  {
    id: "incomes_currency",
    tableId: "incomes",
    oTableId: "currencies",
    cellId: "currency",
  },
  {
    id: "expenses_currency",
    tableId: "expenses",
    oTableId: "currencies",
    cellId: "currency",
  },
  {
    id: "transfers_currency",
    tableId: "transfers",
    oTableId: "currencies",
    cellId: "currency",
  },
  {
    id: "templates_currency",
    tableId: "templates",
    oTableId: "currencies",
    cellId: "currency",
  }
];

export {
  incomesConfig,
  expensesConfig,
  transfersConfig,
  templatesConfig,
  indexes,
  foreignKeys,
};
