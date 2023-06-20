import { View, Text, StyleSheet, BackHandler } from "react-native";
import IconButton from "../UI/IconButton";
import { ArrowRight, CloseCircleIcon, TrashIcon } from "../icons";
import HeaderTextClose from "../UI/HeaderTextClose";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import InputText from "./UI/InputText";
import InputIconText from "./UI/InputIconText";

export default function EditComponent() {
  const modalState = useAppSelector((state) => state.modal);
  console.log(modalState.id);
  return (
    <View style={styles.screen}>
      <HeaderTextClose header="Edit" />
      <View style={{ width: "100%", height: "100%" }}>
        <InputText />
        <InputIconText icon={undefined} />
      </View>
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
