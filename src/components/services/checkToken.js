import { AsyncStorage } from "react-native";
import { createSwitchNavigator } from "react-navigation";
let username;
let token;
//await AsyncStorage.getItem("secure_token",
export default function checkToken() {
  return new Promise((resolve, reject) => {
    let p1 = AsyncStorage.getItem("secure_token");
    let p2 = AsyncStorage.getItem("username");
    Promise.all([p1, p2]).then(result => {
      token = result[0];
      username = result[1];
      console.warn(token, username);
      if (username != null || token != null) return resolve(true);
      else return reject(false);
    });
  });
}
