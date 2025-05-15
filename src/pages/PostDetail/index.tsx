import { useParams } from "react-router-dom";
import { ANIMATIONS } from "../../assets";
import TitleList from "./TitleList";
import { IError, initError, initPost, IPost } from "../../services/types";
import { useEffect, useState } from "react";
import { getPostById } from "../../services";
import Lottie from "lottie-react";

const PostDetail = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<IError>(initError);
  const [post, setPost] = useState<IPost>(initPost);
  const { id } = useParams();

  const getPost = async () => {
    try {
      setError(initError);
      setLoading(true);
      const response = await getPostById(id!);
      setPost(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 120; // trừ 40px
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const renderPreview = () => {
    return (
        <>
        <p className="text-white font-semibold text-4xl mb-12 px-4">{post.title}</p>
        <div
          className="px-4 bg-transparent text-black rounded prose prose-invert max-w-none preview-container"
          dangerouslySetInnerHTML={{ __html: post.content }} // Hiển thị HTML của editor
        />
        </>
    );
  };

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
          onClick={() => getPostById(id!)}
          className="mt-12 text-center w-32 cursor-pointer  py-2 border-1 border-border rounded-lg bg-title hover:scale-105 transition-transform duration-200"
        >
          <span className="text-white">Thử lại</span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div className="w-[20%] border-r-1 border-border relative flex-1">
          <TitleList html={post.content} scrollToHeading={scrollToHeading} />
        </div>
        <div className="w-[80%] pl-4">{renderPreview()}</div>
      </>
    );
  };

  return (
    <div className="flex flex-1 pb-12">
      {isLoading && renderLoading()}
      {!isLoading && !error.isError && renderContent()}
      {!isLoading && error.isError && renderError()}
    </div>
  );
};

export default PostDetail;
