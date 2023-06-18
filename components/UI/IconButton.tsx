import { TouchableRipple } from "react-native-paper";
import { AddIcon } from "../icons";
import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";

export default function IconButton({
  pressColor,
  tintColor,
  size,
  onPress,
  children,
}: {
  pressColor: string | undefined;
  tintColor: string | undefined;
  size: number;
  onPress: () => void;
  children: ReactNode;
}) {
  return (
    <View style={[style.touchable, { height: size }]}>
      <TouchableRipple onPress={onPress}>{children}</TouchableRipple>
    </View>
  );
}

const style = StyleSheet.create({
  touchable: {
    borderRadius: 100,
    height: 40,
    padding: 0,

    backgroundColor: "#00000016",
    overflow: "hidden",
  },
});
