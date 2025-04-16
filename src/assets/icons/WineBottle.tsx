import { Ref, forwardRef } from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const Icon = (props: SvgProps, ref: Ref<Svg>) => (
  <Svg viewBox="0 0 48 48" ref={ref} {...props}>
    <Path
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M15 30a9 9 0 0 1 1.8-5.4l3.6-4.8A3 3 0 0 0 21 18V4h6v14a3 3 0 0 0 .6 1.8l3.6 4.8A9 9 0 0 1 33 30v12a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2zm6-20h6m-6 2V8m6 4V8"
    />
  </Svg>
);

const WineBottle = forwardRef(Icon);
export default WineBottle;
