const categoriesConfig: TableConfig = {
  id: { type: "number" },
  idFather: { type: "number" },
  name: { type: "string" },
};

const indexes: Index[] = [
  { id: "id_categories", tableId: "categories", cellId: "id" },
];

export { categoriesConfig, indexes };
