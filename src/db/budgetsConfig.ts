const budgetsConfig: TableConfig = {
  idCategory: { type: "string" },
  name: { type: "string" },
  amountLimit: { type: "number" },
  type: { type: "number" },
  currency: { type: "string" },
};

const historicBudgetsConfig: TableConfig = {
  idBudget: { type: "string" },
  startDate: { type: "number" },
  amountLimit: { type: "number" },
};

const indexes: Index[] = [
  // { id: "id_budgetsCategory", tableId: "budgets", cellId: "idCategory" },
  // { id: "id_historicBudgets", tableId: "historicBudgets", cellId: "idBudget" },
];

const foreignKeys: ForeignKey[] = [
  {
    id: "budget_category",
    tableId: "budgets",
    oTableId: "categories",
    cellId: "idCategory",
  },
  {
    id: "historicBudget_budget",
    tableId: "historicBudgets",
    oTableId: "budgets",
    cellId: "idBudget",
  },
  {
    id: "budgets_currency",
    tableId: "budgets",
    oTableId: "currencies",
    cellId: "currency",
  },
];

export { budgetsConfig, historicBudgetsConfig, indexes, foreignKeys };
