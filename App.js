import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "",
      result: ""
    };
  }

  handleOp(op) {
    if (op === "C") {
      this.setState({
        display: "",
        result: ""
      });
    } else if (op === "=") {
      this.setState({
        display: this.state.result,
        result: ""
      });
    } else {
      const display = this.state.display + op;
      let result = this.state.result;

      try {
        let fixedOperation = display.split("x").join("*");
        fixedOperation = fixedOperation.split("÷").join("/");
        fixedOperation = fixedOperation.split(",").join(".");

        result = new String(eval(fixedOperation)).toString();
      } catch (e) {}

      this.setState({
        display,
        result
      });
    }
  }

  render() {
    const col1Buttons = [
      ["7", "8", "9"],
      ["4", "5", "6"],
      ["1", "2", "3"],
      [",", "0", "="]
    ];

    const col2Buttons = ["C", "÷", "x", "-", "+"];

    return (
      <View style={styles.container}>
        <Text style={styles.display}>{this.state.display}</Text>
        <Text style={styles.result}>{this.state.result}</Text>
        <View style={styles.buttons}>
          <View style={styles.col1}>
            {col1Buttons.map((line, ind) => (
              <View key={ind} style={styles.line}>
                {line.map(op => (
                  <TouchableOpacity
                    key={op}
                    style={styles.btn}
                    onPress={() => this.handleOp(op)}
                  >
                    <Text style={styles.btnText}>{op}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.col2}>
            {col2Buttons.map(op => (
              <TouchableOpacity
                key={op}
                style={styles.btn}
                onPress={() => this.handleOp(op)}
              >
                <Text style={styles.btnText}>{op}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
  },

  display: {
    flex: 1,
    backgroundColor: "#efefef",
    fontSize: 70,
    textAlign: "right",
    paddingTop: 30,
    paddingRight: 10
  },

  result: {
    flex: 0.4,
    backgroundColor: "#efefef",
    fontSize: 35,
    textAlign: "right",
    paddingRight: 10,
    paddingBottom: 10
  },

  buttons: {
    flex: 5,
    flexDirection: "row"
  },

  col1: {
    flex: 3,
    backgroundColor: "#000"
  },

  line: {
    flexDirection: "row",
    flex: 1
  },

  btn: {
    flex: 1,
    justifyContent: "center"
  },

  btnText: {
    textAlign: "center",
    fontSize: 40,
    color: "#fff"
  },

  col2: {
    flex: 1,
    backgroundColor: "#0b0b0b"
  }
});
