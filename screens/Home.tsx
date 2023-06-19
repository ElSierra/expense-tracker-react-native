import {
  View,
 
  StyleSheet,

} from "react-native";

import AnalyticsCard from "../components/Card/AnalyticsCard";

import ExpenseComponent from "../components/Expenses/ExpenseComponent";

import { useAppSelector } from "../redux/hooks/hooks";
import { getLessThanDate } from "../util/date";
import { FadeInView } from "../components/FadeInView";

export default function Home() {
  const expenseList = useAppSelector((state) => state.expense.expenses);
  const recentExpenses = expenseList.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getLessThanDate(today, 7);
    return expense.date > date7DaysAgo;
  });
  return (
    <FadeInView style={styles.root}>
      <View>
        <AnalyticsCard />
      </View>
      <View style={styles.root}>
        <ExpenseComponent expenses={recentExpenses.reverse()} periodName="Last 7 days" />
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 40,
  },
  moneyContainer: {
    alignItems: "center",
  },
  allTimeText: {
    fontSize: 20,

    color: "grey",
  },
  moneyText: {
    fontSize: 50,
    includeFontPadding: false,

    color: "black",
  },
});
