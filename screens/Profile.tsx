import { View, Text } from "react-native";
import TestApp from "../components/BottomSheetContainer/UI/AnimatedFlatlist";
import { Button } from "react-native-paper";
import auth from "@react-native-firebase/auth";

export default function Profile() {
  const signout = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };
  return (
    <View style={{ marginTop: 100 }}>
      <Text>Profile</Text>
      <Button onPress={signout}>Logout</Button>
    </View>
  );
}
