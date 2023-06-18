import { View, Text, StyleSheet, BackHandler } from "react-native";
import IconButton from "../UI/IconButton";
import { ArrowRight, CloseCircleIcon, TrashIcon } from "../icons";
import HeaderTextClose from "../UI/HeaderTextClose";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

export default function AddComponent() {
  const modalState = useAppSelector((state) => state.modal);


  return (
    <View style={styles.screen}>
      <HeaderTextClose header="Add" />
      <View style={{ flex: 1 }}></View>
    
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 2,
  },
});
