import { useNavigate } from "react-router-dom";
import { IPost } from "../../services/types";
import moment from "moment";

const PostItem = ({ post }: { post: IPost }) => {
  console.log("tien xem avatar ", post.author.avatar);
  const navigate = useNavigate();

  const onClickToPost = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="w-full flex gap-4 border-b-1 border-b-gray-500 pb-4 mb-4">
      <div>
        <img src={post.author.avatar} className="w-12 h-12 rounded-full" />
      </div>
      <div>
        <div className="cursor-pointer w-full flex">
          <p className="text-white font-semibold text-sm">
            {post.author.fullname}
          </p>
          <p className="text-gray-400 text-sm ml-4">
            {moment(post.createDate).format("hh:mm DD/MM/YYYY")}
          </p>
        </div>

        <p
          onClick={() => onClickToPost()}
          className="cursor-pointer animate-transition mt-1 text-white hover:text-title"
        >
          {post.title}
        </p>
      </div>
    </div>
  );
};

export default PostItem;
