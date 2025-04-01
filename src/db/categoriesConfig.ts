const categoriesConfig: TableConfig = {
  idFather: { type: "string", default: "" },
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

export const data = [
  { name: "Comida y Bebida" },
  { name: "Compras" },
  { name: "Vivienda" },
  { name: "Vehículos y Transporte" },
  { name: "Vida y Bienestar" },
  { name: "Entretenimiento" },
  { name: "Educación" },
  { name: "Comunicaciones" },
  { name: "Gastos Financieros" },
  { name: "Inversiones" },
  { name: "Ingreso" },
  { name: "Otros" },

  // Comida y Bebida
  { idFather: "0", name: "Supermercados" },
  { idFather: "0", name: "Costco" },
  { idFather: "0", name: "Licorerías" },
  { idFather: "0", name: "Restaurantes" },
  { idFather: "0", name: "Cafeterías" },
  { idFather: "0", name: "Bares" },

  // Compras
  { idFather: "1", name: "Compras en línea" },
  { idFather: "1", name: "Ropa y Calzado" },
  { idFather: "1", name: "Joyas y Accesorios" },
  { idFather: "1", name: "Salud y Belleza" },
  { idFather: "1", name: "Bebés y Niños" },
  { idFather: "1", name: "Casa y Jardín" },
  { idFather: "1", name: "Mascotas" },
  { idFather: "1", name: "Electrodoméstico" },
  { idFather: "1", name: "Tecnología" },
  { idFather: "1", name: "Regalos" },
  { idFather: "1", name: "Papelería" },
  { idFather: "1", name: "Herramientas" },
  { idFather: "1", name: "Tiempo Libre" },
  { idFather: "1", name: "Farmacias" },
  { idFather: "1", name: "Software" },

  // Vivienda
  { idFather: "2", name: "Renta" },
  { idFather: "2", name: "Impuestos" },
  { idFather: "2", name: "Hipoteca" },
  { idFather: "2", name: "Servicios Públicos" },
  { idFather: "2", name: "Mantenimiento" },
  { idFather: "2", name: "Seguro de propiedad" },

  // Vehículos y Transporte
  { idFather: "3", name: "Gasolina" },
  { idFather: "3", name: "Mantenimiento" },
  { idFather: "3", name: "Seguro" },
  { idFather: "3", name: "Estacionamiento" },
  { idFather: "3", name: "Renta" },
  { idFather: "3", name: "Tenencia" },
  { idFather: "3", name: "Verificación" },
  { idFather: "3", name: "Transporte Público" },
  { idFather: "3", name: "Taxi y Uber" },
  { idFather: "3", name: "Vuelos y Camiones" },

  // Salud y Bienestar
  { idFather: "4", name: "Citas Médicas" },
  { idFather: "4", name: "Bienestar y Belleza" },
  { idFather: "4", name: "Pasatiempos" },
  { idFather: "4", name: "Deporte" },
  { idFather: "4", name: "Caridad" },
  { idFather: "4", name: "Vacaciones" },

  // Entretenimiento
  { idFather: "5", name: "Eventos" },
  { idFather: "5", name: "Cine y Teatro" },
  { idFather: "5", name: "Música" },
  { idFather: "5", name: "Libros" },
  { idFather: "5", name: "Suscripciones" },
  { idFather: "5", name: "TV y Streaming" },
  { idFather: "5", name: "Juguetes" },
  { idFather: "5", name: "Videojuegos" },

  // Educación
  { idFather: "6", name: "Cuotas" },
  { idFather: "6", name: "Cursos" },
  { idFather: "6", name: "Libros" },

  // Comunicaciones
  { idFather: "7", name: "Internet" },
  { idFather: "7", name: "Telefonía" },
  { idFather: "7", name: "Servicios Postales" },

  // Gastos Financieros
  { idFather: "8", name: "Impuestos" },
  { idFather: "8", name: "Seguros" },
  { idFather: "8", name: "Préstamos" },
  { idFather: "8", name: "Multas" },
  { idFather: "8", name: "Familiar" },
  { idFather: "8", name: "Asesoramiento" },

  // Inversiones
  { idFather: "9", name: "Bienes Raíces" },
  { idFather: "9", name: "Inversiones Financieras" },
  { idFather: "9", name: "Ahorro" },

  // Ingresos
  { idFather: "10", name: "Sueldo" },
  { idFather: "10", name: "Facturas" },
  { idFather: "10", name: "Intereses y Dividendos" },
  { idFather: "10", name: "Venta" },
  { idFather: "10", name: "Ingreso de Alquiler" },
  { idFather: "10", name: "Préstamos" },
  { idFather: "10", name: "Cheques" },
  { idFather: "10", name: "Reembolsos" },
  { idFather: "10", name: "Familiar" },
  { idFather: "10", name: "Regalos" },

  // Otros
]

export { categoriesConfig, indexes, foreignKeys };
