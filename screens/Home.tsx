import { View, StyleSheet, Button } from "react-native";

import AnalyticsCard from "../components/Card/AnalyticsCard";

import ExpenseComponent from "../components/Expenses/ExpenseComponent";

import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
import {
  filterExpenseForCurrentWeek,
  getAmountsPerDay,
  getLessThanDate,
} from "../util/date";
import { FadeInView } from "../components/FadeInView";
import { useEffect, useState } from "react";

import { setExpense } from "../redux/slice/expenseSlice";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function Home() {
  const expenseList = useAppSelector((state) => state.expense.expenses);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
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

  useEffect(() => {
    setIsFetching(true);
    async function getExpenses() {
      let expenseList: {
        id: string;
        name: string;
        category: any;
        date: any;
        amount: number;
      }[] = [];

      const expenses = await firestore()
        .collection("expenses")
        .doc(auth().currentUser?.uid)
        .collection("data")
        .get()
        .then((querySnapshot) => {
          setIsFetching(false);
          querySnapshot.forEach((documentSnapshot) => {
            const snap = {
              id: documentSnapshot.id,
              name: documentSnapshot.data().name,
              category: documentSnapshot.data().category,
              date: documentSnapshot.data().date.toDate(),
              amount: documentSnapshot.data().amount,
            };
            expenseList.push(snap);
          });
        })
        .catch((error) => {
          setIsFetching(false);
          setError(error);
        });

      console.log(
        "🚀 ~ file: ExpenseList.tsx:31 ~ getExpenses ~ expenseList:",
        expenseList
      );

      dispatch(setExpense(expenseList));
    }
    getExpenses();
  }, []);
  if (isFetching) {
    return <LoadingOverlay />;
  }
  if (error) {
    return <ErrorOverlay error={error} />;
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
