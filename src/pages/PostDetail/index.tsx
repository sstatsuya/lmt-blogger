import { useNavigate } from "react-router-dom"
import { IMAGES } from "../../assets"
import TitleList from "./TitleList"

const FAKE_HTML = `<h3>Giới thiệu</h3><p>Hello tôi là Tiến</p><p>Đây là bài viết test nha</p><p>Việt Nam giao thiệp và trao công hàm phản đối, sau khi Trung Quốc, Philippines có các hoạt động vi phạm chủ quyền với đá Hoài Ân và các thực thể liên quan ở Trường Sa.</p><p>"Việc các bên liên quan cho người lên thực thể thuộc chủ quyền của Việt Nam mà không được sự cho phép của Việt Nam là hành vi xâm phạm chủ quyền của Việt Nam", phát ngôn viên Bộ Ngoại giao Phạm Thu Hằng hôm nay cho biết, khi được hỏi về hoạt động của Trung Quốc và Philippines tại khu vực đá Hoài Ân, đá Tri Lễ và đá Cái Vung thuộc quần đảo Trường Sa.</p><p></p><p>Việt Nam giao thiệp và trao công hàm phản đối, sau khi Trung Quốc, Philippines có các hoạt động vi phạm chủ quyền với đá Hoài Ân và các thực thể liên quan ở Trường Sa.</p><p>"Việc các bên liên quan cho người lên thực thể thuộc chủ quyền của Việt Nam mà không được sự cho phép của Việt Nam là hành vi xâm phạm chủ quyền của Việt Nam", phát ngôn viên Bộ Ngoại giao Phạm Thu Hằng hôm nay cho biết, khi được hỏi về hoạt động của Trung Quốc và Philippines tại khu vực đá Hoài Ân, đá Tri Lễ và đá Cái Vung thuộc quần đảo Trường Sa.</p><p></p><p></p><h3><span style="color: #ffffff">Thân bài</span></h3><p>Việt Nam giao thiệp và trao công hàm phản đối, sau khi Trung Quốc, Philippines có các hoạt động vi phạm chủ quyền với đá Hoài Ân và các thực thể liên quan ở Trường Sa.</p><p>"Việc các bên liên quan cho người lên thực thể thuộc chủ quyền của Việt Nam mà không được sự cho phép của Việt Nam là hành vi xâm phạm chủ quyền của Việt Nam", phát ngôn viên Bộ Ngoại giao Phạm Thu Hằng hôm nay cho biết, khi được hỏi về hoạt động của Trung Quốc và Philippines tại khu vực đá Hoài Ân, đá Tri Lễ và đá Cái Vung thuộc quần đảo Trường Sa.</p><p></p><p>Việt Nam giao thiệp và trao công hàm phản đối, sau khi Trung Quốc, Philippines có các hoạt động vi phạm chủ quyền với đá Hoài Ân và các thực thể liên quan ở Trường Sa.</p><p>"Việc các bên liên quan cho người lên thực thể thuộc chủ quyền của Việt Nam mà không được sự cho phép của Việt Nam là hành vi xâm phạm chủ quyền của Việt Nam", phát ngôn viên Bộ Ngoại giao Phạm Thu Hằng hôm nay cho biết, khi được hỏi về hoạt động của Trung Quốc và Philippines tại khu vực đá Hoài Ân, đá Tri Lễ và đá Cái Vung thuộc quần đảo Trường Sa.</p><p></p><p>Việt Nam giao thiệp và trao công hàm phản đối, sau khi Trung Quốc, Philippines có các hoạt động vi phạm chủ quyền với đá Hoài Ân và các thực thể liên quan ở Trường Sa.</p><p>"Việc các bên liên quan cho người lên thực thể thuộc chủ quyền của Việt Nam mà không được sự cho phép của Việt Nam là hành vi xâm phạm chủ quyền của Việt Nam", phát ngôn viên Bộ Ngoại giao Phạm Thu Hằng hôm nay cho biết, khi được hỏi về hoạt động của Trung Quốc và Philippines tại khu vực đá Hoài Ân, đá Tri Lễ và đá Cái Vung thuộc quần đảo Trường Sa.</p><h3><span style="color: #ffffff">Kết bài</span></h3><p></p><p></p><p>Việt Nam giao thiệp và trao công hàm phản đối, sau khi Trung Quốc, Philippines có các hoạt động vi phạm chủ quyền với đá Hoài Ân và các thực thể liên quan ở Trường Sa.</p><p>"Việc các bên liên quan cho người lên thực thể thuộc chủ quyền của Việt Nam mà không được sự cho phép của Việt Nam là hành vi xâm phạm chủ quyền của Việt Nam", phát ngôn viên Bộ Ngoại giao Phạm Thu Hằng hôm nay cho biết, khi được hỏi về hoạt động của Trung Quốc và Philippines tại khu vực đá Hoài Ân, đá Tri Lễ và đá Cái Vung thuộc quần đảo Trường Sa.</p><p></p>`

const PostDetail = () => {

    const renderPreview = () => {
        return <div
            className="px-4 bg-transparent text-black rounded prose prose-invert max-w-none preview-container"
            dangerouslySetInnerHTML={{ __html: FAKE_HTML }} // Hiển thị HTML của editor
        />
    }

    return <div className="flex pt-4 flex-1">
        <div className="w-[20%] border-r-1 border-border">
            <TitleList html={FAKE_HTML} />
        </div>
        <div className="w-[80%] pl-4 ">{renderPreview()}</div>
    </div>
}

export default PostDetail

