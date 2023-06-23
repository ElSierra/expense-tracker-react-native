import { View, StyleSheet, Button } from "react-native";

import AnalyticsCard from "../components/Card/AnalyticsCard";

import ExpenseComponent from "../components/Expenses/ExpenseComponent";

import { useAppSelector } from "../redux/hooks/hooks";
import {
  filterExpenseForCurrentWeek,
  getAmountsPerDay,
  getLessThanDate,
} from "../util/date";
import { FadeInView } from "../components/FadeInView";
import Toast from "react-native-toast-message";

export default function Home() {
  const expenseList = useAppSelector((state) => state.expense.expenses);
  const recentExpenses = expenseList.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getLessThanDate(today, 7);
    return expense.date > date7DaysAgo;
  });
  const thisweekexpense = filterExpenseForCurrentWeek(expenseList);
  console.log(
    "🚀 ~ file: Home.tsx:19 ~ Home ~ thisweekexpense:",
    thisweekexpense
  );
  const expenseSum = thisweekexpense?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const formattedExpenseSum = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(expenseSum);
  let amountperDay;
  if (thisweekexpense.length > 0) {
    amountperDay = getAmountsPerDay(thisweekexpense);
    console.log("🚀 ~ file: Home.tsx:32 ~ Home ~ amountperDay:", amountperDay);
  }

  return (
    <FadeInView style={styles.root}>
      <View>
        
        <AnalyticsCard
          amountPerDay={amountperDay || [0]}
          totalSpent={formattedExpenseSum.split(".")[0]}
        />
      </View>
      <View style={styles.root}>
        <ExpenseComponent
          expenses={recentExpenses.reverse()}
          periodName="Last 7 days"
        />
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
