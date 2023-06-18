import { StyleSheet, View, Text } from "react-native";
import { Expenses } from "../../data/model";
import { getFormatDate } from "../../util/date";
import { TouchableRipple } from "react-native-paper";

import { useAppDispatch } from "../../redux/hooks/hooks";
import { openModalEdit } from "../../redux/slice/modalSlice";

export default function ListContainer({ expense }: { expense: Expenses }) {
  const dispatch = useAppDispatch();

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
        rippleColor={"#E3CBCB"}
        onPress={() => {
          dispatch(openModalEdit({ id: expense.id }));
        }}
      >
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
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    padding: 20,

    alignItems: "center",
    borderRadius: 20,

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
    fontFamily: "JakaraExtraBold",
  },
  textFoot: {
    fontSize: 14,
    color: "#606060",
    fontFamily: "JakaraExtraBold",
  },
  rightSide: {},
  touchable: {
    borderRadius: 12,
    padding: 0,

    marginBottom: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },
});
