import { View, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function Card(props) {
  return <View style={styles.cardContainer}>{props.children}</View>;
}

export default Card;

const styles = StyleSheet.create({
    cardContainer: {
        // position top to bottom
        justifyContent: "center",
        // position left to right
        alignItems: "center",
        padding: 16,
        marginTop: 36,
        marginHorizontal: 24,
        backgroundColor: Colors.pinkPlum4,
        borderRadius: 8,
        // shadow for ANDROID : "elevation" prop (the higher leverl - the more shadows will be added)
        elevation: 4,
        // shadow for IOS are "shadow" properties like shadowColor, shadowOpacity and two more...
        shadowColor: "black",
        // wants an object and controls how much the shadow should be offset from the original obj to the left/right (in px)
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
      },
});
