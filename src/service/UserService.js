import axios from "axios";
import { ErrorConstants } from "../constants/constants";

export const UserService = {
  getUsers,
};

function getUsers(callbackFn) {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if (res.data && res.data.length) {
        if (callbackFn) {
          callbackFn(res.data);
        }
      } else {
        let error = [ErrorConstants.CAS_GUI_ERR_01];
        return Promise.reject(error);
      }
    })
    .catch((err) => {
      return Promise.reject([ErrorConstants.CAS_GUI_ERR_01]);
    });
}
