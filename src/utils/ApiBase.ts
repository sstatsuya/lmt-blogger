import { handleRemoveUser } from "../redux/actions";
import { store } from "../redux/store";
import { IError } from "../services/types";
import { KEYS } from "../storage";

export const fetchAPI = async ({
  url = "",
  method = "POST",
  data = {},
  headers = new Headers({
    "Content-Type": "application/json",
  }),
  isUpload = false,
  file = null,
}: {
  url: string;
  method?: "POST" | "GET" | "UPDATE" | "DELETE";
  data?: object;
  headers?: any;
  isUpload?: boolean;
  file?: any;
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res: any;
      const token = localStorage.getItem(KEYS.TOKEN) || "";
      const uploadKey = localStorage.getItem(KEYS.UPLOAD_KEY) || "";
      headers.set("authorization", token);

      if (isUpload) {
        let imageData = new FormData();
        //@ts-ignore
        imageData.append("image", file);
        headers.set("upload-key", uploadKey);
        headers.delete("Content-Type");

        res = await fetch(url, {
          method: "POST",
          headers: headers,
          body: imageData,
        });
      } else {
        res = await fetch(url, {
          method: method,
          headers: headers,
          ...(method !== "GET" ? { body: JSON.stringify(data) } : {}),
        });
      }
      let response;
      if (!isUpload) response = await res.json();
      else response = res;
      if (res.status === 500) {
        throw {
          message: response.message || "Interal Server Error",
        };
      }
      if (res.status === 401) {
        handleRemoveUser();
        // window.location.href = '/login';
        // console.log('tien vao')
        // store.dispatch({
        //   type: "LOGOUT",
        // })
        throw {
          message: "Phiên đăng nhập đã hết hạn",
        };
      }

      if (res.status === 404) {
        throw {
          message: "Không tìm thấy URL",
        };
      }

      if (!res.ok) {
        throw response;
      }

      return resolve(response);
    } catch (error: any) {
      console.log("[API ERROR]: ", error);
      const myError: IError = {
        isError: true,
        message: error.message || "Đã có lỗi xảy ra",
      };
      reject(myError);
    }
  });
};
