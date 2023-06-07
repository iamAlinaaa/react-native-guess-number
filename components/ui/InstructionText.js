import {Text, StyleSheet} from "react-native"

import Colors from "../../constants/colors";

function InstructionText(props){
    // we also can pass style as props, but to overwrite previous we should write them in array after default styles
    return (<Text style={[styles.instructionText, props.style]}>{props.children}</Text>)
}

export default InstructionText;

const styles = StyleSheet.create({
    instructionText: {
        fontFamily: "open-sans",
        color: Colors.mainYellow,
        fontSize: 24,
      },
})