import React from "react";
import {
  Text,
  Picker,
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { LinearGradient, Constants, Location, Permissions } from "expo";
import { RegisterComplain } from "../services";

export default class Complain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ragger: "",
      details: ""
    };
  }

  resetScreen = () => {
    console.warn("reset Screen Called");
    this.setState({
      ragger: "",
      details: ""
    });
  };
  showDetails() {
    if (this.state.showDetails)
      return (
        <React.Fragment>
          <TextInput
            style={styles.input}
            placeholder="Details"
            onChangeText={details => this.setState({ details })}
          />
        </React.Fragment>
      );
    else return <React.Fragment />;
  }
  render() {
    return (
      <View style={styles.Screen}>
        <LinearGradient
          colors={["#905DB3", "#9E3D92", "#C53766"]}
          start={[0, 0]}
          style={styles.mainPage}
        >
          <TextInput
            placeholder="Enter Name of Ragger"
            style={styles.input}
            onChangeText={ragger => this.setState({ ragger })}
            value={this.state.ragger}
          />
          <Picker
            style={styles.picker}
            itemStyle={{ backgroundColor: "#00ff00", fontSize: 20 }}
            mode="dropdown"
            selectedValue={
              !this.state.showDetails ? this.state.details : "Other"
            }
            //style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              //this.setState({ details: itemValue });
              //console.warn(itemIndex);
              if (itemIndex != 4) {
                this.setState({ showDetails: false, details: itemValue });
                console.warn(this.state.details);
              } else {
                this.setState({ showDetails: true, details: "" });
              }
            }}
          >
            <Picker.Item label="Nothing" value="" />
            <Picker.Item
              label="Dress code ragging"
              value="Dress code ragging"
            />
            <Picker.Item label="Verbal abuse" value="Verbal abuse" />
            <Picker.Item label="Physical abuse" value="Physical abuse" />
            <Picker.Item label="Other" value="other" />
          </Picker>
          {this.showDetails()}

          <RegisterComplain data={this.state} reset={this.resetScreen} />
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Screen: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mainPage: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    justifyContent: "center"
    //alignItems: "center"
  },
  input: {
    borderWidth: 2,
    padding: 5,
    height: 50,
    borderColor: "transparent",
    backgroundColor: "rgba(255,255,255,0.1)",
    fontSize: 20,
    borderRadius: 10,
    margin: 10
  },
  picker: {
    borderWidth: 2,
    padding: 5,
    height: 50,
    borderColor: "transparent",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.9)",
    //fontSize: 20,
    borderRadius: 10,
    margin: 10
  },
  button: {
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    backgroundColor: "transparent",
    padding: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
