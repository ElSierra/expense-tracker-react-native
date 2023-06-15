import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundSvg } from "../assets/Svg/background";
import {} from "react-native-svg";
import { FadeInView } from "../components/FadeInView";
import AnalyticsCard from "../components/AnalyticsCard";
import { BottomSheetContainer } from "../components/BottomSheet";
import ExpenseComponent from "../components/Expenses/ExpenseComponent";
import { EXPENSE_DATA } from "../data/data";

export default function Home() {
  return (
    <View style={styles.root}>
      <AnalyticsCard />
      <View style={styles.root}>
        <ExpenseComponent expenses={EXPENSE_DATA} periodName="Last 7 days" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop:40,
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
