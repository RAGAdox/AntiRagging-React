import React from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Vibration,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { LinearGradient } from "expo";
import urlAPI from "../../config/url";
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onPress: false,
      validated: false,
      username: "",
      name: "",
      password: "",
      passwordConfirm: "",
      collegeName: "",
      presentAddress: "",
      phoneNumber: "",
      email: "",
      warning: "",
      success: "",
      showKeyboard: false
    };
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        this.setState({
          showKeyboard: true
        });
      }
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        this.setState({
          showKeyboard: false
        });
      }
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  async postSaveUser() {
    var users = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      staffStatus: false,
      collegeName: this.state.collegeName,
      presentAddress: this.state.presentAddress,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email
    };

    var formBody = [];
    for (var property in users) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(users[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    //console.warn(formBody)
    try {
      let response = await fetch(urlAPI + "/passauth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formBody
      });
      let responseJSON = await response.json();
      //console.warn(responseJSON)
      //return responseJSON.success;
      if (responseJSON.success == true) {
        Vibration.vibrate(1000);
        this.setState({
          success: true,
          message: responseJSON.message,
          onPress: false
        });
        Alert.alert(
          "Signup",
          this.state.message,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else {
        let errorMessage = "";
        console.warn(typeof responseJSON.message);
        if (typeof responseJSON.message == "string") {
          errorMessage = responseJSON.message;
          //console.warn('error message= after for loop'+errorMessage)
        } else {
          console.warn(responseJSON.message.length);
          var i;
          for (i = 0; i < responseJSON.message.length; i++)
            errorMessage +=
              responseJSON.message[i].msg +
              " of " +
              responseJSON.message[i].param +
              "\n";
          //console.warn('error message= not for loop'+errorMessage)
        }

        this.setState({
          success: false,
          warning: errorMessage,
          message: responseJSON.message,
          onPress: false
        });
        Alert.alert(
          "Error During Signup",
          this.state.warning,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        /*for(var tag in responseJSON.error)
                    console.warn(tag)*/
        //console.warn(users)
      }
    } catch (err) {
      //return null;
      this.setState({
        success: false,
        warning: "Some error occured catched"
      });
    }
  }
  render() {
    return (
      <LinearGradient
        colors={["#905DB3", "#9E3D92", "#C53766"]}
        start={[0, 0]}
        style={styles.mainPage}
      >
        <ScrollView
          style={[
            styles.Screen,
            this.state.showKeyboard == true ? styles.resize : null
          ]}
          alwaysBounceVertical="true"
        >
          <Text style={styles.lable}>Username</Text>
          <TextInput
            placeholder="Username"
            style={[
              styles.input,
              this.state.username == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={username => this.setState({ username })}
            onBlur={() => {
              if (this.state.username.length < 5) {
                this.setState({
                  validated: false,
                  username: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Full Name</Text>
          <TextInput
            placeholder="Name"
            style={[
              styles.input,
              this.state.name == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={name => this.setState({ name })}
            onBlur={() => {
              if (this.state.name.length == 0) {
                this.setState({
                  validated: false,
                  name: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={[
              styles.input,
              this.state.password == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={password => this.setState({ password })}
            onBlur={() => {
              if (this.state.password.length < 5) {
                this.setState({
                  validated: false,
                  password: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            style={[
              styles.input,
              this.state.passwordConfirm == "INVALID" ? styles.invalid : null
            ]}
            secureTextEntry={true}
            onChangeText={passwordConfirm => {
              this.setState({ passwordConfirm });
            }}
            onBlur={() => {
              if (this.state.passwordConfirm != this.state.password) {
                this.setState({
                  validated: false,
                  passwordConfirm: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>College Name</Text>
          <TextInput
            placeholder="College Name"
            style={[
              styles.input,
              this.state.collegeName == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={collegeName => this.setState({ collegeName })}
            onBlur={() => {
              if (this.state.collegeName.length == 0) {
                this.setState({
                  validated: false,
                  collegeName: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Present Address</Text>
          <TextInput
            placeholder="Present Address"
            style={[
              styles.input,
              this.state.presentAddress == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={presentAddress => this.setState({ presentAddress })}
            onBlur={() => {
              if (this.state.presentAddress.length == 0) {
                this.setState({
                  validated: false,
                  presentAddress: "INVALID"
                });
              } else {
                this.setState({
                  validated: true
                });
              }
            }}
          />
          <Text style={styles.lable}>Phone Number</Text>
          <TextInput
            placeholder="Phone Number"
            style={[
              styles.input,
              this.state.phoneNumber == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            onBlur={() => {
              if (
                !isNaN(this.state.phoneNumber) &&
                this.state.phoneNumber.length == 10
              ) {
                this.setState({
                  validated: true
                });
              } else {
                this.setState({
                  validated: false,
                  phoneNumber: "INVALID"
                });
              }
            }}
          />
          <Text style={styles.lable}>Email Address</Text>
          <TextInput
            placeholder="Email Adderss"
            style={[
              styles.input,
              this.state.email == "INVALID" ? styles.invalid : null
            ]}
            onChangeText={email => this.setState({ email })}
            onBlur={() => {
              var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
              if (re.test(this.state.email))
                this.setState({
                  validated: true
                });
              else {
                console.warn("Invalid Email");
                this.setState({
                  email: "INVALID",
                  validated: false
                });
              }
            }}
          />
          {/*<Text>{this.state.warning}</Text>
          <Text>{this.state.message}</Text>*/}
          <TouchableOpacity
            disabled={this.state.onPress}
            style={styles.button}
            title="Signup"
            onPress={() => {
              this.setState({ onPress: true });
              if (
                this.state.username != "INVALID" &&
                this.state.password != "INVALID" &&
                this.state.passwordConfirm != "INVALID" &&
                this.state.name != "INVALID" &&
                this.state.collegeName != "INVALID" &&
                this.state.presentAddress != "INVALID" &&
                this.state.phoneNumber != "INVALID" &&
                this.state.email != "INVALID" &&
                this.state.validated == true
              ) {
                this.postSaveUser().then(() => {
                  /*console.warn(this.state.success)*/
                  if (this.state.success == true) {
                    console.warn("success");
                  }
                });
              } else {
                Alert.alert(
                  "All Fields are mandatory",
                  "Plese complete all the fields in order to SignUp",
                  [
                    {
                      text: "OK",
                      onPress: () => this.setState({ onPress: false })
                    }
                  ],
                  { cancelable: false }
                );
              }
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
            {this.state.onPress && !this.state.success ? (
              <ActivityIndicator />
            ) : null}
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  Screen: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1
    //justifyContent: "center",
    //alignItems: "center"
  },
  resize: { marginBottom: 70 + "%" },
  invalid: {
    borderColor: "#ff0000"
  },
  mainPage: {
    height: 100 + "%",
    width: 100 + "%",
    flex: 1,
    justifyContent: "center"
    //alignItems: "center"
  },
  lable: {
    //padding: 5,
    //height: 50,

    fontSize: 20,
    marginLeft: 10,
    color: "#ffffff"
    //margin: 10
  },
  input: {
    borderWidth: 2,
    padding: 5,
    height: 50,
    borderColor: "transparent",
    backgroundColor: "rgba(255,255,255,0.1)",
    fontSize: 20,
    borderRadius: 10,
    margin: 10,
    color: "#ffffff"
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
