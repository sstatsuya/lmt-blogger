import { IPost } from "./types";

export const formatPost = (post: any): IPost => {
  return {
    ...post,
    id: post._id,
  };
};

export const formatPosts = (post: any): IPost[] => {
  const result = post.map((i: any) => ({
    ...i,
    id: i._id,
  }));
  return result;
};

export const formatCategories = (categories: any): ICategory[] => {
  const result = categories.map((i: any) => ({
    ...i,
    id: i._id,
  }));
  return result;
};
