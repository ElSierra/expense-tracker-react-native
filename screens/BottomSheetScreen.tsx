import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, BackHandler, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetProp } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { closeModal } from "../redux/slice/modalSlice";
import CustomBackground from "../components/BottomSheet/CustomBg";
import EditButtons from "../components/UI/EditButtons";
import AddButtons from "../components/BottomSheetContainer/UI/AddButtons";
import EditComponent from "../components/BottomSheetContainer/EditComponent";
import AddComponent from "../components/BottomSheetContainer/AddComponent";

const BottomSheetScreen = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const ModalState = useAppSelector((state) => state.modal);
  const snapPoints = useMemo(() => ["50%", "75%", "95%"], []);
  const dispatch = useAppDispatch();

  if (ModalState.id && ModalState.isOpen) {
    bottomSheetRef.current?.snapToIndex(1);
  } else if (!ModalState.id && ModalState.isOpen) {
    bottomSheetRef.current?.snapToIndex(2);
  }
  // variables

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      dispatch(closeModal());
    }
  }, []);

  if (ModalState.isOpen === false) {
    bottomSheetRef.current?.close();
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
  // renders

  useEffect(() => {
    const backAction = () => {
      bottomSheetRef.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const renderFooter = (props: any) => {
    console.log("isEdit", isEditing);

    return (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View style={styles.footerContainer}>
          {ModalState.id ? (
            <EditButtons />
          ) : !ModalState.id && ModalState.isOpen ? (
            <AddButtons />
          ) : null}
        </View>
      </BottomSheetFooter>
    );
  };

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: ModalState.isOpen ? 999 : 0,
        width: "100%",
        height: "100%",
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <BottomSheet
            ref={bottomSheetRef}
            footerComponent={renderFooter}
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
                  {ModalState.id ? (
                    <EditComponent />
                  ) : !ModalState.id && ModalState.isOpen ? (
                    <AddComponent />
                  ) : null}
                </View>
              </View>
            </View>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentScreen: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  handleContainer: {
    width: "22%",
    borderRadius: 20,
    backgroundColor: "#062C032B",
    height: 5,
    marginTop: 10,
  },

  contentContainer: {
    width: "100%",
    height: "100%",
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
});

export default BottomSheetScreen;
