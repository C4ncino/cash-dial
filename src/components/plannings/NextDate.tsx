import colors from "tailwindcss/colors";
import { Text, StyleSheet } from "react-native";

import { IsToday, IsTomorrow } from "@/utils/dates";

import usePlanning from "@/hooks/usePlanning";
import { useSystemContext } from "@/contexts/hooks";

interface Props {
  idPlanning: string;
  type: number;
  fontSize?: "sm" | "base" | "lg" | "xl" | "2xl";
}

const NextDate = ({ idPlanning, type, fontSize = "sm" }: Props) => {
  const { isDark, currentDateInfo } = useSystemContext();

  const { currentPending, dailyPays, recurringType } = usePlanning(idPlanning);

  if (!currentPending) return null;

  const { isDaily } = recurringType;

  const diffTime = currentPending.date - currentDateInfo.timestamp;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const isToday = IsToday(currentPending.date);
  const isTomorrow = IsTomorrow(currentPending.date);

  const color =
    diffDays < 0 || isToday
      ? colors.red[500]
      : isTomorrow
        ? colors.amber[500]
        : isDark
          ? colors.zinc[300]
          : colors.zinc[700];

  return (
    <Text style={{ color, ...styles[fontSize] }}>
      {type === 1 ? "Pago" : "Pagar"}{" "}
      {diffDays < 0
        ? "ahora !!"
        : isToday
          ? "hoy !"
          : isTomorrow
            ? "mañana"
            : `en ${diffDays} días`}
      {isDaily &&
        dailyPays &&
        ` (${dailyPays.paid}\u200A/\u200A${dailyPays.missing})`}
    </Text>
  );
};

const styles = StyleSheet.create({
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 18,
    lineHeight: 28,
  },
  xl: {
    fontSize: 20,
    lineHeight: 28,
  },
  "2xl": {
    fontSize: 24,
    lineHeight: 32,
  },
});

export default NextDate;
