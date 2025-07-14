const planningsConfig: TableConfig = {
  idAccount: { type: "string" },
  idCategory: { type: "string" },
  name: { type: "string" },
  amount: { type: "number" },
  currency: { type: "string" },
  date: { type: "number" },
  type: { type: "number" },
  recurringType: { type: "number" },
};

const recurringPlanningsConfig: TableConfig = {
  idPlanning: { type: "string" },
  interval: { type: "number", default: 1 },
  times: { type: "number", default: 1 },
  startDate: { type: "number" },
};

const payDaysPlanningsConfig: TableConfig = {
  idPlanning: { type: "string" },
  day: { type: "number" },
  month: { type: "number" },
};

const historicPlanningsConfig: TableConfig = {
  idPlanning: { type: "string" },
  status: { type: "number", default: 0 },
  date: { type: "number" },
  amount: { type: "number" },
  idOrigin: { type: "number" },
};

const indexes: Index[] = [
  // { id: "id_plannings", tableId: "plannings", cellId: "id" },
  // {
  //   id: "id_recurringPlannings",
  //   tableId: "recurringPlannings",
  //   cellId: "idPlanning",
  // },
  // {
  //   id: "id_payDaysPlannings",
  //   tableId: "payDaysPlannings",
  //   cellId: "idPlanning",
  // },
  // {
  //   id: "id_historicPlannings",
  //   tableId: "historicPlannings",
  //   cellId: "idPlanning",
  // },
];

const foreignKeys: ForeignKey[] = [
  {
    id: "plannings_account",
    tableId: "plannings",
    oTableId: "accounts",
    cellId: "idAccount",
  },
  {
    id: "plannings_category",
    tableId: "plannings",
    oTableId: "categories",
    cellId: "idCategory",
  },
  {
    id: "recurringPlannings_planning",
    tableId: "recurringPlannings",
    oTableId: "plannings",
    cellId: "idPlanning",
  },
  {
    id: "payDaysPlannings_planning",
    tableId: "payDaysPlannings",
    oTableId: "plannings",
    cellId: "idPlanning",
  },
  {
    id: "historicPlannings_planning",
    tableId: "historicPlannings",
    oTableId: "plannings",
    cellId: "idPlanning",
  },
  {
    id: "plannings_currency",
    tableId: "plannings",
    oTableId: "currencies",
    cellId: "currency",
  },
];

export {
  planningsConfig,
  recurringPlanningsConfig,
  payDaysPlanningsConfig,
  historicPlanningsConfig,
  indexes,
  foreignKeys,
};
