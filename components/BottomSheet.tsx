import React, { ReactNode, useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import CustomBackground from "./CustomBg";

export const BottomSheetContainer = ({
  children,
  sheetRef,
}: {
  children: ReactNode;
  sheetRef: any;
}) => {
  // ref

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "80%", "96%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <>
        <BottomSheetBackdrop
          {...props}
          opacity={0.8}
          pressBehavior={"close"}
          disappearsOnIndex={-1}
          appearsOnIndex={2}
        />
      </>
    ),
    []
  );

  const renderBackground = useCallback(
    (props: any) => (
      <>
        <BottomSheetBackdrop
          {...props}
          opacity={1}
          pressBehavior={"close"}
          disappearsOnIndex={-1}
          appearsOnIndex={2}
        />
      </>
    ),
    []
  );
  // renders
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {children}

        <BottomSheet
          ref={sheetRef}
          handleIndicatorStyle={{ display: "none" }}
          index={-1}
          enablePanDownToClose
          snapPoints={snapPoints}
          backgroundComponent={CustomBackground}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <View style={styles.handleContainer}></View>
            <Button onPress={handleClosePress}>Send</Button>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,

    backgroundColor: "white",
    borderRadius: 25,
    alignItems: "center",
  },
  handleContainer: {
    width: "12%",
    borderRadius: 20,
    backgroundColor: "#00000084",
    height: 6,
    marginTop: 10,
  },
});
