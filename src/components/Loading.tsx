import { ANIMATIONS } from "../assets";
import Lottie from "lottie-react";

const Loading = () => {
  return (
    <div
      style={{ zIndex: 1000 }}
      className="fixed flex-center top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60"
    >
      <Lottie style={{width: 180, height: 180}} animationData={ANIMATIONS.LOADING} loop={true} autoplay={true} />
    </div>
  );
};

export default Loading;
