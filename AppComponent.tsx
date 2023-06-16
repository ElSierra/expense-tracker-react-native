import { View, Text, LayoutChangeEvent, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import AddNewExpenseButton from "./components/AddNewExpenseButton";
import { CalendarIcon, HomeIcon } from "./components/icons";
import { BottomSheetContainer } from "./components/BottomSheet";
import { useCallback, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const Tab = createMaterialTopTabNavigator();
function BottomTabNavigator() {
  return (
    <ImageBackground
      resizeMode="cover"
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.1 }}
      source={require("./assets/images/bg.png")}
    >
      <Tab.Navigator
        tabBarPosition="bottom"
        sceneContainerStyle={{
          backgroundColor: "transparent",
          paddingHorizontal: 25,
        }}
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: "transparent",
          },
          tabBarAndroidRipple: { color: "#FFDDDD",borderless: true,},
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarStyle: {
            height: 70,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,

            elevation: 2,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          // headerTitleStyle: {
          //   paddingHorizontal: 10,

          //   fontSize: 30,
          // },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => <HomeIcon size={30} color={color} />,
            // headerTitle: "Home",
            // headerTransparent: true,
            // headerPressColor: "#7B5D5D",
            // headerTintColor: "#000000",
          }}
        />

        <Tab.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            // headerTitle: "Spending",
            // headerTransparent: true,

            tabBarIcon: ({ color }) => <CalendarIcon size={30} color={color} />,
          }}
        />
      </Tab.Navigator>
    </ImageBackground>
  );
}

export default function App() {
  const sheetRef = useRef<BottomSheet>(null);
  const handleSnapPress = useCallback((index: any) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  return (
    <BottomSheetContainer sheetRef={sheetRef}>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "#00000000" } }}
      >
        <Stack.Screen
          name="ExpenseApp"
          component={BottomTabNavigator}
          options={{
            headerShown: true,
            headerTitle: "",
            headerRight: ({ tintColor }) => (
              <AddNewExpenseButton
                pressColor={tintColor}
                tintColor={tintColor}
                onPress={() => {
                  handleSnapPress(2);
                }}
              />
            ),
            headerShadowVisible: false,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </BottomSheetContainer>
  );
}
