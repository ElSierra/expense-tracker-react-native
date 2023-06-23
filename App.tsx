import * as React from "react";
import { DefaultTheme, PaperProvider, useTheme } from "react-native-paper";
import App from "./AppComponent";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback } from "react";
import { View, Text, Appearance, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();
export default function Main() {
  const [fontsLoaded] = useFonts({
    PantonExtraBold: require("./assets/fonts/Panton.ttf"),
    JakaraExtraBold: require("./assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    JakaraMedium: require("./assets/fonts/PlusJakartaSans-Medium.ttf"),
    JakaraSemiBold: require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <PaperProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </PaperProvider>
    </NavigationContainer>
  );
}
