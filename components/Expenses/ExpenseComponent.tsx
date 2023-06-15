import { StyleSheet, View, Text } from "react-native";

import ExpenseList from "./ExpenseList";
import { Expenses } from "../../data/model";
export default function ExpenseComponent({
  expenses,
  periodName,
  ListHeaderComponent,
}: {
  expenses: Expenses[];
  periodName: string;
  ListHeaderComponent?: JSX.Element;
}) {
  const expenseSum = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const formattedExpenseSum = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(expenseSum);
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.textHead}>{periodName}</Text>
        <Text style={styles.textHead}>{formattedExpenseSum}</Text>
      </View>
      <ExpenseList
        expenses={expenses}
        ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textHead: {
    fontSize: 15,
    color: "black",
    fontFamily: "JakaraExtraBold"
   
  },
});
