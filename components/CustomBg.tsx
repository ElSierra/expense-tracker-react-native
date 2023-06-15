import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { View } from "react-native";

export const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
  animatedIndex,

}) => {
  //#region styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    // @ts-ignore
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      ["#D7EBA800","#D7EBA8",]
    ),
  }));
  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle]
  );
  //#endregion

  // render
  return <Animated.View pointerEvents="none" style={[containerStyle, {borderRadius: 20, marginLeft:20,marginTop:10, marginRight: 20}]}>
   
  </Animated.View>;
};

export default CustomBackground;
