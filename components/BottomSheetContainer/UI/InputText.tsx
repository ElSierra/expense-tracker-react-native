import { TextInput } from "react-native-paper";

import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function InputText() {
  return (
    <View>
      <Text style={styles.labelText}>TextInput</Text>
      <TextInput
        mode="outlined"
        style={{ width: "100%", height: 40, backgroundColor: "#DEFFB71D" }}
        underlineStyle={{
          borderRadius: 60,
          borderWidth: 1,
          borderColor: "#CEC5C5",
        }}
        outlineStyle={{ borderRadius: 10, borderWidth: 1 }}
        activeOutlineColor="#450559"
        outlineColor="#AEAAAA"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'JakaraExtraBold',
    color: "#656565"
  },
});
