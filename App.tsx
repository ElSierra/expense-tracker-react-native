import * as React from "react";
import { PaperProvider } from "react-native-paper";
import App from "./AppComponent";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback } from "react";
import { View, Text } from "react-native";

SplashScreen.preventAutoHideAsync();
export default function Main() {
  const [fontsLoaded] = useFonts({
    PantonExtraBold: require("./assets/fonts/Panton.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View>
        <Text style={{ color: "red", fontSize: 300 }}>No fonts loaded</Text>
      </View>
    );
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <PaperProvider>
        <StatusBar animated={true} style="dark" backgroundColor="transparent" />
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
}
