import { TextInput } from "react-native-paper";

import { View, Text } from "react-native";
import React from "react";

export default function InputText() {
  return (
    <View>
      <Text>TextInput</Text>
      <TextInput
        mode="outlined"
        style={{ width: "100%", height: 40, backgroundColor: "#DEFFB71D" }}
        underlineStyle={{
          borderRadius: 60,
          borderWidth: 1,
          borderColor: "#CEC5C5",
        }}
        outlineStyle={{ borderRadius: 10, borderWidth: 1.5 }}
        activeOutlineColor="#450559"
        outlineColor="#AEAAAA"
      />
    </View>
  );
}
