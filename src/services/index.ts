import { LOGIN } from "../constant/api";
import { fetchAPI } from "../utils/ApiBase";
import { IError, MESSAGE } from "./types";

type TypeUserRole = 'member' | 'admin';
export interface ILoginRequest {
    username: string;
    password: string;
}
export interface ILoginResponse {
    id: string;
    role: TypeUserRole;
    fullname: string;
    avatar: string;
    token: string;
    address: string;
    email: string;
    phoneNumber: string;
    uploadKey: string;
}

export const loginService = async (inputRequest: ILoginRequest) => {
    return new Promise<ILoginResponse>(async (resolve, reject) => {
        try {
            const response: any = await fetchAPI({ url: LOGIN, data: inputRequest });
            return resolve(response);
        } catch (error: any) {
            const myError: IError = {
                isError: true,
                message: error.message || MESSAGE.DEFAULT_ERROR,
            };
            return reject(myError);
        }
    });
};