import Svg, { SvgProps } from "react-native-svg";

export const iconRenderer =
  (
    IconComponent: React.ForwardRefExoticComponent<
      SvgProps & React.RefAttributes<Svg>
    >
  ) =>
  (color = "#000", size = 24) => (
    <IconComponent width={size} height={size} strokeWidth={2} color={color} />
  );
