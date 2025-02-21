const budgetsConfig: TableConfig = {
  id: { type: "number" },
  idCategory: { type: "number" },
  name: { type: "string" },
  amountLimit: { type: "number" },
  type: { type: "number" },
};

const historicBudgetsConfig: TableConfig = {
  id: { type: "number" },
  idBudget: { type: "number" },
  startDate: { type: "number" },
  amountSpent: { type: "number" },
};

const indexes: Index[] = [
  { id: "id_budgets", tableId: "budgets", cellId: "id" },
  { id: "id_historicBudgets", tableId: "historicBudgets", cellId: "id" },
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
];

export { budgetsConfig, historicBudgetsConfig, indexes, foreignKeys };
