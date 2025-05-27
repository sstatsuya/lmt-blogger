import { useNavigate, useParams } from "react-router-dom";
import { ANIMATIONS } from "../../assets";
import TitleList from "./TitleList";
import { IError, initError, initPost, IPost } from "../../services/types";
import { useEffect, useState } from "react";
import { deletePostService, getPostById } from "../../services";
import Lottie from "lottie-react";
import { Dropdown, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  extractImageUrlsFromHtml,
  getImageSrcFromTarget,
  getIndFromArray,
  Toast,
} from "../../utils";
import { APP_ROUTE } from "../../App";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../redux/store";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ChevronRight, X } from "lucide-react";

const VerticalDotsDropdown = ({ options }: { options: any }) => (
  <Dropdown
    menu={{
      items: options,
    }}
    placement="bottomRight"
  >
    <a onClick={(e) => e.preventDefault()} style={{ cursor: "pointer" }}>
      <EllipsisOutlined style={{ fontSize: "20px", color: "#fff" }} />
    </a>
  </Dropdown>
);

const PostDetail = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<IError>(initError);
  const [post, setPost] = useState<IPost>(initPost);
  const { id } = useParams();
  const [isOpenModalDelete, setOpenModalDelete] = useState(false);
  const [isDeletingPost, setDeletingPost] = useState(false);
  const profile = useSelector((state: RootReducerType) => state.profileReducer);
  const [isOpenLightBox, setOpenLightbox] = useState(false);
  const [lightBoxIndex, setLightBoxIndex] = useState(0);
  const imgs = extractImageUrlsFromHtml(post.content);
  const [isOpenLeftBar, setOpenLeftBar] = useState(false);

  const onDeletePost = async () => {
    try {
      setError(initError);
      setDeletingPost(true);
      await deletePostService(id!);
      navigate(APP_ROUTE.POST);
      Toast.show({ text: "Xoá thành công" });
    } catch (error) {
      Toast.show({ text: "Đã có lỗi khi xoá bài viết" });
      console.log("tien xem error ", error);
      setError(error as IError);
    } finally {
      setDeletingPost(false);
    }
  };

  const renderModalDelete = () => (
    <Modal
      className="custom-dark-modal"
      title={"Xoá bài viết"}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpenModalDelete}
      onOk={onDeletePost}
      onCancel={() => setOpenModalDelete(false)}
      confirmLoading={isDeletingPost}
    >
      <p>Bạn có muốn xoá bài viết này không?</p>
    </Modal>
  );

  const options = [
    {
      label: "Chỉnh sửa",
      key: "edit",
      onClick: () => {
        navigate(`${APP_ROUTE.CREATE_POST}/`, {
          state: {
            isEdit: true,
            postID: post.id,
            postTitle: post.title,
            postContent: post.content,
          },
        });
      },
    },
    {
      label: "Xem chi tiết",
      key: "view",
    },
    {
      label: "Xóa",
      key: "delete",
      danger: true, // Đặt màu đỏ cho hành động xóa
      onClick: () => {
        setOpenModalDelete(true);
      },
    },
  ];

  const getPost = async () => {
    try {
      setError(initError);
      setLoading(true);
      const response = await getPostById(id!);
      setPost(response);
    } catch (error) {
      console.log("tien xem error ", error);
      setError(error as IError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const scrollToHeading = (id: string) => {
    setOpenLeftBar(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 120; // trừ 40px
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleClick = (e: any) => {
    if (e.target.tagName === "IMG") {
      const idx = getIndFromArray(imgs, getImageSrcFromTarget(e.target) || "");
      console.log("tien xem idx ", idx);
      setLightBoxIndex(idx);
      setOpenLightbox(true);
    }
  };

  const renderPreview = () => {
    return (
      <>
        <p className="text-white font-semibold text-4xl mb-12 px-4 flex flex-row justify-between">
          {post.title}
          {profile.id === post.author.id && (
            <VerticalDotsDropdown options={options} />
          )}
        </p>
        <div
          onClick={handleClick}
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
        <p className="text-white">{error.message}</p>
        <div
          onClick={() => getPostById(id!)}
          className="mt-12 text-center w-32 cursor-pointer  py-2 border-1 border-border rounded-lg bg-title hover:scale-105 transition-transform duration-200"
        >
          <span className="text-white">Thử lại</span>
        </div>
      </div>
    );
  };

  const renderSideBar = () => {
    return (
      <>
        {isOpenLeftBar && (
          <div className="fixed w-full h-full bg-[rgba(0,0,0,0.7)] z-20" />
        )}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-[#040a16] text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            isOpenLeftBar ? "translate-x-0" : "-translate-x-full"
          } border-r border-r-[#363944]`}
        >
          <div className="flex justify-between items-center p-4 border-b border-white/20">
            <span className="text-lg font-semibold">Tiêu đề</span>
            <div className="flex flex-center">
              <button onClick={() => setOpenLeftBar(false)}>
                <X size={24} color="white" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <TitleList html={post.content} scrollToHeading={scrollToHeading} />
          </div>
        </div>
      </>
    );
  };

  const renderMenuBtn = () => {
    return (
      <div
        onClick={() => setOpenLeftBar(true)}
        className={`fixed bottom-8 left-4 md:hidden cursor-pointerhover:text-active animate-transition z-50 bg-white rounded-full w-8 h-8 flex flex-center`}
      >
        <ChevronRight className="text-white" color="black" />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <>
        {renderMenuBtn()}
        <div className="hidden md:w-[20%] border-r-1 border-border relative flex-1">
          <TitleList html={post.content} scrollToHeading={scrollToHeading} />
        </div>

        <div className="w-full md:w-[80%] pl-4">{renderPreview()}</div>
        <Lightbox
          open={isOpenLightBox}
          close={() => setOpenLightbox(false)}
          slides={imgs}
          carousel={{ finite: true }}
          index={lightBoxIndex}
        />
      </>
    );
  };

  return (
    <div className="flex flex-1 pb-12">
      {isLoading && renderLoading()}
      {!isLoading && !error.isError && renderContent()}
      {!isLoading && error.isError && renderError()}
      {renderModalDelete()}
      {renderSideBar()}
    </div>
  );
};

export default PostDetail;
