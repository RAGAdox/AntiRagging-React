import authUser from "./authUser";
import urlAPI from "../../config/url";

//import { MyComplains } from "../screens";
export default function MyComplainService() {
  return new Promise((resolve, reject) => {
    try {
      fetch(urlAPI + "/passauth/complainAll", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + authUser.token,
          username: authUser.username
        }
      })
        .then(response => response.json())
        .then(responseJSON => {
          if ((responseJSON.success = true)) {
            return resolve(responseJSON.complain);
          } else return reject(false);
        });
    } catch (e) {
      return reject(false);
    }
  });
}