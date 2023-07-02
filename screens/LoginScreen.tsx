import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComponent from "../components/Auth/Input";
import ProfileLottie from "../components/UI/Profile";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GoogleICon } from "../components/icons";
import validator from "validator";
import {
  createAccountWithEmail,
  loginWithEmail,
} from "../firebase/auth/withEmail";
import Toast from "react-native-toast-message";
import { LoginProp } from "../types/navigation";
export default function LoginScreen({ navigation }: LoginProp) {
  const [input, setInput] = useState({
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });
  const [loading, setIsloading] = useState(false);

  const validateEmail = (text: string) => {
    console.log(text);

    if (!validator.isEmail(text)) {
      console.log("Email is Not Correct");
      setInput((prev) => {
        return { ...prev, email: { value: text, isValid: false } };
      });
      return false;
    } else {
      setInput((prev) => {
        return { ...prev, email: { value: text, isValid: true } };
      });

      console.log("Email is Correct");
    }
  };

  const handlePassword = (text: string) => {
    console.log(text);

    setInput((prev) => {
      return { ...prev, password: { value: text, isValid: true } };
    });
  };

  const submitHandler = async () => {
    setIsloading(true);
    loginWithEmail(input.email.value, input.password.value)
      .then((response) => {
        console.log(
          "🚀 ~ file: LoginScreen.tsx:58 ~ .then ~ response:",
          response
        );
      })
      .catch((e: any) => {
        console.log(typeof e);
        console.log(
          "🚀 ~ file: LoginScreen.tsx:62 ~ submitHandler ~ e:",
          e.code
        );
        if (e.code === "auth/too-many-requests") {
          Toast.show({
            type: "loginToast",
            text1: "Too many login attempts, wait a while",
          });
        } else if (e.code === "auth/wrong-password") {
          Toast.show({
            type: "loginToast",
            text1: "Email doesn't exist or password is not valid",
          });
        }
        setIsloading(false);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 200, width: 200 }}>
          <ProfileLottie />
        </View>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={{ gap: 10 }}>
            <Text style={{ fontFamily: "JakaraSemiBold" }}>
              Login in to continue
            </Text>
            <InputComponent
              placeholder="Email"
              styles={{
                borderColor: input.email.isValid ? "#E4E3E3" : "red",
                borderWidth: 1.5,
              }}
              options={{
                autoCapitalize: "none",
                autoCorrect: false,
                value: input.email.value,
                onChangeText: (text) => {
                  validateEmail(text);
                },
              }}
            />
            <InputComponent
              placeholder="Password"
              options={{
                value: input.password.value,
                onChangeText: (text) => {
                  handlePassword(text);
                },
              }}
              styles={{
                borderColor: input.password.isValid ? "#E4E3E3" : "red",
                borderWidth: 1.5,
              }}
            />
            <Text
              style={{
                fontFamily: "JakaraSemiBold",
                textDecorationLine: "underline",
                textAlign: "right",
              }}
            >
              Forgot Password?
            </Text>
            <Button
              mode="contained"
              loading={loading}
              disabled={
                input.email.value.length < 1 ||
                input.password.value.length < 1 ||
                !input.password.isValid ||
                !input.email.isValid
              }
              onPress={submitHandler}
              labelStyle={{ fontFamily: "JakaraSemiBold" }}
              style={{ height: 50, borderRadius: 10 }}
              contentStyle={{ height: 50 }}
            >
              Login
            </Button>
            <Button
              mode="outlined"
              labelStyle={{ fontFamily: "JakaraSemiBold" }}
              style={{ height: 50, borderRadius: 10, borderColor: "#AA00FF" }}
              contentStyle={{ height: 50 }}
              onPress={() => {
                navigation.replace("Signup");
              }}
            >
              Don't have an account ? Register
            </Button>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text style={{ fontFamily: "JakaraSemiBold", fontSize: 15 }}>
              Or
            </Text>
          </View>
          <Button
            mode="contained"
            labelStyle={{
              fontFamily: "JakaraSemiBold",
              includeFontPadding: false,
            }}
            textColor="black"
            onPress={() => {
              console.log("pressed");
            }}
            icon={({ size, color }) => (
              <GoogleICon size={size + 5} color={color} />
            )}
            style={{
              height: 50,
              borderRadius: 10,
              backgroundColor: "#FDF5FF",
              borderWidth: 0.5,

              borderColor: "#F7D9FF",
            }}
            contentStyle={{
              height: 50,
              justifyContent: "space-between",
              paddingRight: 100,
            }}
          >
            Login with Google
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 12,

    alignItems: "center",
  },
});
