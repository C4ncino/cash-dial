import * as budgets from "./budgetsConfig";
import * as accounts from "./accountsConfig";
import * as movements from "./movementsConfig";
import * as plannings from "./planningsConfig";
import * as categories from "./categoriesConfig";

import { TablesSchema } from "tinybase/store";
// --------------------------------------------------------------------

export const TableSchema: TablesSchema = {
  // ----------------------------------------------
  accounts: accounts.accountsConfig,
  creditAccounts: accounts.creditAccountsConfig,
  goals: accounts.goalsConfig,
  // ----------------------------------------------
  categories: categories.categoriesConfig,
  // ----------------------------------------------
  incomes: movements.incomesConfig,
  expenses: movements.expensesConfig,
  transfers: movements.transfersConfig,
  templates: movements.templatesConfig,
  // ----------------------------------------------
  plannings: plannings.planningsConfig,
  recurringPlannings: plannings.recurringPlanningsConfig,
  payDaysPlannings: plannings.payDaysPlanningsConfig,
  historicPlannings: plannings.historicPlanningsConfig,
  // ----------------------------------------------
  budgets: budgets.budgetsConfig,
  historicBudgets: budgets.historicBudgetsConfig,
} as const;
