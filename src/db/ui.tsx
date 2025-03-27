import { Cash, CreditCard, MastercardCard } from "iconoir-react-native";
import colors from "tailwindcss/colors";

export const ACCOUNT_TYPES = {
  CASH: {
    id: 1,
    name: "Efectivo",
    icon: (color = "#000") => (
      <Cash width={24} height={24} strokeWidth={2} color={color} />
    ),
    color: colors.green[600],
  },
  DEBIT: {
    id: 2,
    name: "Débito",
    icon: (color = "#000") => (
      <CreditCard width={24} height={24} strokeWidth={2} color={color} />
    ),
    color: colors.blue[600],
  },
  CREDIT: {
    id: 3,
    name: "Crédito",
    icon: (color = "#000") => (
      <MastercardCard width={24} height={24} strokeWidth={2} color={color} />
    ),
    color: colors.red[600],
  },
} as const;

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
];
