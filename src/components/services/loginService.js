import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  View
} from "react-native";
import authUser from "./authUser";
import urlAPI from "../../config/url";

export default class LoginService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      isPressed: false,
      message: ""
    };
  }
  async getTokenFromAPI() {
    this.setState({
      isPressed: true
    });
    var details = {
      username: this.props.credentials.username,
      password: this.props.credentials.password
    };
    //console.warn(details)
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //console.warn(formBody)
    try {
      let response = await fetch(urlAPI + "/passauth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      });
      let responseJson = await response.json();
      if (responseJson.success == true) {
        authUser.username = details.username;
        authUser.token = responseJson.token;
        authUser.name = responseJson.name;
        this.setState({
          token: await AsyncStorage.getItem("secure_token"),
          success: responseJson.success,
          message: responseJson.message
        });
        console.warn(responseJson.name);

        let p1 = AsyncStorage.setItem("secure_token", responseJson.token);
        let p2 = AsyncStorage.setItem("username", details.username);
        let p3 = AsyncStorage.setItem("name", responseJson.name);
        Promise.all([p1, p2, p3]).then(result => {
          console.warn(" Saved to local Storage " + result);
          this.props.navigation.navigate("home");
        });
      } else {
        this.setState({
          token: "Invalid",
          isPressed: false,
          success: responseJson.success,
          message: responseJson.message
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <View>
        {!this.state.isPressed && !this.state.success ? (
          <Text
            style={
              this.state.success
                ? { color: "#00ff00" }
                : { color: "#ff0000", textAlign: "center" }
            }
          >
            {this.state.message}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.getTokenFromAPI()}
        >
          <Text style={styles.buttonText}>Login</Text>
          {this.state.isPressed && !this.state.success ? (
            <ActivityIndicator />
          ) : null}
        </TouchableOpacity>
      </View>
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
    color: "rgba(230,230,230,0.9)"
  }
});
