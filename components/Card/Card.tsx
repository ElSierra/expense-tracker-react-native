import { ImageBackground, View, Text, StyleSheet } from "react-native";
import Chart from "../Expenses/Chart";
import { Dimensions } from "react-native";

export default function Card() {
  const width = Dimensions.get("window").width;
  return (
    <ImageBackground
      resizeMode="cover"
      imageStyle={{ opacity: 1 }}
      style={style.frontBox}
      source={require("../../assets/images/box-cut.png")}
    >
      <View style={style.cardContent}>
        <Text style={style.headerLeft}>Total Spent For the month of June</Text>
        <View style={style.headerRight}></View>
      </View>
      <Text style={style.money}>₦50,000</Text>
      <View style={style.chartContainer}>
        <Chart height={100} width={width - 80} withHorizontalLabels={false} />
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  root: {
    height: 300,
    alignItems: "center",
  },
  chartContainer: {
    width: "100%",
    marginTop: 15,
    height: 100,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
 
  frontBox: {
    height: 210,

    aspectRatio: 6442 / 3771,
    padding: 20,
    marginTop: 50,
  },
  cardContent: {
    height: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    fontSize: 15,

    color: "white",
    fontFamily: "RobotoMedium",
  },
  money: {
    fontSize: 40,
    color: "white",
    paddingHorizontal: 20,
    fontFamily: "RobotoBold",
  },
  headerRight: {},
});
