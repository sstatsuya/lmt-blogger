import { useNavigate } from "react-router-dom"
import { IMAGES } from "../../assets"
import PostItem from "./PostItem";

const Post = () => {

    const navigation = useNavigate();

    return <div className="flex flex-1 flex-col justify-center">
        <PostItem />
    </div>
}

export default Post