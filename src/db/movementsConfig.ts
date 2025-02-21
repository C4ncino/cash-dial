const incomesConfig: TableConfig = {
  id: { type: "number" },
  idAccount: { type: "number" },
  idCategory: { type: "number" },
  amount: { type: "number" },
  date: { type: "number", default: Date.now() },
  description: { type: "string", default: "" },
};

const expensesConfig: TableConfig = {
  id: { type: "number" },
  idAccount: { type: "number" },
  idCategory: { type: "number" },
  amount: { type: "number" },
  msi: { type: "number", default: 0 },
  date: { type: "number", default: Date.now() },
  description: { type: "string", default: "" },
};

const transfersConfig: TableConfig = {
  id: { type: "number" },
  idFrom: { type: "number" },
  idTo: { type: "number" },
  amount: { type: "number" },
  date: { type: "number", default: Date.now() },
  description: { type: "string", default: "" },
};

const templatesConfig: TableConfig = {
  id: { type: "number" },
  idAccount: { type: "number" },
  idCategory: { type: "number" },
  amount: { type: "number" },
  description: { type: "string", default: "" },
};

const indexes: Index[] = [
  { id: "id_incomes", tableId: "incomes", cellId: "id" },
  { id: "id_expenses", tableId: "expenses", cellId: "id" },
  { id: "id_transfers", tableId: "transfers", cellId: "id" },
  { id: "id_templates", tableId: "templates", cellId: "id" },
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
];

export {
  incomesConfig,
  expensesConfig,
  transfersConfig,
  templatesConfig,
  indexes,
  foreignKeys,
};
