import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo";
import authUser from "../services/authUser";
import urlAPI from "../../config/url";
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      success: false,
      message: "",
      user: ""
    };
    this.getProfileApi();
  }
  async getProfileApi() {
    let formBody = [];
    formBody.push(
      encodeURIComponent("username") +
        "=" +
        encodeURIComponent(authUser.username)
    );
    try {
      let response = await fetch(urlAPI + "/passauth/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authUser.token,
          username: authUser.username
        }
      });
      let responseJson = await response.json();
      //console.warn(responseJson)
      if ((responseJson.success = true)) {
        this.setState({
          success: responseJson.success,
          user: responseJson.user,
          message: responseJson.message,
          isLoading: false
        });
      } else if ((responseJson.success = false))
        this.setState({
          success: responseJson.success,
          message: responseJson.message
        });
      //return responseJson.msg;
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            //flexDirection: "row",
            alignItem: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            Fetching Profile for {authUser.name}
          </Text>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      );
    } else if (this.state.success) {
      return (
        <View style={styles.Screen}>
          <LinearGradient
            colors={["#905DB3", "#9E3D92", "#C53766"]}
            start={[0, 0]}
            style={styles.mainPage}
          >
            <View style={styles.row}>
              <Text style={styles.text}>Username{"\t"}</Text>
              <Text style={styles.text}>{this.state.user.username}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Name{"\t"}</Text>
              <Text style={styles.text}>{this.state.user.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Email{"\t"}</Text>
              <Text style={styles.text}>{this.state.user.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>College{"\t"}</Text>
              <Text style={styles.text}>{this.state.user.collegeName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Present Address{"\t"}</Text>
              <Text style={styles.text}>{this.state.user.presentAddress}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Phone Number{"\t"}</Text>
              <Text style={styles.text}>{this.state.user.phoneNumber}</Text>
            </View>
          </LinearGradient>
        </View>
      );
    }
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
  row: {
    borderWidth: 2,
    padding: 5,
    height: 50,
    flexDirection: "row",
    borderColor: "transparent",
    backgroundColor: "rgba(255,255,255,0.1)",
    fontSize: 20,
    borderRadius: 10,
    color: "rgb(255,255,255)",
    margin: 10
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "rgb(255,255,255)",
    textAlignVertical: "center"
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
