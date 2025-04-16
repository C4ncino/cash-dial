import { Ref, forwardRef } from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const Icon = (props: SvgProps, ref: Ref<Svg>) => (
  <Svg viewBox="0 0 24 24" ref={ref} {...props}>
    <Path
      fill="#fff"
      d="M14.77 9L12 12.11L9.23 9zM21 3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2z"
    />
  </Svg>
);

const Drink = forwardRef(Icon);
export default Drink;
