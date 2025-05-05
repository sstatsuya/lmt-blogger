// src/layouts/MainLayout.tsx
import React, { useEffect, useState } from "react";
import { IMAGES } from "../assets";
import * as actions from "../redux/actions";
import { ClipLoader } from "react-spinners";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: any = useDispatch();
  const profile = useSelector((state: RootReducerType) => state.profileReducer);
  console.log("tien xem profile ", profile);
  const [isVerifying, setVerifying] = useState(false);

  const verifyUser = async () => {
    try {
      (window as any).props.showLoading();
      setVerifying(true);
      const userInfo: IUserInfo = await dispatch(actions.getUserInfo());
      console.log("tien xem userInfo ", userInfo);
    } catch (error) {
    } finally {
      (window as any).props.hideLoading();
      setVerifying(false);
    }
  };

  // Làm thanh scroll ngang
  useEffect(() => {
    // Lấy thông tin user
    verifyUser();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / documentHeight) * 100;

      //@ts-ignore
      document.getElementById(
        "progress-fill"
      ).style.width = `${scrollPercent}%`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderLoginBtn = () => {
    if (isVerifying)
      return (
        <ClipLoader
          color={Colors.title}
          loading={true}
          size={24}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      );
    if (!profile.id)
      return (
        <div
          onClick={() => navigate(APP_ROUTE.LOGIN)}
          className={`  ${
            location.pathname === APP_ROUTE.LOGIN ? "text-title" : "text-white"
          } hover:text-title animate-transition`}
        >
          Đăng nhập
        </div>
      );
    else
      return (
        <div
          className={`${
            location.pathname === APP_ROUTE.LOGIN ? "text-title" : "text-white"
          } `}
        >
          {"Xin chào"}
          <span className="text-title font-bold text-lg ml-2">
            {profile.fullname}
          </span>
        </div>
      );
  };

  const renderLogo = () => {
    return (
      <div className="">
        <a href="/">
          <img src={IMAGES.LOGO} className="w-24 h-12" />
        </a>
      </div>
    );
  };

  const renderUtilities = () => {
    return (
      <div className="flex-between gap-8">
        <div className="hidden sm:flex min-w-48 hover:bg-hover group transition-all duration-200 ease-in-out cursor-pointer flex-between px-2 py-1.5 border-1 border-border rounded-md">
          <p className="text-plhd text-sm pl-2 group-hover:text-white transition-all ease-in-out duration-200">
            Search...
          </p>
          <div className="bg-highlight flex-center text-xs rounded-sm p-0.5 group-hover:bg-transparent group-hover:text-white duration-200 transition-all ease-in-out">
            ⌘K
          </div>
        </div>

        <div
          onClick={() => navigate(APP_ROUTE.POST)}
          className={`cursor-pointer ${
            location.pathname === APP_ROUTE.POST ? "text-title" : "text-white"
          } hover:text-title animate-transition`}
        >
          Bài viết
        </div>

        <div
          onClick={() => navigate(APP_ROUTE.CREATE_POST)}
          className={`cursor-pointer ${
            location.pathname === APP_ROUTE.CREATE_POST
              ? "text-title"
              : "text-white"
          } hover:text-title animate-transition`}
        >
          Tạo bài viết
        </div>

        {renderLoginBtn()}

        <UtilityBtn
          icon={
            <MoonOutlined style={{ fontSize: "18px" }} className="text-white" />
          }
        />
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="w-full bg-footer p-8 text-center">
        <p className="text-white">© 2025 LMT. All Rights Reserved.</p>
      </div>
    );
  };

  const isSignInPage = location.pathname === APP_ROUTE.LOGIN;

  return (
    <div className={"flex flex-col w-full"}>
      <div
        className={`flex flex-col min-h-screen relative ${
          isSignInPage ? "" : "xl:px-[20%] px-[5%]"
        }`}
      >
        {!isSignInPage && (
          <>
            <div
              id="progress-bar"
              className="fixed top-0 left-0 w-full h-1 bg-transparent z-30"
            >
              <div
                id="progress-fill"
                className="h-full bg-title"
                style={{ width: "0%" }}
              ></div>
            </div>
            <div className="sticky top-0 bg-primary z-20 py-10 flex justify-between items-center w-full h-16 px-4">
              {renderLogo()}
              {renderUtilities()}
            </div>
          </>
        )}
        {children}
      </div>
      {renderFooter()}
    </div>
  );
};

export default MainLayout;

import { GithubOutlined, MoonOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTE } from "../App";
import { IUserInfo } from "../services/types";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";
import { Spinner } from "../components";
import { Colors } from "../utils";

const UtilityBtn = ({ icon }: { icon: any }) => {
  return (
    <div className="p-2 cursor-pointer group rounded-md hover:bg-hover flex-center transition-all duration-200 ">
      {icon}
    </div>
  );
};
