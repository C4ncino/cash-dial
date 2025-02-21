const accountsConfig: TableConfig = {
  id: { type: "number" },
  name: { type: "string" },
  type: { type: "number" },
  currentBalance: { type: "number" },
};

const creditAccountsConfig: TableConfig = {
  idAccount: { type: "number" },
  creditLimit: { type: "number" },
  cutOffDay: { type: "number" },
  paymentDueDay: { type: "number" },
};

const goalsConfig: TableConfig = {
  id: { type: "number" },
  name: { type: "string" },
  targetAmount: { type: "number" },
  currentAmount: { type: "number" },
  startDate: { type: "number" },
  endDate: { type: "number" },
};

const indexes: Index[] = [
  { id: "id_accounts", tableId: "accounts", cellId: "id" },
  { id: "id_creditAccounts", tableId: "creditAccounts", cellId: "idAccount" },
  { id: "id_goals", tableId: "goals", cellId: "id" },
];

const foreignKeys: ForeignKey[] = [
  {
    id: "credit_account",
    tableId: "creditAccounts",
    oTableId: "accounts",
    cellId: "id",
  },
];

export {
  accountsConfig,
  creditAccountsConfig,
  goalsConfig,
  indexes,
  foreignKeys,
};
