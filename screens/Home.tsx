import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundSvg } from "../assets/Svg/background";
import {} from "react-native-svg";
import { FadeInView } from "../components/FadeInView";
import AnalyticsCard from "../components/Card/AnalyticsCard";
import { BottomSheetContainer } from "../components/BottomSheet";
import ExpenseComponent from "../components/Expenses/ExpenseComponent";
import { EXPENSE_DATA } from "../data/data";
import { useAppSelector } from "../redux/hooks/hooks";
import { getLessThanDate } from "../util/date";

export default function Home() {
  const expenseList = useAppSelector((state) => state.expense.expenses);
  const recentExpenses = expenseList.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getLessThanDate(today, 7);
    return expense.date > date7DaysAgo;
  });
  return (
    <View style={styles.root}>
      <View>
        <AnalyticsCard />
      </View>
      <View style={styles.root}>
        <ExpenseComponent expenses={recentExpenses} periodName="Last 7 days" />
      </View>
    </View>
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
