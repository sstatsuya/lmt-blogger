import { ILoginRequest, loginService } from "../services";
import { IUserInfo } from "../services/types";
import { KEYS } from "../storage";

//USER
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_USER_INFO = 'GET_USER_INFO';

export const login = (inputRequest: ILoginRequest) => {
    return (dispatch: any) => {
        return new Promise<IUserInfo>(async (resolve, reject) => {
            try {
                console.log('tien vao ne ', inputRequest);
                const response = await loginService(inputRequest);
                localStorage.setItem(KEYS.TOKEN, response.token);
                localStorage.setItem(KEYS.UPLOAD_KEY, response.uploadKey);
                dispatch({ type: GET_USER_INFO, payload: response });
                resolve(response);
            } catch (error) {
                console.log('error in action login', error);
                reject(error);
            }
        });
    };
};