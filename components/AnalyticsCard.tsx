import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { More } from "./icons";
import ChartTest from "./Expenses/Chart";
import { useState } from "react";
import MenuComponents from "./MenuComponents";

export default function AnalyticsCard() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View style={style.root}>
      <View style={style.backBox}></View>

      <ImageBackground
        resizeMode="cover"
        imageStyle={{ opacity: 1 }}
        style={style.frontBox}
        source={require("../assets/images/box-cut.png")}
      >
        <View style={style.cardContent}>
          <Text style={style.headerLeft}>Total Spent</Text>
          <View style={style.headerRight}>
            <MenuComponents
              visible={visible}
              openMenu={openMenu}
              closeMenu={closeMenu}
            />
          </View>
        </View>
        <Text style={style.money}>₦50,000</Text>
        <View style={style.chartContainer}>
          <ChartTest height={100} width={350} withHorizontalLabels={false} />
        </View>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    height: 300,
    alignItems: "center",
  },
  chartContainer: {
    width: "100%",
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  backBox: {
    height: 220,
    width: "100%",
    position: "absolute",
    marginTop: 60,
    borderRadius: 20,
    transform: [{ rotateY: "8deg" }, { rotateZ: "6deg" }],
    backgroundColor: "#fbeaa6",
  },
  frontBox: {
    height: 230,

    aspectRatio: 6442 / 3771,
    padding: 35,
    marginTop: 50,
  },
  cardContent: {
    height: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    fontSize: 15,
    color: "white",
   
  },
  money: {
    fontSize: 40,
    color: "white",
    fontFamily: "PantonExtraBold"
   
  },
  headerRight: {},
});
