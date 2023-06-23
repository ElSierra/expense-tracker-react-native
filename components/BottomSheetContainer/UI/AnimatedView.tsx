import React, { useState, useEffect, ReactNode, PropsWithChildren } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  RegisteredStyle,
  ViewStyle,
} from "react-native";
import { useAppSelector } from "../../../redux/hooks/hooks";

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

export const AnimatedViewBottomSheet = ({
  isVisible,

  children,
}: {
  isVisible: boolean;
 
  children: ReactNode;
}) => {
  const [animation] = useState(new Animated.Value(0));



  useEffect(() => {

    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
    
   
  }, [isVisible]);

  const animatedStyle = {
    opacity: animation,
  };

  return <Animated.View style={[{width: "100%", height: "100%"},animatedStyle]}>{children}</Animated.View>;
};
