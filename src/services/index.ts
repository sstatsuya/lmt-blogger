import {
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  GET_ALL_POST,
  GET_POST_BY_ID,
  GET_USER_INFO,
  LOGIN,
  LOGOUT,
  UPLOAD_IMAGE,
} from "../constant/api";
import { fetchAPI } from "../utils/ApiBase";
import { formatPost, formatPosts } from "./adapter";
import { IError, IPost, MESSAGE } from "./types";

type TypeUserRole = "member" | "admin";
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
      console.log("tien xem error loginService ", error);
      const myError: IError = {
        isError: true,
        message: error.message || MESSAGE.DEFAULT_ERROR,
      };
      return reject(myError);
    }
  });
};

export const getUserInfoService = async () => {
  return new Promise<ILoginResponse>(async (resolve, reject) => {
    try {
      const response: any = await fetchAPI({
        url: GET_USER_INFO,
      });
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

export const logoutService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: any = await fetchAPI({
        url: LOGOUT,
      });
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

export const getPosts = async ({
  pageSize = 10,
  offset = 0,
}: {
  pageSize: number;
  offset: number;
}) => {
  return new Promise<IPost[]>(async (resolve, reject) => {
    try {
      const response: any = await fetchAPI({
        url: GET_ALL_POST,
        data: {
          pageSize,
          offset,
        },
      });
      const data = formatPosts(response);
      return resolve(data);
    } catch (error: any) {
      const myError: IError = {
        isError: true,
        message: error.message || MESSAGE.DEFAULT_ERROR,
      };
      return reject(myError);
    }
  });
};

export const getPostById = async (id: string) => {
  return new Promise<IPost>(async (resolve, reject) => {
    try {
      const response: any = await fetchAPI({
        method: "GET",
        url: `${GET_POST_BY_ID}/${id}`,
      });
      const data = formatPost(response);
      return resolve(data);
    } catch (error: any) {
      const myError: IError = {
        isError: true,
        message: error.message || MESSAGE.DEFAULT_ERROR,
      };
      return reject(myError);
    }
  });
};

export const createPost = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return new Promise<IPost>(async (resolve, reject) => {
    try {
      const response: any = await fetchAPI({
        url: CREATE_POST,
        data: {
          title,
          content,
        },
      });
      const data = formatPost(response);
      return resolve(data);
    } catch (error: any) {
      const myError: IError = {
        isError: true,
        message: error.message || MESSAGE.DEFAULT_ERROR,
      };
      return reject(myError);
    }
  });
};

export const uploadImageService = async (file: File) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const res: any = await fetchAPI({
        url: UPLOAD_IMAGE,
        file: file,
        isUpload: true,
      });

      const data = await res.json();
      return resolve(data.url);
    } catch (error: any) {
      const myError: IError = {
        isError: true,
        message: error.message || MESSAGE.DEFAULT_ERROR,
      };
      return reject(myError);
    }
  });
};

export const deletePostService = async (id: string) => {
  return new Promise<IPost>(async (resolve, reject) => {
    try {
      const response: any = await fetchAPI({
        url: DELETE_POST,
        data: {
          postID: id,
        },
      });
      const data = formatPost(response);
      return resolve(data);
    } catch (error: any) {
      const myError: IError = {
        isError: true,
        message: error.message || MESSAGE.DEFAULT_ERROR,
      };
      return reject(myError);
    }
  });
};

export const editPostService = async (id: string, title: string, content: string) => {
  return new Promise<IPost>(async (resolve, reject) => {
    try {
      const response: any = await fetchAPI({
        url: EDIT_POST,
        data: {
          title, content, id
        },
      });
      const data = formatPost(response);
      return resolve(data);
    } catch (error: any) {
      const myError: IError = {
        isError: true,
        message: error.message || MESSAGE.DEFAULT_ERROR,
      };
      return reject(myError);
    }
  });
};
