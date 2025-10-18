import { ILoginResponse } from ".";

export interface IError {
  isError: boolean;
  message: string;
}

export const MESSAGE = {
  DEFAULT_ERROR: "Đã có lỗi xảy ra",
};

export const initError = {
  isError: false,
  message: "",
};

// =>>>>> USER =>>>>>
export interface IUserInfo extends ILoginResponse {}

// =>>>>> POST =>>>>>
export interface ICreatePostRequest {
  title: string;
  content: string;
}

export const initPost = {
  id: "",
  title: "",
  content: "",
  createDate: 1747192447000,
  updateDate: 1747192447000,
  author: {
    id: "",
    avatar: "",
    fullname: "",
  },
};
export interface IPost {
  id: string;
  title: string;
  content: string;
  createDate: number;
  updateDate: number;
  author: {
    id: string;
    avatar: string;
    fullname: string;
  };
}
