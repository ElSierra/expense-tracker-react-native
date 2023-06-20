import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { Expenses } from "../../data/model";
import { getFormatDate } from "../../util/date";
import { TouchableRipple } from "react-native-paper";

import { useAppDispatch } from "../../redux/hooks/hooks";
import { openModalEdit } from "../../redux/slice/modalSlice";

export default function ListContainer({ expense }: { expense: Expenses }) {
  const dispatch = useAppDispatch();
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";
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

  // const openModalPressed = () => {
  //   dispatch(openModalEdit({ id: expense.id }));
  // };
  return (
    <View style={styles.touchable}>
      <TouchableRipple
        rippleColor={!isDarkTheme ?"#E3CBCB": "#000000"}
        style={{ backgroundColor: isDarkTheme ? "#161b22" : "white" }}
        onPress={() => {
          dispatch(openModalEdit({ id: expense.id }));
        }}
      >
        <View style={[styles.listContainer]}>
          <View style={styles.leftSide}>
            <View
              style={[
                styles.emojiContainer,
                { backgroundColor: isDarkTheme ? "#3F3F3F" : "white" },
              ]}
            >
              <Text style={styles.emojiTextStyle}>{renderEmoji()}</Text>
            </View>
            <View style={styles.costName}>
              <Text
                style={[
                  styles.textHead,
                  { color: isDarkTheme ? "white" : "black" },
                ]}
              >
                {expense.name}
              </Text>
              <Text style={styles.textFoot}>{getFormatDate(expense.date)}</Text>
            </View>
          </View>

          <View style={styles.rightSide}>
            <Text
              style={[
                styles.textHead,
                { textAlign: "right" },
                { color: isDarkTheme ? "white" : "black" },
              ]}
            >
              {formattedExpenseSum}
            </Text>
            <Text style={[styles.textFoot, { textAlign: "right" }]}></Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    padding: 20,

    alignItems: "center",

    justifyContent: "space-between",
  },
  emojiContainer: {
    padding: 10,
    borderRadius: 12,
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
    fontFamily: "JakaraExtraBold",
  },
  textFoot: {
    fontSize: 14,
    color: "#606060",
    fontFamily: "JakaraExtraBold",
  },
  rightSide: {},
  touchable: {
    borderRadius: 20,
    padding: 0,

    marginBottom: 10,

    overflow: "hidden",
  },
});
