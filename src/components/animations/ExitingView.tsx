import { PropsWithChildren } from "react";
import Animated, { FadeOut, runOnJS } from "react-native-reanimated";

interface Props extends PropsWithChildren {
  index?: number;
  duration?: number;
  delay?: number;
  onFinish?: () => void;
}

const ExitingView = ({
  children,
  index = 1,
  duration = 1000,
  delay = 0,
  onFinish = () => {},
}: Props) => {
  return (
    <Animated.View
      entering={FadeOut.delay(index * delay)
        .duration(duration)
        .withCallback(() => runOnJS(onFinish)())}
    >
      {children}
    </Animated.View>
  );
};

export default ExitingView;
