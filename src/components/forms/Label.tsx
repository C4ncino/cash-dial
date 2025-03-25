import { Text } from "react-native";

interface Props {
  label?: string;
}

const Label = ({ label }: Props) => {
  if (!label) return null;

  return (
    <Text className="text-lg font-semibold mb-1 dark:text-white">{label}</Text>
  );
};

export default Label;
