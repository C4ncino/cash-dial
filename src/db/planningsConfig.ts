const planningsConfig: TableConfig = {
  id: { type: "number" },
  idAccount: { type: "number" },
  idCategory: { type: "number" },
  name: { type: "string" },
  amount: { type: "number" },
  date: { type: "number" },
  type: { type: "number" },
  isRecurring: { type: "boolean" },
};

const recurringPlanningsConfig: TableConfig = {
  idPlanning: { type: "number" },
  endDate: { type: "number" },
  interval: { type: "number" },
};

const payDaysPlanningsConfig: TableConfig = {
  idPlanning: { type: "number" },
  day: { type: "number" },
  month: { type: "number" },
};

const historicPlanningsConfig: TableConfig = {
  idPlanning: { type: "number" },
  date: { type: "number" },
  amount: { type: "number" },
  idOrigin: { type: "number" },
};

const indexes: Index[] = [
  { id: "id_plannings", tableId: "plannings", cellId: "id" },
  {
    id: "id_recurringPlannings",
    tableId: "recurringPlannings",
    cellId: "idPlanning",
  },
  {
    id: "id_payDaysPlannings",
    tableId: "payDaysPlannings",
    cellId: "idPlanning",
  },
  {
    id: "id_historicPlannings",
    tableId: "historicPlannings",
    cellId: "idPlanning",
  },
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
];

export {
  planningsConfig,
  recurringPlanningsConfig,
  payDaysPlanningsConfig,
  historicPlanningsConfig,
  indexes,
  foreignKeys,
};
