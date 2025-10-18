import { useNavigate } from "react-router-dom";
import moment from "moment";

const CategoryItem = ({
  category,
  isLast = false,
}: {
  category: ICategory;
  isLast?: boolean;
}) => {
  const navigate = useNavigate();

  const onClickToCategory = () => {
    navigate(`/category/${category.id}`);
  };

  const onClickToPost = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div
      className={`w-full ${
        !isLast ? "border-b border-gray-700/50 pb-8 mb-8" : "pb-4"
      }`}
    >
      {/* Category Header */}
      <div className="bg-gradient-to-r from-gray-800/40 to-gray-700/20 rounded-xl p-6 mb-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
        <div className="flex gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={category.thumbnail}
                className="w-20 h-20 rounded-xl object-cover shadow-lg"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/ico.png";
                }}
                alt={category.name}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-3">
              <h3
                onClick={onClickToCategory}
                className="text-white font-bold text-xl hover:text-title transition-colors duration-200 cursor-pointer group"
              >
                {category.name}
                <span className="inline-block ml-2 text-title opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  →
                </span>
              </h3>
              <div className="flex items-center gap-3">
                <span className="bg-title/10 text-title px-3 py-1 rounded-full text-xs font-medium">
                  {category.posts?.length || 0} bài viết
                </span>
                <span className="text-gray-400 text-sm">
                  {moment(category.createDate).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>

            {category.description && (
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Posts List */}
      {category.posts && category.posts.length > 0 && (
        <div className="">
          <div className="space-y-2">
            {category.posts.slice(0, 3).map((post, index) => (
              <div
                key={post.id}
                onClick={() => onClickToPost(post.id)}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/20 hover:bg-gray-700/30 transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-600/30"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-title/20 rounded-lg flex items-center justify-center text-title font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-white font-medium text-sm group-hover:text-title transition-colors duration-200 line-clamp-1 mb-1">
                    {post.title}
                  </h5>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {moment(
                        post.updateDate > post.createDate
                          ? post.updateDate
                          : post.createDate
                      ).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg
                    className="w-4 h-4 text-title"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {category.posts.length > 3 && (
            <div className="mt-4">
              <button
                onClick={onClickToCategory}
                className="w-full py-3 px-4 bg-gradient-to-r from-title/10 to-title/5 hover:from-title/20 hover:to-title/10 text-title border border-title/20 hover:border-title/40 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Xem thêm {category.posts.length - 3} bài viết khác</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
