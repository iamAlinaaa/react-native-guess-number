import { useState, useEffect } from "react";

import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
// export one of sets of vector-icons
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

import NumberContainer from "../components/game/NumberContainer";
import GuessLogItem from "../components/game/GuessLogItem";

// GUESSING NUMBER FUNCTION
function generateRandomBetween(min, max, exclude) {
  const randomNum = Math.floor(Math.random() * (max - min)) + min;

  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
}

// create min and max Boundaries variables (it will be created just one time)
let minBoundary = 1;
let maxBoundary = 100;

function ActualGameScreen(props) {
  // we want to generate random number when the game first loading
  // But it will be changing overtime and we should use state

  // first guess to add into useState and then change it when user will play
  // we want to pass as "exclude" a first user input number, so we pass it through props from App.js
  const initialGuess = generateRandomBetween(
    // we have to hardcode it in case for useEffect to work correctly
    // AND TO BE ABLE TO START NEW GAME with correct values even we are still in the app
    1,
    100,
    props.userNumber
  );
  // !!!! we able to apply initial guess only for the first time when app launches.
  // Next times (when app is alsready working) currentGuess will have values that were assigned to it by setCurrentGuess
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  console.log("This is current Initial guess", initialGuess);
  console.log("This is current guess after hardcoding", currentGuess);

  // to count guess rounds number and create array of all guessed numbers
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  // to watch the state to call game over
  useEffect(() => {
    if (currentGuess === props.userNumber) {
      props.onGameOver(guessRounds.length);
    }
  }, [currentGuess, props.userNumber, props.onGameOver]);

  // WE WILL USE useEffect with emoty dependencies, because it is colled only once, when the component is first rendered
  // when the component restarts it will be called again for one time
  useEffect(() => {
    // here we pass our min and max Boundaries to renew their values when game restarted
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  // we create a function that will generate new number when clicking on button
  // we should check by key words "lower" or "greater" (directions)
  function nextGuessHandler(direction) {
    // we have to find out is user lying or not(trying to cheat and said wrong direction to comp that will lead to infinite loop)
    if (
      (direction === "lower" && currentGuess < props.userNumber) ||
      (direction === "greater" && currentGuess > props.userNumber)
    ) {
      // and we alert user that he/she lying and end this function
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      // we should guees again now from minBoundary to currentGuess (max value)
      // and currentGuess will be automatically excluded from the function because of limitation
      maxBoundary = currentGuess;
    } else {
      // if direction IS NOT "lower" we have to guess "greater" number
      // we use currentGuess + 1 because minBoundary is included into range
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    const newRandomNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    // we set current guess to new random number
    setCurrentGuess(newRandomNumber);

    // when we guess a new number we can update guessRounds to include this number into an array
    // latest numbr will always be on top because of position in array
    setGuessRounds((prevGuessRounds) => [newRandomNumber, ...prevGuessRounds]);

    console.log("this is new randomNumber", newRandomNumber);
    console.log("This is current guess after finding random num", currentGuess);
  }

  // calculate overall lenght of ass guesses (everytime recalculates)
  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            {/* .bind() is used to preconfigure the parameter value that will be user in a future function execution */}
            <PrimaryButton
              onPressPrimaryButton={nextGuessHandler.bind(this, "lower")}
            >
              {/* add icon for minus */}
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              onPressPrimaryButton={nextGuessHandler.bind(this, "greater")}
            >
              {/* add icon for plus */}
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(guessData) => {
            return (
              <GuessLogItem
                roundNumber={guessRoundsListLength - guessData.index}
                guess={guessData.item}
              />
            );
          }}
          keyExtractor={(guessItem) => guessItem}
        />
      </View>
    </View>
  );
}

export default ActualGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  instructionText: {
    marginBottom: 12,
  },
  // for better scrolling
  listContainer : {
    flex: 1,
    padding: 16
  }
});
