import Svg, { Defs, G, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
export const BackgroundSvg = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    opacity={0.1}
    viewBox="0 0 800 800"
    {...props}
  >
    <Defs></Defs>
    <G filter="url(#a)">
      <Circle cx={642.688} cy={632.851} r={150} fill="hsl(37, 99%, 67%)" />
      <Circle cx={502.194} cy={180.779} r={150} fill="hsl(316, 73%, 52%)" />
      <Circle cx={185.559} cy={391.962} r={150} fill="hsl(185, 100%, 57%)" />
    </G>
  </Svg>
)