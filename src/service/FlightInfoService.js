import axios from "axios";
import { ErrorConstants } from "../constants/constants";

export const FlightInfoService = {
  createNewFlightInfo,
  getAllFlightInfo,
  getFlightInfoById,
  deleteFlightInfo
};

function createNewFlightInfo(data) {
  return axios
    .post("http://localhost:8080/cas-gui/flight-info",data,{
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.location) {
          return Promise.resolve(true)
      } else {
        let error = [ErrorConstants.CAS_GUI_ERR_01];
        return Promise.reject(error);
      }
    })
    .catch((err) => {
      return Promise.reject([ErrorConstants.CAS_GUI_ERR_01]);
    });
}

function deleteFlightInfo(id,callbackFn) {
  const url ="http://localhost:8080/cas-gui/flight-info/"+id;
  return axios
    .delete(url)
    .then((res) => {
      if (callbackFn) {
        callbackFn(res.status);
      }
    })
    .catch((err) => {
      return Promise.reject([ErrorConstants.CAS_GUI_ERR_01]);
    });
}


function getAllFlightInfo(callbackFn) {
  return axios
    .get("http://localhost:8080/cas-gui/flight-info")
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
    
function getFlightInfoById(id,callbackFn) {
  return axios
    .get("http://localhost:8080/cas-gui/flight-info/"+id)
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

