import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  BackHandler,
  useColorScheme,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import CustomBackground from "./CustomBg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { closeModal } from "../../redux/slice/modalSlice";
import IconButton from "../UI/IconButton";
import { AddIcon, CloseCircleIcon } from "../icons";
import EditComponent from "../BottomSheetContainer/EditComponent";
import EditButtons from "../UI/EditButtons";
import AddButtons from "../UI/AddButtons";
import AddComponent from "../BottomSheetContainer/AddComponent";
import { FadeInView } from "../FadeInView";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { set } from "date-fns";
import { AnimatedButton } from "../BottomSheetContainer/UI/AnimateButton";

export const BottomSheetContainer = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const ModalState = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["60%", "90%"], []);
  const [isAlmostClosed, setIsAlmostClosed] = React.useState(false);

  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";

  if (ModalState.id && ModalState.isOpen) {
    sheetRef.current?.snapToIndex(1);
  } else if (!ModalState.id && ModalState.isOpen) {
    sheetRef.current?.snapToIndex(1);
  }
  useEffect(() => {
    if (ModalState.id && ModalState.isOpen) {
      setIsAlmostClosed(false);
    } else if (!ModalState.id && ModalState.isOpen) {
      setIsAlmostClosed(false);
    }
  }, [ModalState.id, ModalState.isOpen]);
  const handleSheetChanges = useCallback((index: number) => {
    console.log(
      "🚀 ~ file: BottomSheet.tsx:42 ~ handleSheetChanges ~ index:",
      index
    );

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
          onPress={() => {
            setIsAlmostClosed(true);
            console.log("pressed");
          }}
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

  const Footer = (props: any) => {
    console.log("isEdit", isEditing);

    return (
      <FadeInView style={styles.footerContainer}>
        {ModalState.id ? (
          <EditButtons />
        ) : !ModalState.id || ModalState.isOpen ? (
          <AddButtons />
        ) : null}
      </FadeInView>
    );
  };

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          {children}

          {/* {ModalState.isOpen && !isAlmostClosed ? <Footer /> : null} */}
          <AnimatedButton
            isVisible={
              (ModalState.isOpen || !isAlmostClosed) && ModalState.id !== null
            }
          >
            <EditButtons />
          </AnimatedButton>

          {/* {ModalState.isOpen && !isAlmostClosed ? <Footer /> : null} */}
          <AnimatedButton
            isVisible={ModalState.isOpen && ModalState.id === null}
          >
            <AddButtons />
          </AnimatedButton>

          <BottomSheet
            ref={sheetRef}
            animateOnMount={true}
            handleIndicatorStyle={{ display: "none" }}
            index={-1}
            enablePanDownToClose
            snapPoints={snapPoints}
            backgroundComponent={CustomBackground}
            backdropComponent={renderBackdrop}
            onChange={handleSheetChanges}
          >
            <View
              style={[
                styles.contentScreen,
                { backgroundColor: isDarkTheme ? "#161b22" : "white" },
              ]}
            >
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
