import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import ExpenseComponent from "../components/Expenses/ExpenseComponent";
import { EXPENSE_DATA } from "../data/data";
import ChartFull from "../components/Expenses/ChartFull";
import { useAppSelector } from "../redux/hooks/hooks";

export default function AllExpenses() {
  
  return (
    <View style={styles.root}>
      <View style={styles.allExpensesContainer}>
        <Text style={styles.allExpensesText}>All Expenses</Text>
      </View>
      <View style={styles.main}>
        <ExpenseComponent
          expenses={EXPENSE_DATA}
          periodName="Total"
          ListHeaderComponent={<ChartFull />}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  main: {
    flex: 1,
    marginTop: 30,
  },
  allExpensesContainer: {
    marginTop: 30,
  },
  allExpensesText:{
    fontFamily: "JakaraExtraBold",
    fontSize:30
  }
});
