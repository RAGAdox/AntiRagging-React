import { AsyncStorage } from "react-native";
import authUser from "./authUser";
export default function logout() {
  return new Promise((resolve, reject) => {
    let p1 = AsyncStorage.removeItem("username");
    let p2 = AsyncStorage.removeItem("secure_token");
    Promise.all([p1, p2]).then(result => {
      authUser.username = null;
      authUser.token = null;
      return resolve();
    });
  });
}
