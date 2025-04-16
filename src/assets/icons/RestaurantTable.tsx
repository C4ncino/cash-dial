import { Ref, forwardRef } from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Icon = (props: SvgProps, ref: Ref<Svg>) => (
  <Svg viewBox="0 0 24 24" {...props} ref={ref}>
    <Path
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 21.001 7 18m8-7.999-1 1m4-8-3 3c-.545.545-.818.818-.964 1.112a2 2 0 0 0 0 1.776c.146.294.419.567.964 1.112s.818.818 1.112.964a2 2 0 0 0 1.776 0c.294-.146.567-.419 1.112-.964l3-3M20 5l-3 3m3 13-8-8m0 0L2 3c0 3.842 1.526 7.526 4.243 10.243L9 16z"
      color="#fff"
    />
  </Svg>
);
const Restaurant = forwardRef(Icon);
export default Restaurant;
