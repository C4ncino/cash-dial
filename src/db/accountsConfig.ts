const currenciesConfig: TableConfig = {
  name: { type: "string" },
  symbol: { type: "string" },
  code: { type: "string" },
};

const accountsConfig: TableConfig = {
  name: { type: "string" },
  type: { type: "number" },
  currentBalance: { type: "number" },
  currency: { type: "string" },
};

const creditAccountsConfig: TableConfig = {
  idAccount: { type: "string" },
  creditLimit: { type: "number" },
  cutOffDay: { type: "number" },
  paymentDueDay: { type: "number" },
};

const goalsConfig: TableConfig = {
  name: { type: "string" },
  targetAmount: { type: "number" },
  currentAmount: { type: "number" },
  startDate: { type: "number" },
  endDate: { type: "number" },
  currency: { type: "string" },
};

const indexes: Index[] = [];

const foreignKeys: ForeignKey[] = [
  {
    id: "accounts_currency",
    tableId: "accounts",
    oTableId: "currency",
    cellId: "currency",
  },
  {
    id: "credit_account",
    tableId: "creditAccounts",
    oTableId: "accounts",
    cellId: "idAccount",
  },
  {
    id: "goals_currency",
    tableId: "goals",
    oTableId: "currency",
    cellId: "currency",
  },
];

export {
  currenciesConfig,
  accountsConfig,
  creditAccountsConfig,
  goalsConfig,
  indexes,
  foreignKeys,
};
