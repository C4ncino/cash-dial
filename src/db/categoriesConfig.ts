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

export const data = {
  "0": { name: "Comida y Bebida" },
  "1": { name: "Compras" },
  "2": { name: "Vivienda" },
  "3": { name: "Vehículos y Transporte" },
  "4": { name: "Vida y Bienestar" },
  "5": { name: "Entretenimiento" },
  "6": { name: "Educación" },
  "7": { name: "Comunicaciones" },
  "8": { name: "Gastos Financieros" },
  "9": { name: "Inversiones" },
  "10": { name: "Ingresos" },
  "11": { name: "Otros" },

  // Comida y Bebida
  "12": { idFather: "0", name: "Supermercados" },
  "13": { idFather: "0", name: "Costco" },
  "14": { idFather: "0", name: "Licorerías" },
  "15": { idFather: "0", name: "Restaurantes" },
  "16": { idFather: "0", name: "Cafeterías" },
  "17": { idFather: "0", name: "Bares" },

  // Compras
  "18": { idFather: "1", name: "Compras en línea" },
  "19": { idFather: "1", name: "Ropa y Calzado" },
  "20": { idFather: "1", name: "Joyas y Accesorios" },
  "21": { idFather: "1", name: "Salud y Belleza" },
  "22": { idFather: "1", name: "Bebés y Niños" },
  "23": { idFather: "1", name: "Casa y Jardín" },
  "24": { idFather: "1", name: "Mascotas" },
  "25": { idFather: "1", name: "Electrodoméstico" },
  "26": { idFather: "1", name: "Tecnología" },
  "27": { idFather: "1", name: "Regalos" },
  "28": { idFather: "1", name: "Papelería" },
  "29": { idFather: "1", name: "Farmacia" },
  "30": { idFather: "1", name: "Herramientas" },
  "31": { idFather: "1", name: "Software" },

  // Vivienda
  "32": { idFather: "2", name: "Renta" },
  "33": { idFather: "2", name: "Impuestos" },
  "34": { idFather: "2", name: "Hipoteca" },
  "35": { idFather: "2", name: "Servicios Públicos" },
  "36": { idFather: "2", name: "Mantenimiento" },
  "37": { idFather: "2", name: "Seguro" },

  // Vehículos y Transporte
  "38": { idFather: "3", name: "Gasolina" },
  "39": { idFather: "3", name: "Mantenimiento" },
  "40": { idFather: "3", name: "Seguro" },
  "41": { idFather: "3", name: "Estacionamiento" },
  "42": { idFather: "3", name: "Renta" },
  "43": { idFather: "3", name: "Tenencia" },
  "44": { idFather: "3", name: "Verificación" },
  "45": { idFather: "3", name: "Transporte Público" },
  "46": { idFather: "3", name: "Taxi y Uber" },
  "47": { idFather: "3", name: "Vuelos y Camiones" },

  // Salud y Bienestar
  "48": { idFather: "4", name: "Citas Médicas" },
  "49": { idFather: "4", name: "Bienestar y Belleza" },
  "50": { idFather: "4", name: "Pasatiempos" },
  "51": { idFather: "4", name: "Deporte" },
  "52": { idFather: "4", name: "Caridad" },
  "53": { idFather: "4", name: "Vacaciones" },

  // Entretenimiento
  "54": { idFather: "5", name: "Eventos" },
  "55": { idFather: "5", name: "Cine y Teatro" },
  "56": { idFather: "5", name: "Música" },
  "57": { idFather: "5", name: "Libros" },
  "58": { idFather: "5", name: "Suscripciones" },
  "59": { idFather: "5", name: "TV y Streaming" },
  "60": { idFather: "5", name: "Juguetes" },
  "61": { idFather: "5", name: "Videojuegos" },

  // Educación
  "62": { idFather: "6", name: "Cuotas" },
  "63": { idFather: "6", name: "Cursos" },
  "64": { idFather: "6", name: "Libros" },

  // Comunicaciones
  "65": { idFather: "7", name: "Internet" },
  "66": { idFather: "7", name: "Telefonía" },
  "67": { idFather: "7", name: "Servicios Postales" },

  // Gastos Financieros
  "68": { idFather: "8", name: "Impuestos" },
  "69": { idFather: "8", name: "Seguros" },
  "70": { idFather: "8", name: "Préstamos" },
  "71": { idFather: "8", name: "Multas" },
  "72": { idFather: "8", name: "Familiar" },
  "73": { idFather: "8", name: "Asesoramiento" },

  // Inversiones
  "74": { idFather: "9", name: "Bienes Raíces" },
  "75": { idFather: "9", name: "Financieras" },
  "76": { idFather: "9", name: "Ahorro" },

  // Ingresos
  "77": { idFather: "10", name: "Sueldo" },
  "78": { idFather: "10", name: "Facturas" },
  "79": { idFather: "10", name: "Inversiones" },
  "80": { idFather: "10", name: "Venta" },
  "81": { idFather: "10", name: "Alquiler" },
  "82": { idFather: "10", name: "Préstamos" },
  "83": { idFather: "10", name: "Cheques" },
  "84": { idFather: "10", name: "Reembolsos" },
  "85": { idFather: "10", name: "Familiar" },
  "86": { idFather: "10", name: "Regalos" },

  // Otros
}

export { categoriesConfig, indexes, foreignKeys };
