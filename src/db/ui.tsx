import {
  Cash,
  CreditCard,
  MastercardCard,
  ShoppingBag,
  Internet,
  Shirt,
  Glasses,
  Heart,
  Stroller,
  HomeAlt,
  Wolf,
  Laptop,
  Gift,
  EmptyPage,
  PharmacyCrossTag,
  Tools,
  PcCheck,
  HomeAltSlimHoriz,
  HomeUser,
  HomeSale,
  DomoticWarning,
  LightBulb,
  Hammer,
  HomeSecure,
  Car,
  GasTankDroplet,
  Parking,
  Bus,
  Airplane,
  MapPin,
  HandCard,
  UserLove,
  Hospital,
  Flower,
  Gym,
  Hourglass,
  Donate,
  SeaAndSun,
  CinemaOld,
  MusicDoubleNote,
  OpenBook,
  Tv,
  Community,
  Star,
  Rocket,
  Sparks,
  GraduationCap,
  BrainResearch,
  Phone,
  SendMail,
  Antenna,
  Bank,
  HandCash,
  Group,
  Page,
  PageSearch,
  PrivacyPolicy,
  MultiBubble,
  PiggyBank,
  City,
  GraphUp,
  Reports,
  ReceiveDollars,
  Suitcase,
  Cart,
  Undo,
  PageEdit,
  CoffeeCup,
  Apple,
  Box,
  HistoricShield,
  AppleImac2021,
  EvPlug,
  Wrench,
  Gamepad,
} from "iconoir-react-native";

import colors from "tailwindcss/colors";

import Drink from "@/assets/icons/Drink";
import Costco from "@/assets/icons/Costco";
import WineBottle from "@/assets/icons/WineBottle";
import Restaurant from "@/assets/icons/RestaurantTable";

import { iconRenderer } from "@/utils/iconHelpers";

export enum ACCOUNT_TYPES_ID {
  CASH = 1,
  DEBIT = 2,
  CREDIT = 3,
}

export const ACCOUNT_TYPES = {
  1: {
    id: 1,
    name: "Efectivo",
    icon: iconRenderer(Cash),
    color: colors.green[600],
  },
  2: {
    id: 2,
    name: "Débito",
    icon: iconRenderer(CreditCard),
    color: colors.blue[600],
  },
  3: {
    id: 3,
    name: "Crédito",
    icon: iconRenderer(MastercardCard),
    color: colors.red[600],
  },
} as const;

export enum MOVEMENT_TYPES_ID {
  EXPENSE,
  INCOME,
  TRANSFER,
}

export const MOVEMENT_TYPES = {
  0: {
    id: 0,
    name: "Gasto",
  },
  1: {
    id: 1,
    name: "Ingreso",
  },
  2: {
    id: 2,
    name: "Transferencia",
  },
} as const;

export enum BUDGET_TYPES_ID {
  WEEKLY,
  MONTHLY,
  YEARLY,
}

export const BUDGET_TYPES = {
  0: {
    id: 0,
    name: "Semanal",
  },
  1: {
    id: 1,
    name: "Mensual",
  },
  2: {
    id: 2,
    name: "Anual",
  },
} as const;

export enum PLANNINGS_TYPES_ID {
  UNIQUE,
  DAILY,
  WEEKLY,
  MONTHLY,
  YEARLY,
}

export const PLANNINGS_TYPES = {
  0: {
    id: 0,
    name: "Único",
    singular: undefined,
    plural: undefined,
  },
  1: {
    id: 1,
    name: "Diario",
    singular: "día",
    plural: "días",
  },
  2: {
    id: 2,
    name: "Semanal",
    singular: "semana",
    plural: "semanas",
  },
  3: {
    id: 3,
    name: "Mensual",
    singular: "mes",
    plural: "meses",
  },
  4: {
    id: 4,
    name: "Anual",
    singular: "año",
    plural: "años",
  },
} as const;

export enum PLANNING_STAGES_ID {
  PENDING,
  COMPLETED,
  CANCELLED,
}

export const PLANNING_STAGES = {
  0: { id: 0, name: "Pendiente" },
  1: { id: 1, name: "Completado" },
  2: { id: 2, name: "Cancelado" },
};

export const DAYS = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
  { id: "9" },
  { id: "10" },
  { id: "11" },
  { id: "12" },
  { id: "13" },
  { id: "14" },
  { id: "15" },
  { id: "16" },
  { id: "17" },
  { id: "18" },
  { id: "19" },
  { id: "20" },
  { id: "21" },
  { id: "22" },
  { id: "23" },
  { id: "24" },
  { id: "25" },
  { id: "26" },
  { id: "27" },
  { id: "28" },
  { id: "29" },
  { id: "30" },
  { id: "31" },
] as const;

export const MONTHS = [
  { id: "Enero" },
  { id: "Febrero" },
  { id: "Marzo" },
  { id: "Abril" },
  { id: "Mayo" },
  { id: "Junio" },
  { id: "Julio" },
  { id: "Agosto" },
  { id: "Septiembre" },
  { id: "Octubre" },
  { id: "Noviembre" },
  { id: "Diciembre" },
] as const;

