import axios from "axios";
import { ErrorConstants } from "../constants/constants";

export const CancellationService = {
  getAllCancellationInfo,
  searchCancellationInfo
};


function getAllCancellationInfo(callbackFn) {
  debugger;
  return axios
    .get("http://localhost:8080/cas-gui/cancel-flight")
    .then((res) => {
      debugger;
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

  function searchCancellationInfo(data) {
    return axios
      .post("http://localhost:8080/cas-gui/cancel-flight/search",data,{
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        debugger;
        if (res.status===200 && res.data) {
            return Promise.resolve(res.data)
        } else {
          let error = [ErrorConstants.CAS_GUI_ERR_01];
          return Promise.reject(error);
        }
      })
      .catch((err) => {
        return Promise.reject([ErrorConstants.CAS_GUI_ERR_01]);
      });
  }
