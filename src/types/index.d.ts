interface IError {
  isError: boolean;
  message: string;
}

interface ICategory {
  _id: string;
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  isActive: boolean;
  createDate: number;
  updateDate: number;
  posts: IPost[];
}
interface IPost {
  id: string;
  title: string;
  content: string;
  createDate: number;
  updateDate: number;
  categoryIDs: string[];
  author: {
    id: string;
    avatar: string;
    fullname: string;
  };
}
