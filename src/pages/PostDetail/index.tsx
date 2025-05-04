import { useNavigate } from "react-router-dom"
import { IMAGES } from "../../assets"
import TitleList from "./TitleList"

const FAKE_HTML = `<h2 id="heading-wnxiycql7"><span style="color: #ffffff">Mở bài</span></h2><p><span style="color: #ffffff">Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.</span></p><p><span style="color: #ffffff">Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.<br>Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.</span></p><p><span style="color: #ffffff">Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.</span></p><p></p><h2 id="heading-34cfjdwao"><span style="color: #ffffff">Thân bài</span></h2><p><span style="color: #ffffff">Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.</span></p><p><span style="color: #ffffff">Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.</span></p><p><span style="color: #ffffff">Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.</span></p><p><span style="color: #ffffff">Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.</span></p><p><span style="color: #ffffff">Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.</span></p><p></p><h2 id="heading-37ppxalcc"><span style="color: #ffffff">Kết bài</span></h2><p><span style="color: #ffffff">Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.

Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.

Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.

Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.

Về vấn đề nhập cư, tôi đồng tình với chính sách của ông Trump. Tôi tin rằng ai cũng có quyền đến Mỹ để tìm kiếm cơ hội tốt hơn, nhưng họ cần tuân thủ đúng quy định và đến đây bằng con đường hợp pháp", Bùi Hải, người làm trong lĩnh vực nghiên cứu ở bang Michigan, nói với VnExpress.</span></p>`

const PostDetail = () => {

    const scrollToHeading = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 120; // trừ 40px
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const renderPreview = () => {
        return <div
            className="px-4 bg-transparent text-black rounded prose prose-invert max-w-none preview-container"
            dangerouslySetInnerHTML={{ __html: FAKE_HTML }} // Hiển thị HTML của editor
        />
    }

    return <div className="flex flex-1 pb-12">
        <div className="w-[20%] border-r-1 border-border relative flex-1">
            <TitleList html={FAKE_HTML} scrollToHeading={scrollToHeading} />
        </div>
        <div className="w-[80%] pl-4">{renderPreview()}</div>
    </div>
}

export default PostDetail

