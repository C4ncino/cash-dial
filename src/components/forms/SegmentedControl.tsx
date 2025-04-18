import { ReactNode } from "react";
import { View } from "react-native";

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
}

const SegmentedControl = ({ label, data, value, onChange }: Props) => {
  return (
    <View>
      <Label label={label} />
      <View className="flex-row  w-full">
        {data.map((item, i) => (
          <SegmentedControlButton
            key={i}
            {...item}
            isFirst={i === 0}
            isLast={i === data.length - 1}
            isCurrent={item.id === value}
            onPress={() => onChange(item.id)}
          />
        ))}
      </View>
    </View>
  );
};

export default SegmentedControl;
