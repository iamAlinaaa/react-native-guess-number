// Here we create our custom button component
/* We want to proide our custom text for this button component, to make it reusable,
so we use props.children to be able use it with our text inside this <PrimaryButton> component */

import { StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton(props) {

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
      // we pass here function through props from StartGameScreen for confirm button 
        onPress={props.onPressPrimaryButton}
        android_ripple={{ color: Colors.pinkPlum2 }}
        // use ternary operator to apply different styles: default and for ios pressed
        // we aslo can use array of styles and apply two different styles simultaneousely
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.iosPressedButton]
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.buttonText}>{props.children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.pinkPlum1,
    paddingVertical: 8,
    paddingHorizontal: 16,

    // shadow for ANDROID : "elevation" prop (the higher leverl - the more shadows will be added)
    elevation: 2,

    // shadow for IOS are "shadow" properties like shadowColor, shadowOpacity and two more...
    shadowColor: "black",
    // wants an object and controls how much the shadow should be offset from the original obj to the left/right (in px)
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  iosPressedButton: {
    opacity: 0.65,
  },
});
