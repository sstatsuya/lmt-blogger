import { GET_CATEGORIES } from "../constant/api";
import { fetchAPI } from "../utils/ApiBase";
import { MESSAGE } from "./types";

export const getCategories = async ({
  offsetCate = 0,
  pageSizeCate = 10,
  pageSizePost = 5,
}: {
  offsetCate?: number;
  pageSizeCate?: number;
  pageSizePost?: number;
}) => {
  return new Promise<ICategory[]>(async (resolve, reject) => {
    try {
      const response: any = await fetchAPI({
        url: GET_CATEGORIES,
        data: {
          offsetCate,
          pageSizeCate,
          pageSizePost,
        },
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
