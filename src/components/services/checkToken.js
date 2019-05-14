import { AsyncStorage } from "react-native";
import { Alert } from "react-native";
import urlAPI from "../../config/url";
import authUser from "./authUser";
let username;
let token;
let name;
//await AsyncStorage.getItem("secure_token",
export default function checkToken() {
  return new Promise((resolve, reject) => {
    let p1 = AsyncStorage.getItem("secure_token");
    let p2 = AsyncStorage.getItem("username");
    let p3 = AsyncStorage.getItem("name");
    Promise.all([p1, p2, p3]).then(result => {
      token = result[0];
      username = result[1];
      name = result[2];
      console.warn(token, username);
      if (username != null && token != null && name != null) {
        try {
          fetch(urlAPI + "/passauth/checktoken", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              username: username
            }
          })
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson.success) {
                authUser.username = username;
                authUser.token = token;
                authUser.name = name;
                return resolve(true);
              } else {
                return resolve(false);
              }
            });
          //return resolve(true);
        } catch (e) {
          Alert.alert(
            "AntiRagging Application",
            "Cannot Access Server",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      } else return reject(false);
    });
  });
}
