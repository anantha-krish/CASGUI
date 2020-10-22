import axios from "axios";
import { ErrorConstants } from "../constants/constants";

export const CancellationService = {
  searchAllCancellationRequests,
};

function searchAllCancellationRequests(callbackFn) {
  return axios
    .get("./cancellationReqData.json")
    .then((res) => {
      if (res.data ) {
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
