import { useTheme } from "react-native-paper";

import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

export default function InputText({
  label,
  value,
  onChange,
  icon,
  placeholder,
}: {
  label:string,
  value: string;
  icon?: JSX.Element | string;
  onChange: () => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ width: "100%", height: 70, gap: 4 }}>
      <Text style={styles.labelText}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#E4E2E2",
          gap: 8,
          flex: 1,
          paddingHorizontal: focused ? 9 : 10,
          borderRadius: 10,
          borderWidth: focused ? 1 : 0,
        }}
      >
        {icon && (
          <View
            style={{
              height: "100%",
              width: 30,
              alignItems: "center",
              paddingVertical: 10,
              gap: 8,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "JakaraExtraBold",
                includeFontPadding: false,
              }}
            >
              {icon}
            </Text>
            <View
              style={{ width: 2, backgroundColor: "#777474", height: "100%" }}
            />
          </View>
        )}
        <TextInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            height: "100%",
            includeFontPadding: false,
            fontSize: 18,
            fontFamily: "JakaraExtraBold",
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelText: {
    fontFamily: "JakaraExtraBold",
    color: "#656565",
  },
});
