import { TouchableRipple } from "react-native-paper";
import { AddIcon } from "./icons";
import { StyleSheet, View } from "react-native";

export default function AddNewExpenseButton({
  pressColor,
  tintColor,
  onPress,
}: {
  pressColor: string | undefined;
  tintColor: string | undefined;
  onPress: () => void;
}) {
  return (
    <View style={style.touchable}>
      <TouchableRipple onPress={onPress}>
        <AddIcon color={"#580000"} size={40} />
      </TouchableRipple>
    </View>
  );
}

const style = StyleSheet.create({
  touchable: {
    borderRadius: 12,
    height: 40,
    padding: 0,
    marginRight: 10,
    backgroundColor: "#00000016",
    overflow: "hidden",
  },
});
