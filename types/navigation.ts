import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  ExpenseApp: undefined;
  Profile: undefined;
  BottomSheet: undefined;
};

export type ExpenseProp = NativeStackScreenProps<
  RootStackParamList,
  "ExpenseApp"
>;
export type ProfileProp = NativeStackScreenProps<RootStackParamList, "Profile">;
export type BottomSheetProp = NativeStackScreenProps<RootStackParamList, "BottomSheet">;
