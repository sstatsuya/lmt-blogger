import { ILoginResponse } from ".";

export interface IError {
    isError: boolean;
    message: string;
}

export const MESSAGE = {
    DEFAULT_ERROR: 'Đã có lỗi xảy ra',
};

export const initError = {
    isError: false,
    message: '',
};

// =>>>>> USER =>>>>>
export interface IUserInfo extends ILoginResponse { }