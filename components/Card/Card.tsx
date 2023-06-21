import { ImageBackground, View, Text, StyleSheet } from "react-native";
import Chart from "../Expenses/Chart";
import { Dimensions } from "react-native";

export default function Card() {
  const width = Dimensions.get("window").width;
  return (
    <View style={{width, alignItems: "center"}}>
    <ImageBackground
      resizeMode="cover"
      imageStyle={{ opacity: 1 }}
      style={style.frontBox}
      source={require("../../assets/images/box-cut.png")}
    >
      <Text style={style.header}>Total Spent (This week)</Text>

      <Text style={style.money}>₦50,000</Text>
      <View style={[style.chartContainer, { width: width * 0.75 }]}>
        <Chart height={100} width={width * 0.7} withHorizontalLabels={false} />
      </View>
    </ImageBackground></View>
  );
}

const style = StyleSheet.create({
  root: {
    height: 300,
    alignItems: "center",
  },
  chartContainer: {
    marginTop: 10,
    height: 100,
    overflow: "hidden",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  frontBox: {
    height: 210,
    overflow: "hidden",
   aspectRatio: 6442 / 3771,
    padding: 20,
    marginTop: 50,
  },
  cardContent: {
    height: 16,
    width: "100%",
    backgroundColor: "red",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontFamily: "RobotoMedium",
  },
  money: {
    fontSize: 40,
    color: "white",
    textAlign: "center",
    fontFamily: "RobotoBold",
  },
  headerRight: {},
});
