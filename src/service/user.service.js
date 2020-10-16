import axios from 'axios';
import { errorConstants } from '../constants';

export const userService = {
    getUsers,
};

function getUsers(setUserFun){
    return axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
       if(res.data && res.data && res.data.length){
            if(setUserFun) {
                setUserFun(res.data);
            }
        }else{
            let error = [errorConstants.SERERR_01];
            return Promise.reject(error);
        }
    }).catch((err)=>{
        return Promise.reject([errorConstants.SERERR_01]);
    });
}


