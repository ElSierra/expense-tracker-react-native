import { StyleSheet, View, Text } from "react-native";
import { Expenses } from "../../data/model";
import { getFormatDate } from "../../util/date";

export default function ListContainer({ expense }: { expense: Expenses }) {
  function renderEmoji() {
    if (expense.category === "Food") {
      return "🍝";
    } else if (expense.category === "Internet") {
      return "🌐";
    } else if (expense.category === "Movie") {
      return "🍿";
    } else {
      return "📦";
    }
  }

  const formattedExpenseSum = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(expense.amount);
  return (
    <View style={styles.listContainer}>
      <View style={styles.leftSide}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emojiTextStyle}>{renderEmoji()}</Text>
        </View>
        <View style={styles.costName}>
          <Text style={styles.textHead}>{expense.name}</Text>
          <Text style={styles.textFoot}>{getFormatDate(expense.date)}</Text>
        </View>
      </View>

      <View style={styles.rightSide}>
        <Text style={[styles.textHead, { textAlign: "right" }]}>
          {formattedExpenseSum}
        </Text>
        <Text style={[styles.textFoot, { textAlign: "right" }]}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  emojiContainer: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#f8f9fb",
  },
  emojiTextStyle: {
    fontSize: 20,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  costName: {
    marginLeft: 10,
  },
  textHead: {
    fontSize: 16,
    fontFamily: "JakaraExtraBold"
  },
  textFoot: {
    fontSize: 14,
    color: "#606060",
    fontFamily: "JakaraExtraBold"
  },
  rightSide: {},
});
