import React, { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Pressable, BackHandler } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import CustomBackground from "./CustomBg";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { closeModal } from "../redux/slice/modalSlice";
import IconButton from "./UI/IconButton";
import { AddIcon, CloseCircleIcon } from "./icons";
import EditComponent from "./BottomSheetContainer/EditComponent";

export const BottomSheetContainer = ({ children }: { children: ReactNode }) => {
  const ModalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  // ref
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "75%", "98%"], []);

  if (ModalState.id && ModalState.isOpen) {
    sheetRef.current?.snapToIndex(1);
  } else if (!ModalState.id && ModalState.isOpen) {
    sheetRef.current?.snapToIndex(2);
  }

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      dispatch(closeModal());
    }
  }, []);

  if (ModalState.isOpen === false) {
    sheetRef.current?.close();
  }

  const isEditing = !!ModalState.id;
  const handleClosePress = () => {
    dispatch(closeModal());
  };
  const renderBackdrop = useCallback(
    (props: any) => (
      <>
        <BottomSheetBackdrop
          {...props}
          opacity={0.3}
          pressBehavior={"close"}
          disappearsOnIndex={-1}
          appearsOnIndex={2}
        />
      </>
    ),
    []
  );
  useEffect(() => {
    const backAction = () => {
     sheetRef.current?.close()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
    }, []);
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
          <View style={styles.contentScreen}>
            <Pressable
              style={({ pressed }) => [
                styles.handleContainer,
                {
                  backgroundColor: !pressed ? "#062C032B" : "black",
                },
              ]}
            >
              <View />
            </Pressable>

            <View
              style={{
                height: "100%",
                width: "100%",
                paddingHorizontal: 20,
                paddingTop: 5,
              }}
            >
              <View style={styles.contentContainer}>
                {isEditing ? <EditComponent /> : null}
              </View>
            </View>
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
  contentScreen: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 25,
    alignItems: "center",
  },
  handleContainer: {
    width: "12%",
    borderRadius: 20,
    backgroundColor: "#062C032B",
    height: 6,
    marginTop: 10,
  },

  contentContainer: {
    width: "100%",
    height: "100%",
  },
});
