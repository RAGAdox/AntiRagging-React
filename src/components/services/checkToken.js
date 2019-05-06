import { AsyncStorage } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import urlAPI from "../../config/url";
import authUser from "./authUser";
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
      if (username != null || token != null) {
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
              return resolve(true);
            } else {
              return resolve(false);
            }
          });
        //return resolve(true);
      } else return reject(false);
    });
  });
}
