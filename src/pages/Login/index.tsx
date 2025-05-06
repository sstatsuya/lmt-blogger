import { useLocation, useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets";
import { IUserInfo } from "../../services/types";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { useState } from "react";
import { Toast } from "../../utils";
import { Eye, EyeOff } from "lucide-react";
import { APP_ROUTE } from "../../App";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo;
  const dispatch: any = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setShowPassword] = useState(false);
  const onLogin = async () => {
    try {
      (window as any).props.showLoading();
      const userInfo: IUserInfo = await dispatch(
        actions.login({ username, password })
      );
      if (redirectTo) navigate(redirectTo);
      else navigate(APP_ROUTE.HOME);
    } catch (error: any) {
      Toast.show({ text: error.message });
      console.log("tien xem error ", error.message);
    } finally {
      (window as any).props.hideLoading();
    }
  };

  return (
    <div className="bg-red-500 flex flex-col lg:flex-row flex-1">
      <div className="flex flex-1 bg-primary flex-center">
        <img src={IMAGES.MAN} className="w-[50%] lg:w-[80%] aspect-auto" />
      </div>
      <div className="flex flex-1 flex-col bg-footer justify-center">
        <div className="w-full h-full px-8 flex flex-col justify-center">
          <p className="font-semibold text-2xl text-white">Đăng nhập đi nào</p>
          <p className="text-sm mt-1 text-gray-300">
            Lưu ý chỉ có LMT mới đăng nhập được nha!
          </p>

          <div className="mt-6">
            <div className="w-full p-2 border-1 border-border border-l-4 border-l-title">
              <p className="text-sm text-gray-400">Tên đăng nhập</p>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="text-sm w-full bg-transparent mt-0 outline-none border-b border-border text-white"
              />
            </div>
            <div className="w-full p-2 border-1 border-border border-l-4 border-l-title">
              <div className="w-full flex items-center">
                <p className="text-sm text-gray-400">Mật khẩu</p>
                {!isShowPassword && (
                  <Eye
                    onClick={() => setShowPassword((p) => !p)}
                    size={18}
                    className="text-white ml-2 cursor-pointer"
                  />
                )}
                {isShowPassword && (
                  <EyeOff
                    onClick={() => setShowPassword((p) => !p)}
                    size={18}
                    className="text-white ml-2 cursor-pointer"
                  />
                )}
              </div>
              <input
                type={isShowPassword ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="text-sm w-full bg-transparent mt-0 outline-none border-b border-border text-white"
              />
            </div>
          </div>

          <div
            onClick={() => onLogin()}
            className="w-full py-2 bg-title text-white font-semibold text-center rounded-lg mt-4 cursor-pointer hover:opacity-80 transition-all duration-500"
          >
            Vào thôi!
          </div>

          <div
            onClick={() => navigate("/")}
            className="text-sm w-full py-2  text-white underline text-center rounded-lg mt-4 cursor-pointer hover:opacity-80 transition-all duration-500"
          >
            Trở về
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
