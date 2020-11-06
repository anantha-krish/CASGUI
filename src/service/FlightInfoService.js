import axios from "axios";
import { ErrorConstants } from "../constants/constants";

export const FlightInfoService = {
  createNewFlightInfo,
  getAllFlightInfo,
  getFlightInfoById,
  deleteFlightInfo,
  updateFlightInfo,
  updateFlightInfos
};

function createNewFlightInfo(formData) {
  return axios
    .post("http://localhost:8080/cas-gui/flight-info",formData,{
    })
    .then((res) => {
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

function updateFlightInfo(formData) {
  return axios
    .put("http://localhost:8080/cas-gui/flight-info",formData,{
     })
    .then((res) => {
    
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

function updateFlightInfos(data) {
  return axios
    .post("http://localhost:8080/cas-gui/flight-infos",data,{
     })
    .then((res) => {
      if (res.status===204 ) {
          return Promise.resolve(res.status)
      } else {
        let error = [ErrorConstants.CAS_GUI_ERR_01];
        return Promise.reject(error);
      }
    })
    .catch((err) => {
      return Promise.reject([ErrorConstants.CAS_GUI_ERR_01]);
    });
}



function deleteFlightInfo(id) {
  const url ="http://localhost:8080/cas-gui/flight-info/"+id;
  return axios
    .delete(url)
    .then((res) => {
      if (res.status===204 ) {
        return Promise.resolve(res.status)
      } else {
        let error = [ErrorConstants.CAS_GUI_ERR_01];
        return Promise.reject(error);
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
      if (res.data) {
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




