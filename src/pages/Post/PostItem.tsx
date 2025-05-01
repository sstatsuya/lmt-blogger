import { IMAGES } from "../../assets"

const PostItem = () => {
    return <div className="w-full flex gap-4">
        <div>
            <img src={IMAGES.AVATAR} className="w-12 h-12 rounded-full" />
        </div>
        <div>
            <div className="cursor-pointer w-full flex flex-center">
                <p className="text-white font-semibold text-sm">Lương Minh Tiến</p>
            </div>
        </div>
    </div>
}

export default PostItem