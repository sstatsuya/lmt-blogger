import { ANIMATIONS } from "../../assets";
import CategoryItem from "./CategoryItem";
import { useEffect, useState } from "react";
import { IError, initError } from "../../services/types";
import Lottie from "lottie-react";
import { getCategories } from "../../services/category";

const PAGE_SIZE = 10;

const Category = () => {
  const [offset, setOffset] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<IError>(initError);
  const [categories, setCategorys] = useState<ICategory[]>([]);

  const getAllCategory = async (offset: number) => {
    try {
      setError(initError);
      setLoading(true);
      const res = await getCategories({
        pageSizeCate: PAGE_SIZE,
        offsetCate: offset,
      });
      setCategorys(res);
      setOffset((p) => p + PAGE_SIZE);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory(offset);
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
      <div className="flex flex-1 flex-col items-center justify-center py-16">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">Có lỗi xảy ra</h3>
          <p className="text-gray-400 mb-6">Không thể tải danh sách danh mục</p>
          <button
            onClick={() => getAllCategory(0)}
            className="px-6 py-2 bg-title hover:bg-title/80 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col pt-16 px-4 max-w-4xl mx-auto w-full">
      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Danh mục</h1>
        <p className="text-gray-400">Khám phá các chủ đề và danh mục bài viết</p>
      </div> */}
      
      {isLoading && renderLoading()}
      
      {!isLoading && !error.isError && categories.length > 0 && (
        <div className="space-y-4">
          {categories.map((i: ICategory, index: number) => (
            <CategoryItem 
              category={i} 
              key={i.id || index} 
              isLast={index === categories.length - 1}
            />
          ))}
        </div>
      )}
      
      {!isLoading && !error.isError && categories.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center py-16">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Chưa có danh mục nào</h3>
            <p className="text-gray-400">Hiện tại chưa có danh mục nào được tạo.</p>
          </div>
        </div>
      )}

      {!isLoading && error.isError && renderError()}
    </div>
  );
};

export default Category;
