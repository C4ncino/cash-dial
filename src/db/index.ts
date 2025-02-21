import {
  indexes as accountsIdx,
  foreignKeys as accountsFK,
} from "./accountsConfig";
import {
  indexes as budgetsIdx,
  foreignKeys as budgetsFK,
} from "./budgetsConfig";
import {
  indexes as movementsIdx,
  foreignKeys as movementsFK,
} from "./movementsConfig";
import {
  indexes as planningsIdx,
  foreignKeys as planningsFK,
} from "./planningsConfig";
import { indexes as categoriesIdx } from "./categoriesConfig";
import { TableSchema } from "./tableSchema";

const indexes = [
  ...accountsIdx,
  ...budgetsIdx,
  ...categoriesIdx,
  ...movementsIdx,
  ...planningsIdx,
];

const foreignKeys = [
  ...accountsFK,
  ...budgetsFK,
  ...movementsFK,
  ...planningsFK,
];

export { TableSchema, indexes, foreignKeys };
