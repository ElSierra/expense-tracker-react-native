import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ArrowRight, TrashIcon } from "../icons";

export default function AddButtons() {
  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={() => {}}
        icon={({ color, size }) => <TrashIcon color={color} size={size} />}
        mode="text"
        textColor="#FF2A29"
        style={{ borderRadius: 10 }}
      >
        Cancel
      </Button>
      <Button
        onPress={() => {}}
        icon={({ color, size }) => <ArrowRight color={color} size={size} />}
        mode="contained"
        contentStyle={{ flexDirection: "row-reverse" }}
        style={{ borderRadius: 10, backgroundColor: "#00BA62" }}
      >
        Add
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 2,
  },
});
