import { useState } from "react";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";
import { CloseCircleIcon } from "../../icons";

export default function ChipContainer({
  color,
  text,
}: {
  color: string;
  text: string;
}) {
  const [pressed, setPressed] = useState(false);

  const handlePressed = () => {
    setPressed(!pressed);
  };
  const handleClose = () => {
    setPressed(false);
  };
  return (
    <Chip
      icon={() => null}
      selectedColor={color}
      closeIcon={({ size, color }) => (
        <CloseCircleIcon size={size} color={color} />
      )}
      mode={pressed ? "outlined" : "flat"}
      textStyle={{
        color,
        fontSize: 15,
        textAlign: "center",
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: pressed ? 0 : 7,
      }}
      style={{
        backgroundColor: `${color}23`,
        borderColor: color,
        padding: 0,
        margin: 0,
        height: 25,
      }}
      onClose={!pressed ? undefined : handleClose}
      onPress={handlePressed}
    >
      {text}
    </Chip>
  );
}
