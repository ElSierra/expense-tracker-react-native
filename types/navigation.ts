import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  ExpenseApp: undefined;
  Profile: undefined;
  BottomSheet: undefined;
};

export type RootStackAuthParamList = {
Login : undefined,
Signup : undefined,
}

export type ExpenseProp = NativeStackScreenProps<
  RootStackParamList,
  "ExpenseApp"
>;
export type ProfileProp = NativeStackScreenProps<RootStackParamList, "Profile">;
export type LoginProp = NativeStackScreenProps<RootStackAuthParamList, "Login">;
export type SignUpProp = NativeStackScreenProps<RootStackAuthParamList, "Signup">;
export type BottomSheetProp = NativeStackScreenProps<RootStackParamList, "BottomSheet">;
