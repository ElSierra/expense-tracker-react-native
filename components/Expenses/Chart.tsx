import { View, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Chart({
  height,
  width,
  withHorizontalLabels,
}: {
  height: number;
  width: number;
  withHorizontalLabels: boolean;
}) {
  return (
    <View>
      <LineChart
        data={{
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              data: [500, 200, 800, 400, 600, 600, 900],
            },
          ],
        }}
        width={width} // from react-native
        height={height}
        yAxisInterval={1}
        withHorizontalLabels={withHorizontalLabels}
        yAxisLabel="₦"
        yAxisSuffix="k"
        // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#020202",
          backgroundGradientFrom: "#1a1b1c",
          backgroundGradientTo: "#1a1b1c",

          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
          paddingLeft: 40,
          borderRadius: 16,
          paddingRight: 40,
        }}
      />
    </View>
  );
}
