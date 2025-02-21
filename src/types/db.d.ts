type TableConfig = { [cellId: string]: CellSchema };

type Index = { id: string; tableId: string; cellId: string };

type ForeignKey = {
  id: string;
  tableId: string;
  oTableId: string;
  cellId: string;
};
