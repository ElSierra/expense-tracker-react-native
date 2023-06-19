import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { ArrowRight, TrashIcon } from "../icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { deleteExpense, updateExpense } from "../../redux/slice/expenseSlice";
import { closeModal } from "../../redux/slice/modalSlice";

export default function EditButtons() {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.modal);

  const deleteExpenseHandler = () => {
    console.log(modalState.id, "deleted");
    dispatch(deleteExpense({ id: modalState.id || "" }));
    dispatch(closeModal());
  };
  const updateExpenseHandler = () => {
    dispatch(
      updateExpense({
        id: modalState.id || "",
        expense: {
          name: "Syscode",
          amount: 1000,
          category: "Internet",
          date: new Date(),
        },
      })
    );
    dispatch(closeModal())
  };
  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={deleteExpenseHandler}
        icon={({ color, size }) => <TrashIcon color={color} size={size} />}
        mode="text"
        textColor="#FF2A29"
        style={{ borderRadius: 10 }}
      >
        Delete
      </Button>
      <Button
        onPress={updateExpenseHandler}
        icon={({ color, size }) => <ArrowRight color={color} size={size} />}
        mode="contained"
        contentStyle={{ flexDirection: "row-reverse" }}
        style={{ borderRadius: 10, backgroundColor: "#00BA62" }}
      >
        Update
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