export const MONTH_DAYS = {
  Enero: 31,
  Febrero: 28,
  Marzo: 31,
  Abril: 30,
  Mayo: 31,
  Junio: 30,
  Julio: 31,
  Agosto: 31,
  Septiembre: 30,
  Octubre: 31,
  Noviembre: 30,
  Diciembre: 31,
} as const;

export const CATEGORY_ICONS = {
  // Comida y Bebida
  "0": iconRenderer(Apple),
  "12": iconRenderer(Cart),
  "13": iconRenderer(Costco),
  "14": iconRenderer(WineBottle),
  "15": iconRenderer(Restaurant),
  "16": iconRenderer(CoffeeCup),
  "17": iconRenderer(Drink),

  // Compras
  "1": iconRenderer(ShoppingBag),
  "18": iconRenderer(AppleImac2021),
  "19": iconRenderer(Shirt),
  "20": iconRenderer(Glasses),
  "21": iconRenderer(Heart),
  "22": iconRenderer(Stroller),
  "23": iconRenderer(HomeAlt),
  "24": iconRenderer(Wolf),
  "25": iconRenderer(EvPlug),
  "26": iconRenderer(Laptop),
  "27": iconRenderer(Gift),
  "28": iconRenderer(EmptyPage),
  "29": iconRenderer(PharmacyCrossTag),
  "30": iconRenderer(Tools),
  "31": iconRenderer(PcCheck),

  // Vivienda
  "2": iconRenderer(HomeAltSlimHoriz),
  "32": iconRenderer(HomeUser),
  "33": iconRenderer(HomeSale),
  "34": iconRenderer(DomoticWarning),
  "35": iconRenderer(LightBulb),
  "36": iconRenderer(Hammer),
  "37": iconRenderer(HomeSecure),

  // Vehículos y Transporte
  "3": iconRenderer(Car),
  "38": iconRenderer(GasTankDroplet),
  "39": iconRenderer(Wrench),
  "40": iconRenderer(HistoricShield),
  "41": iconRenderer(Parking),
  "42": iconRenderer(HandCard),
  "43": iconRenderer(Page),
  "44": iconRenderer(PageSearch),
  "45": iconRenderer(Bus),
  "46": iconRenderer(MapPin),
  "47": iconRenderer(Airplane),

  // Salud y Bienestar
  "4": iconRenderer(UserLove),
  "48": iconRenderer(Hospital),
  "49": iconRenderer(Flower),
  "50": iconRenderer(Hourglass),
  "51": iconRenderer(Gym),
  "52": iconRenderer(Donate),
  "53": iconRenderer(SeaAndSun),

  // Entretenimiento
  "5": iconRenderer(Sparks),
  "54": iconRenderer(Community),
  "55": iconRenderer(CinemaOld),
  "56": iconRenderer(MusicDoubleNote),
  "57": iconRenderer(OpenBook),
  "58": iconRenderer(Star),
  "59": iconRenderer(Tv),
  "60": iconRenderer(Rocket),
  "61": iconRenderer(Gamepad),

  // Educación
  "6": iconRenderer(GraduationCap),
  "62": iconRenderer(HandCard),
  "63": iconRenderer(BrainResearch),
  "64": iconRenderer(OpenBook),

  // Comunicaciones
  "7": iconRenderer(Antenna),
  "65": iconRenderer(Internet),
  "66": iconRenderer(Phone),
  "67": iconRenderer(SendMail),

  // Gastos Financieros
  "8": iconRenderer(Bank),
  "68": iconRenderer(Page),
  "69": iconRenderer(HistoricShield),
  "70": iconRenderer(HandCash),
  "71": iconRenderer(PrivacyPolicy),
  "72": iconRenderer(Group),
  "73": iconRenderer(MultiBubble),

  // Inversiones
  "9": iconRenderer(Reports),
  "74": iconRenderer(City),
  "75": iconRenderer(GraphUp),
  "76": iconRenderer(PiggyBank),

  // Ingresos
  "10": iconRenderer(ReceiveDollars),
  "77": iconRenderer(Suitcase),
  "78": iconRenderer(Page),
  "79": iconRenderer(Reports),
  "80": iconRenderer(Cart),
  "81": iconRenderer(HomeUser),
  "82": iconRenderer(HandCash),
  "83": iconRenderer(PageEdit),
  "84": iconRenderer(Undo),
  "85": iconRenderer(Group),
  "86": iconRenderer(Gift),

  // Otros
  "11": iconRenderer(Box),
} as const;

export const CATEGORY_COLORS = {
  "0": colors.green[600],
  "1": colors.cyan[500],
  "2": colors.amber[600],
  "3": colors.rose[600],
  "4": colors.emerald[600],
  "5": colors.violet[500],
  "6": colors.pink[600],
  "7": colors.blue[400],
  "8": colors.amber[500],
  "9": colors.red[500],
  "10": colors.orange[500],
  "11": colors.gray[600],
} as const;

export type CategoryIconKey = keyof typeof CATEGORY_ICONS;
export type CategoryColorKey = keyof typeof CATEGORY_COLORS;
