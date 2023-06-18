import { View, Text, StyleSheet, BackHandler } from "react-native";
import IconButton from "../UI/IconButton";
import { ArrowRight, CloseCircleIcon, TrashIcon } from "../icons";
import HeaderTextClose from "../UI/HeaderTextClose";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

export default function EditComponent() {
  const modalState = useAppSelector((state) => state.modal);
  console.log(modalState.id);

  return (
    <View style={styles.screen}>
      <HeaderTextClose header="Edit" />
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {}}
          icon={({ color, size }) => <TrashIcon color={color} size={size} />}
          mode="text"
          textColor="#FF2A29"
          style={{ borderRadius: 10 }}
        >
          Delete
        </Button>
        <Button
          onPress={() => {}}
          icon={({ color, size }) => <ArrowRight color={color} size={size} />}
          mode="contained"
          contentStyle={{ flexDirection: "row-reverse" }}
          style={{ borderRadius: 10, backgroundColor: "#00BA62" }}
        >
          Update
        </Button>
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


