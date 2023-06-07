import { useState, useCallback, useEffect } from "react";

// We firstly install expo-font and then import
import * as Font from "expo-font";

// WE ALSO INSTALL expo-app-loading package to make loaing screen while required info is loading
// import AppLoading from "expo-app-loading";
// expo-app-loading is deprecated so we use expo-splash-screen
import * as SplashScreen from "expo-splash-screen";

// ImageBackground is special component that can add image on the background under the main functionality
// We can use SafeAreaView to place elements correctly , respecting the nothc on the phone automatically
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";

// App.js is the main component that renders first, so component inside it is also have priority
// To create linear gradient there is special package in expo so we install package "expo install expo-linear-gradient" import it
import { LinearGradient } from "expo-linear-gradient";

import StartGameScreen from "./screens/StartGameScreen";
import ActualGameScreen from "./screens/ActualGameScreen";
import GameOverScreen from "./screens/GameOverScreen";

import Colors from "./constants/colors";

// Here we navigate between screens manually without using third-party etensions

// Keep the splash screen visible while we fetch resources

export default function App() {
  // state for expo-splash-loading
  const [appIsReady, setAppIsReady] = useState(false);

  // state user input number to have the ability to manually navigate between the screens
  const [userNumber, setUserNumber] = useState();

  // game over state. gameOver is true unless user picked a number
  const [gameIsOver, setGameIsOver] = useState(true);

  // to count guess rounds number
  const [guessRounds, setGuessRounds] = useState(0);

  // LOAD THE FONTS WHEN APP IS EXECUTING (open fron ttf files)
  // objects with custom names for fonts and require(path) to loaded fonts
  // fontsLoaded (special array returned by useFonts) is a boolean that shows whether font loading or not
  const fontsLoading = {
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  };

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // add wonts that we wan to be loaded
        await Font.loadAsync(fontsLoading);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  function pickedNumberHandler(pickedNumber) {
    // we pass property "pickedNumber" to this function through props from another component
    setUserNumber(pickedNumber);
    // gameOver is false because user has chosen a number
    setGameIsOver(false);
  }

  // Game is over
  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }

  // for start of new game
  function startNewGameHandler() {
    // reset all for new game
    setUserNumber(null);
    setGuessRounds(0);
  }

  // create let (changable) variable that will show required screen
  let mainScreen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  // is User number is added (True) we change screen
  if (userNumber) {
    mainScreen = (
      <ActualGameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  // if only game over is true (becomes after computer has guessed) ad user number was inputed
  if (gameIsOver && userNumber) {
    mainScreen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  // if we want navigate manually we set our first screen as variable to start with
  // we pass function "pickedNumberHandler" through props to get the user input as function property

  /* to use LineadGradient we have to use it instead of <View> 
  We aslo can add styles to LinearGradient but colors that we want to use we have to implement as props colors
  we can use an array of colors inside colors prop*/
  /* we can add several styles to <ImageBackground>
     we cant wrap SafeAreaView around all the code in return , because we want our background to lie under the components
    so we just wrap  SafeAreaView around our screens */

  return (
    <LinearGradient
      colors={[Colors.pinkPlum3, Colors.mainYellow]}
      style={styles.rootScreen}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        style={styles.rootScreen}
        resizeMode="cover"
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{mainScreen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    // we add flex 1 to give this view the entire space on screen (as much as available)
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
