import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { Constants, Location, Permissions } from "expo";
import authUser from "./authUser";
import urlAPI from "../../config/url";
import nullthrows from "nullthrows";
export default class RegisterComplain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      locationAvailable: false
    };
  }
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, locationAvailable: true });
    console.warn("location generated" + this.state.location.coords.latitude);
  };
  async postComplainAPI() {
    let details = {
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
      if (responseJson.success)
        this.setState({
          message: responseJson.message
        });
      //console.warn(responseJson.message)
      else
        this.setState({
          message: responseJson.message
        });
      //console.warn('Error In registrring Complain'+responseJson.message)
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <TouchableOpacity
        disabled={!this.state.locationAvailable}
        style={styles.button}
        onPress={() => {
          console.warn("props returned", this.props.data);
          this.postComplainAPI();
        }}
      >
        <Text>Register Complain</Text>
      </TouchableOpacity>
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

    justifyContent: "center",
    alignItems: "center"
  }
});
