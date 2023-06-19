import {
  View,
  Text,
  LayoutChangeEvent,
  ImageBackground,
  Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import AddNewExpenseButton from "./components/UI/AddNewExpenseButton";
import { BackIcon, CalendarIcon, HomeIcon } from "./components/icons";
import { BottomSheetContainer } from "./components/BottomSheet/BottomSheet";
import { useCallback, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useAppDispatch } from "./redux/hooks/hooks";
import { openModalAdd } from "./redux/slice/modalSlice";
import { Avatar, TouchableRipple } from "react-native-paper";
import { FadeInView } from "./components/FadeInView";
import Profile from "./screens/Profile";
import {
  ExpenseProp,
  ProfileProp,
  RootStackParamList,
} from "./types/navigation";
import IconButton from "./components/UI/IconButton";
const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator();

const Tab = createMaterialTopTabNavigator();
function BottomTabNavigator() {
  return (
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
        tabBarAndroidRipple: { color: "#FFDDDD", borderless: true },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          height: 70,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,

          shadowColor: "red",

          shadowRadius: 200,
          elevation: 18,
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
  );
}

export default function App() {
  const dispatch = useAppDispatch();
  const { width, height } = Dimensions.get("window");
  return (
    <BottomSheetContainer>
      <ImageBackground
        resizeMode="cover"
        style={{ flex:1 }} //! style={{flex:1}}, incase of ui issues
        imageStyle={{ opacity: 0.1 }}
        source={require("./assets/images/bg.png")}
      >
        <Stack.Navigator
          screenOptions={{ contentStyle: { backgroundColor: "#00000000" } }}
        >
          <Stack.Screen
            name="ExpenseApp"
            component={BottomTabNavigator}
            options={({ navigation }: ExpenseProp) => {
              return {
                headerShown: true,
                headerTitle: "",

                headerLeft: ({}) => (
                  <FadeInView
                    style={{ width: 40, borderRadius: 100, overflow: "hidden" }}
                  >
                    <TouchableRipple
                      style={{ borderRadius: 100 }}
                      onPress={() => {
                        navigation.navigate("Profile");
                      }}
                    >
                      <Avatar.Image
                        size={40}
                        source={require("./assets/images/placeholder.png")}
                      />
                    </TouchableRipple>
                  </FadeInView>
                ),
                headerRight: ({ tintColor }) => (
                  <FadeInView style={{ width: 50 }}>
                    <AddNewExpenseButton
                      pressColor={tintColor}
                      tintColor={tintColor}
                      onPress={() => {
                        dispatch(openModalAdd());
                      }}
                    />
                  </FadeInView>
                ),
                headerShadowVisible: false,
                headerTransparent: true,
              };
            }}
          />
          <Stack.Screen
            name="Profile"
            options={({ navigation }: ProfileProp) => {
              return {
                animation: "slide_from_left",
                headerShadowVisible: false,
                headerTitleAlign: "center",
                headerBackVisible: false,
                headerLeft: ({ tintColor, canGoBack }) => (
                  <IconButton
                    size={40}
                    radius={10}
                    onPress={() => {
                      console.log("pressed");
                      navigation.goBack();
                    }}
                  >
                    <BackIcon size={40} color={tintColor || "green"} />
                  </IconButton>
                ),
                headerTitleStyle: {
                  fontFamily: "JakaraExtraBold",
                  fontSize: 20,
                },
                headerTransparent: true,
              };
            }}
            component={Profile}
          />
        </Stack.Navigator>
      </ImageBackground>
    </BottomSheetContainer>
  );
}
