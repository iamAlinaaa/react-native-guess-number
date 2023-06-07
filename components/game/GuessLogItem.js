import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

// logs all the guess attempts

function GuessLogItem(props) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{props.roundNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess: {props.guess}</Text>
    </View>
  );
}

export default GuessLogItem;

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.pinkPlum4,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.mainYellow,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // shadow for android
    elevation: 4,
    // shadow for iOs:
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
