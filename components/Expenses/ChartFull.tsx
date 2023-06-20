import { View, Dimensions, Text, useColorScheme } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FadeInView } from "../FadeInView";

export default function ChartFull() {
  const theme = useColorScheme();

  const isDarkTheme = theme === "dark";
  return (
    <View style={{ flex: 1 }}>
      <LineChart
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              data: [
                500, 200, 800, 400, 600, 600, 900, 500, 200, 800, 400, 600,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width - 50} // from react-native
        height={200}
        yAxisLabel="₦"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: isDarkTheme ? "#000000" : "#FFFFFF",
          backgroundGradientFrom: isDarkTheme ? "#000000" : "#FFFFFF",
          backgroundGradientTo: isDarkTheme ? "#000000" : "#FFFFFF",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) =>
            !isDarkTheme
              ? `rgba(0, 0, 0, ${opacity})`
              : `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) =>
            !isDarkTheme
              ? `rgba(0, 0, 0, ${opacity})`
              : `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
