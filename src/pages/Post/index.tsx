import { useNavigate } from "react-router-dom";
import { ANIMATIONS, IMAGES } from "../../assets";
import PostItem from "./PostItem";
import { useEffect, useState } from "react";
import { IError, initError, IPost } from "../../services/types";
import { getPosts } from "../../services";
import Lottie from "lottie-react";

const PAGE_SIZE = 10;

const Post = () => {
  const [offset, setOffset] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<IError>(initError);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getAllPost = async (offset: number) => {
    try {
      setError(initError);
      setLoading(true);
      const res = await getPosts({ pageSize: PAGE_SIZE, offset });
      setPosts(res);
      setOffset((p) => p + PAGE_SIZE);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPost(offset);
  }, []);

  const renderLoading = () => {
    return (
      <div className="flex flex-1 flex-col items-center">
        <Lottie
          className="w-[40%] h-[40%]"
          animationData={ANIMATIONS.LOADING}
          loop={true}
          autoplay={true}
        />
      </div>
    );
  };

  const renderError = () => {
    return (
      <div className="flex flex-1 flex-col items-center">
        <p className="text-white">Có lỗi xảy ra rồi</p>
        <div
          onClick={() => getAllPost(offset)}
          className="mt-12 text-center w-32 cursor-pointer  py-2 border-1 border-border rounded-lg bg-title hover:scale-105 transition-transform duration-200"
        >
          <span className="text-white">Thử lại</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col pt-16">
      {isLoading && renderLoading()}
      {!isLoading &&
        !error.isError &&
        posts.map((i: IPost, index: number) => (
          <PostItem post={i} key={index} />
        ))}

      {!isLoading && error.isError && renderError()}
    </div>
  );
};

export default Post;
