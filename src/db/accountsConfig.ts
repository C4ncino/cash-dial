const accountsConfig: TableConfig = {
  name: { type: "string" },
  type: { type: "number" },
  currentBalance: { type: "number" },
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
};

const indexes: Index[] = [];

const foreignKeys: ForeignKey[] = [
  {
    id: "credit_account",
    tableId: "creditAccounts",
    oTableId: "accounts",
    cellId: "idAccount",
  },
];

export {
  accountsConfig,
  creditAccountsConfig,
  goalsConfig,
  indexes,
  foreignKeys,
};
