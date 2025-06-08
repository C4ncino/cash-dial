import { View, Text } from "react-native";
import React from "react";
import useTinybase from "@/hooks/useDatabase";

const Schedules = () => {
  const { useAll } = useTinybase();

  const plannings = useAll("plannings");

  return (
    <View>
      <Text>Schedules</Text>
    </View>
  );
};

export default Schedules;
