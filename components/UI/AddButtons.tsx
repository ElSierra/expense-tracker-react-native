import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { ArrowRight, TrashIcon } from "../icons";
import { addExpense, updateExpense } from "../../redux/slice/expenseSlice";
import { closeModal } from "../../redux/slice/modalSlice";
import { useAppDispatch } from "../../redux/hooks/hooks";

export default function AddButtons() {
  const dispatch = useAppDispatch();

  const updateExpenseHandler = () => {
    dispatch(
      addExpense({
        name: "Syscode",
        amount: 1000,
        category: "Internet",
        date: new Date(),
      })
    );
    dispatch(closeModal());
  };
  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={updateExpenseHandler}
        icon={({ color, size }) => <ArrowRight color={color} size={size} />}
        mode="contained"
        labelStyle={{ fontSize: 16, fontFamily: "JakaraSemiBold", color: 'white' }}
        contentStyle={{ flexDirection: "row-reverse" }}
        style={{
          borderRadius: 10,
          backgroundColor: "#00BA62",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
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
