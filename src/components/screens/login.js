import React from "react";
import {
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import { LinearGradient } from "expo";
import { SafeAreaView } from "react-navigation";
import { LoginService } from "../services";
export default class Login extends React.Component {
  navigation = this.props.navigation;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  _newUser() {
    this.props.navigation.navigate("register");
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
            placeholder="Enter Username"
            style={styles.input}
            onChangeText={username => this.setState({ username })}
          />
          <TextInput
            placeholder="Enter Password"
            style={styles.input}
            onChangeText={password => this.setState({ password })}
          />
          <LoginService
            navigation={this.navigation}
            credentials={{
              username: this.state.username,
              password: this.state.password
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._newUser()}
          >
            <Text style={{ fontSize: 20, color: "rgba(230,230,230,0.9)" }}>
              New User ??
            </Text>
          </TouchableOpacity>
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
