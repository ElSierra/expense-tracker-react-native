import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { View, Button, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";

export const DatePickerAndroid = ({
  date,
  onChange,
}: {
  date: Date;
  onChange: (event: any, selectedDate: any) => void;
}) => {
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}

      <TouchableRipple
        onPress={showDatepicker}
        style={{
          height: 40,
          width: "100%",
          backgroundColor: "#E4E2E2",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>
          {date.toLocaleString().split(",")[0]} {date === new Date() && "today"}
        </Text>
      </TouchableRipple>
    </View>
  );
};
