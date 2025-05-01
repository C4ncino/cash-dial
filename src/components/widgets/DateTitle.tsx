import { Text } from "react-native";

import useDate from "@/hooks/useDate";

interface Props {
  date: number;
}

const DateTitle = ({ date }: Props) => {
  const { dateLong } = useDate(date);

  return <Text className="text-xl ps-2 py-2 dark:text-white">{dateLong}</Text>;
};

export default DateTitle;
