import { IMAGES } from "../../assets"

const PostItem = () => {
    return <div className="w-full flex gap-4 border-b-1 border-b-gray-500 pb-4 mb-4">
        <div>
            <img src={IMAGES.AVATAR} className="w-12 h-12 rounded-full" />
        </div>
        <div>
            <div className="cursor-pointer w-full flex">
                <p className="text-white font-semibold text-sm">Lương Minh Tiến</p>
                <p className="text-gray-400 text-sm ml-4">8h00 03/05/2025</p>
            </div>

            <p className="cursor-pointer animate-transition mt-1 text-white hover:text-title">Nghiên cứu chiến lược xây dựng Backlink hiệu quả cho website mới: Góc nhìn từ thực tiễn SEO White Hat</p>
        </div>
    </div>
}

export default PostItem