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
import { useAppSelector } from "./redux/hooks/hooks";
import { useColorScheme } from "react-native";

import {
  ExpenseProp,
  ProfileProp,
  RootStackParamList,
} from "./types/navigation";
import IconButton from "./components/UI/IconButton";
import BottomSheetScreen from "./screens/BottomSheetScreen";
import { StatusBar } from "expo-status-bar";
const Stack = createNativeStackNavigator<RootStackParamList>();
// const Tab = createBottomTabNavigator();

const Tab = createMaterialTopTabNavigator();
function BottomTabNavigator() {
  const theme = useColorScheme();
  console.log(
    "🚀 ~ file: AppComponent.tsx:40 ~ BottomTabNavigator ~ theme:",
    theme
  );
  const isDarkTheme = theme === "dark";
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      sceneContainerStyle={{
        backgroundColor: isDarkTheme ? "#000000" : "transparent",
        paddingHorizontal: 25,
      }}
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: "transparent",
        },

        tabBarAndroidRipple: { color: !isDarkTheme?"#DED2FF": "#212020", borderless: true },
        tabBarShowLabel: false,
        tabBarActiveTintColor: isDarkTheme ? "white" : "black",
        tabBarStyle: {
          height: 70,
          backgroundColor: isDarkTheme ? "#000000" : "#FFFFFF",
          borderTopWidth: isDarkTheme ? 1 : 0,
          borderTopColor: "#282828",
          shadowColor: "red",

          shadowRadius: 200,
          elevation: 18,
          borderTopLeftRadius: isDarkTheme? 0 :15,
          borderTopRightRadius: isDarkTheme? 0 :15,
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
  const modalState = useAppSelector((state) => state.modal);

  const { width, height } = Dimensions.get("window");
  const theme = useColorScheme();
  console.log(
    "🚀 ~ file: AppComponent.tsx:40 ~ BottomTabNavigator ~ theme:",
    theme
  );
  const isDarkTheme = theme === "dark";
  return (
    <>
      <StatusBar
        animated={true}
        style={isDarkTheme ? "light" : "dark"}
        backgroundColor="transparent"
      />
      <BottomSheetContainer>
        {/* {<BottomSheetScreen/>} */}

        <ImageBackground
          resizeMode="cover"
          style={{ flex: 1 }} //! style={{flex:1}}, incase of ui issues
          imageStyle={{ opacity: 0.1 }}
          source={require("./assets/images/bg.png")}
        >
          <Stack.Navigator
            screenOptions={{
              
              contentStyle: {
                backgroundColor: isDarkTheme ? "#000000" : "#FFFFFF00",
              },
            }}
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
                      style={{
                        width: 40,
                        borderRadius: 100,
                        overflow: "hidden",
                      }}
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
                  headerTintColor: isDarkTheme? "white": "black",
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
                    color: isDarkTheme? "white": "black"
                  },
                  headerTransparent: true,
                };
              }}
              component={Profile}
            />
          </Stack.Navigator>
        </ImageBackground>
      </BottomSheetContainer>
    </>
  );
}
