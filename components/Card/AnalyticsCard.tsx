import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { More } from "../icons";
import ChartTest from "../Expenses/Chart";
import { useState } from "react";
import MenuComponents from "../MenuComponents";
import { useWindowDimensions } from "react-native";
import Card from "./Card";

export default function AnalyticsCard() {
  const { height, width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View style={style.root}>
      <View style={style.backBox}></View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={width - 40} //your element width
        snapToAlignment={"center"}
      >
        <Card />
        <Card />
        <Card />
        <Card />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    height: 270,
    alignItems: "center",
  },
  backBox: {
    height: 200,
    width: "100%",
    position: "absolute",
    marginTop: 60,
    borderRadius: 20,
    transform: [{ rotateY: "8deg" }, { rotateZ: "6deg" }],
    backgroundColor: "#F6E6A6",
  },


});
