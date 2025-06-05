import { ReactNode } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import Label from "./Label";
import SegmentedControlButton from "./SegmentedControlButton";

type SegmentedControlItem = {
  id: string | number;
  name: string;
  icon?: (color: string) => ReactNode;
};

interface Props {
  label?: string;
  data: SegmentedControlItem[] | readonly SegmentedControlItem[];
  value?: string | number;
  onChange: (value: string | number) => void;
  readonly?: boolean;
}

const SegmentedControl = ({
  label,
  data,
  value,
  onChange,
  readonly,
}: Props) => {
  return (
    <View>
      <Label label={label} />
      <View className="flex-row mt-1">
        {data.map((item, i) => (
          <SegmentedControlButton
            key={item.id}
            {...item}
            isFirst={i === 0}
            isLast={i === data.length - 1}
            isCurrent={item.id === value}
            onPress={() => onChange(item.id)}
            readonly={readonly}
          />
        ))}
      </View>
    </View>
  );
};

export default SegmentedControl;
