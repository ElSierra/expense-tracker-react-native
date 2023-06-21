import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TextInput,
  useColorScheme,
  Button,
} from "react-native";

import HeaderTextClose from "../UI/HeaderTextClose";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import InputText from "./UI/InputText";

import { ScrollView } from "react-native-gesture-handler";
import ChipContainer from "./UI/Chip";
import { Dimensions } from "react-native";
import { useRef, useState } from "react";
import { categoryList } from "../../data/category";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DatePickerAndroid } from "./UI/DatePicker";

export default function AddComponent() {
  const width = Dimensions.get("screen").width;

  const expense = useAppSelector((state) => state.expense.expenses);

  const chipRef = useRef(null);

  const [content, setContent] = useState(() => {
    return {
      expName: "",
      category: "",
      amount: "",
    };
  });

  const theme = useColorScheme();
  const isDarkTheme = theme === "dark";
  const [date, setDate] = useState(() => new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <View style={styles.screen}>
      <HeaderTextClose header="Edit" />
      <View style={{ width: "100%", height: "100%", gap: 10 }}>
        <InputText
          value={content.expName || ""}
          onChange={() => {}}
          label="Expense Name"
        />
        <InputText
          icon={"₦"}
          value={content.amount.toString() || ""}
          onChange={() => {}}
          label="Amount"
        />

        <View style={{ height: 60, width: width, paddingLeft: 2, gap: 5 }}>
          <Text style={{ fontFamily: "JakaraExtraBold", color: "#656565" }}>
            Select a category
          </Text>
          <ScrollView
            horizontal={true}
            style={{ flex: 1 }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 6 }}
          >
            {categoryList.map((category) => (
              <ChipContainer
                key={category.type}
                color={isDarkTheme ? "#FFFFFF" : category.color}
                text={category.type}
              />
            ))}
          </ScrollView>
        </View>
        <View>
          <Text style={{ fontFamily: "JakaraExtraBold", color: "#656565" }}>
            Date
          </Text>
          <DatePickerAndroid date={date} onChange={onChange} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 2,
  },
});
