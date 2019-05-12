import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Image,
  ActivityIndicator,
  Vibration,
  View,
  Alert
} from "react-native";
import { Constants, Location, Permissions } from "expo";
import authUser from "./authUser";
import urlAPI from "../../config/url";
import LocationContext from "../Context/locationContext";
export default class HelpRegisterComplain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      locationAvailable: false,
      isPressed: false,
      success: false
    };
  }

  async postComplainAPI() {
    let details = {
      name: this.props.data.name,
      ragger: this.props.data.ragger,
      locationLatitude: this.state.location.coords.latitude,
      locationLongitude: this.state.location.coords.longitude,
      details: this.props.data.details
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    try {
      let response = await fetch(urlAPI + "/passauth/complain", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authUser.token,
          username: authUser.username,
          name: authUser.name,
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      });
      let responseJson = await response.json();
      if (responseJson.success) {
        this.setState({
          message: responseJson.message,
          success: responseJson.success,
          onPress: false
        });
        Vibration.vibrate(1000);
        Alert.alert(
          "Requesting Help",
          this.state.message,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        //shouldRemove = true;
      }
      //console.warn(responseJson.message)
      else {
        this.setState({
          message: responseJson.message
        });
        Alert.alert(
          "Error Requesting Help",
          this.state.message,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
      //console.warn('Error In registrring Complain'+responseJson.message)
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    if (this.state.locationAvailable)
      return (
        <View>
          <TouchableOpacity
            disabled={this.state.onPress}
            style={styles.button}
            onPress={() => {
              this.setState({
                onPress: true
              });
              //console.warn("props returned", this.props.data);
              this.postComplainAPI();
              this.props.reset();
            }}
          >
            <Text style={styles.buttonText}>Register Complain</Text>
            {!this.state.locationAvailable ? (
              <Image
                source={require("../../../assets/exclamation.png")}
                style={{ height: 30, width: 30, alignContent: "flex-end" }}
              />
            ) : (
              <React.Fragment />
            )}
            {this.state.onPress && !this.state.success ? (
              <ActivityIndicator />
            ) : null}
          </TouchableOpacity>
          {/*<Text style={{ textAlign: "center" }}>{this.state.message}</Text>*/}
        </View>
      );
    else
      return (
        <LocationContext.Consumer>
          {data => {
            this.setState({
              location: data,
              locationAvailable: true
            });
          }}
        </LocationContext.Consumer>
      );
  }
}
const styles = StyleSheet.create({
  button: {
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    backgroundColor: "transparent",
    padding: 5,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    color: "rgba(230,230,230,0.9)"
  }
});
