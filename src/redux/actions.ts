import { getUserInfoService, ILoginRequest, loginService } from "../services";
import { IUserInfo } from "../services/types";
import { KEYS } from "../storage";
import { initProfile } from "./profileReducer";

//USER
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USER_INFO = "GET_USER_INFO";

export const login = (inputRequest: ILoginRequest) => {
  return (dispatch: any) => {
    return new Promise<IUserInfo>(async (resolve, reject) => {
      try {
        const response = await loginService(inputRequest);
        localStorage.setItem(KEYS.TOKEN, response.token);
        localStorage.setItem(KEYS.UPLOAD_KEY, response.uploadKey);
        dispatch({ type: GET_USER_INFO, payload: response });
        resolve(response);
      } catch (error) {
        console.log("error in action login", error);
        reject(error);
      }
    });
  };
};

export const getUserInfo = (response?: IUserInfo) => {
  return (dispatch: any) => {
    return new Promise<IUserInfo>(async (resolve, reject) => {
      try {
        console.log("tien xem response getUserInfo", response);
        if (!response) {
          const token = localStorage.getItem(KEYS.TOKEN);
          if (!token) return resolve(initProfile);
          response = await getUserInfoService(token);
          localStorage.setItem(KEYS.UPLOAD_KEY, response.uploadKey);
        } else {
          localStorage.setItem(KEYS.TOKEN, response.token);
          localStorage.setItem(KEYS.UPLOAD_KEY, response.uploadKey);
        }
        dispatch({ type: GET_USER_INFO, payload: response });
        resolve(response);
      } catch (error) {
        console.log("error in action getUserInfo", error);
        reject(error);
      }
    });
  };
};
