import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, StyleSheet, BackHandler, useColorScheme } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import CustomBackground from "./CustomBg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { closeModal } from "../../redux/slice/modalSlice";

import EditComponent from "../BottomSheetContainer/EditComponent";

import AddComponent from "../BottomSheetContainer/AddComponent";
import Toast from "react-native-toast-message";
import { AnimatedViewBottomSheet } from "../BottomSheetContainer/UI/AnimatedView";

export const BottomSheetContainer = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const ModalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20%", "30%", "40%", "90%"], []);

  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const [isOpen, setIsOpen] = useState(false)

  if (ModalState.id && ModalState.isOpen) {
    sheetRef.current?.snapToIndex(3);
  } else if (!ModalState.id && ModalState.isOpen) {
    sheetRef.current?.snapToIndex(3);
  }

  const handleSheetChanges = useCallback((index: number) => {
    console.log(
      "🚀 ~ file: BottomSheet.tsx:42 ~ handleSheetChanges ~ index:",
      index
    );

    if (index === -1) {
      dispatch(closeModal());
      setIsOpen(false)
    }

    if (index>0){
      setIsOpen(true)
    }
  }, []);

  if (ModalState.isOpen === false) {
    sheetRef.current?.close();
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <>
        <BottomSheetBackdrop
          {...props}
          opacity={0.3}
          pressBehavior={"close"}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      </>
    ),
    []
  );
  useEffect(() => {
    const backAction = () => {
      sheetRef.current?.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          {children}

          {/* {ModalState.isOpen && !isAlmostClosed ? <Footer /> : null} */}

          <BottomSheet
            ref={sheetRef}
            animationConfigs={{ duration: 400,}}
            handleIndicatorStyle={{ display: "none" }}
            index={-1}
            android_keyboardInputMode="adjustResize"
            keyboardBehavior="fillParent"
            enablePanDownToClose
            snapPoints={snapPoints}
            backgroundComponent={CustomBackground}
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}
          >
            <BottomSheetView
              style={[
                styles.contentScreen,
                { backgroundColor: isDarkTheme ? "#161b22" : "white" },
              ]}
            >
              {/* <Pressable
                style={({ pressed }) => [
                  styles.handleContainer,
                  {
                    backgroundColor: !pressed ? "#062C032B" : "black",
                  },
                ]}
              >
                <View />
              </Pressable> */}

              <View
                style={{
                  height: "100%",
                  width: "100%",
                  paddingHorizontal: 20,
                  paddingTop: 15,
                }}
              >
                <AnimatedViewBottomSheet isVisible={isOpen}>
                  {ModalState.id ? (
                    <EditComponent />
                  ) : !ModalState.id && ModalState.isOpen ? (
                    <AddComponent />
                  ) : null}
                </AnimatedViewBottomSheet>
              </View>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentScreen: {
    flex: 1,
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
    width: "100%",
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
});
