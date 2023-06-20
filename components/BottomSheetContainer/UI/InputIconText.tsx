import { TextInput } from "react-native-paper";

import { View, Text } from "react-native";
import React, { ReactNode } from "react";

export default function InputIconText({ icon }: { icon: ReactNode }) {
  return (
    <View style={{ flex: 1 }}>
      <Text>TextInput</Text>
      <TextInput
        left={
          <TextInput.Icon
            onPress={() => {}}
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              marginTop: 13,
              alignItems: "center",
            }}
            icon={({ color, size }) => (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color,
                    fontSize: size,
                    textAlign: "center",
                    fontFamily: "RobotoMedium",
                  }}
                >
                  ₦
                </Text>
              </View>
            )}
          />
        }
        mode="outlined"
        style={{
          width: "100%",
          height: 40,
          backgroundColor: "#DEFFB71D",
          justifyContent: "center",
        }}
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
