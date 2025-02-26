const categoriesConfig: TableConfig = {
  idFather: { type: "string" },
  name: { type: "string" },
};

const indexes: Index[] = [
  // { id: "id_father_categories", tableId: "categories", cellId: "idFather" },
];

const foreignKeys: ForeignKey[] = [
  {
    id: "categories_categories",
    tableId: "categories",
    oTableId: "categories",
    cellId: "_id",
  },
];

export { categoriesConfig, indexes, foreignKeys };
