import { View, Text, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import { CloseCircleIcon } from "../icons";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { closeModal } from "../../redux/slice/modalSlice";

export default function HeaderTextClose({ header }: { header: string }) {

const dispatch = useAppDispatch()
  return (
    <View style={styles.headerContainer}>
      <View style={styles.closeContainer}>
        <View style={{ height: 30, width: 30 }}>
          <IconButton
            pressColor="red"
            tintColor="red"
            onPress={() => {dispatch(closeModal())}}
            size={30}
          >
            <CloseCircleIcon color={"#580000"} size={30} />
          </IconButton>
        </View>
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
      <View style={styles.headerTextContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",

    alignItems: "center",
  },
  headerText: {
    fontFamily: "JakaraExtraBold",
    fontSize: 20,
    includeFontPadding: false,
  },
  closeContainer: {
    width: "33.3%",
    alignItems: "flex-start",
  },
  headerTextContainer: {
    width: "33.3%",
    alignItems: "center",
    justifyContent: "center",
  },
});
