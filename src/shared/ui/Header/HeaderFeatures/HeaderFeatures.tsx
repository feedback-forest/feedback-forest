"use client";

import { useEffect, useState } from "react";

import { Button } from "../../Button";
import Image from "next/image";
import Link from "next/link";
import { LoginUserInfo } from "@/entities/user/model/user";
import { UnifiedDialog } from "../../UnifiedDialog";
import { getCookie } from "cookies-next";
import useLoginedUserStore from "@/shared/store/user";
import { useRouter } from "next/navigation";

const HeaderFeatures = () => {
  const [loginedUser, setLoginedUser] = useState<LoginUserInfo>();
  const [openLike, setOpenLike] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const router = useRouter();

  const { loginedUser: loginedUserInfo } = useLoginedUserStore();

  const accessToken = getCookie("accessToken");

  const handleOpenLikeDialog = () => {
    setOpenLike(true);
  };

  const handleOpenUserDialog = () => {
    setOpenUser(true);
  };

  const linkToLogin = () => {
    setOpenLike(false);
    setOpenUser(false);
    router.push("/login");
  };

  useEffect(() => {
    if (loginedUserInfo) {
      setLoginedUser(loginedUserInfo);
    }
  }, [loginedUserInfo]);

  const dialogContent = () => {
    return (
      <div className="flex flex-col gap-[19px] py-10">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-[28px] h-[71px] content-center">
            로그인이 필요한 서비스 입니다.
          </div>
          <div
            className="text-custom-textGrayColor text-base underline cursor-pointer"
            onClick={linkToLogin}
          >
            간편 회원가입
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <Button
            className="w-[410px] h-[56px] text-2xl font-semibold bg-custom-purple"
            type="submit"
            onClick={linkToLogin}
          >
            로그인 하기
          </Button>
        </div>
      </div>
    );
  };

  const renderLikeIcon = () => {
    // 개발 편의상 임시 처리
    if (loginedUser && loginedUserInfo && accessToken) {
      return (
        <div>
          <Link href="/like">
            <div className="flex flex-col items-center justify-center w-[38px] h-[52px]">
              <Image
                src={"/icons/heart_default.svg"}
                alt="heart-icons"
                width={28}
                height={28}
              />
              <div className="flex justify-center text-sm text-gray-400">
                찜
              </div>
            </div>
          </Link>
        </div>
      );
    }
    return (
      <UnifiedDialog
        dialogTitle="로그인 오류"
        dialogDescription="로그인 오류 Dialog"
        triggerItem={
          <div
            className="flex flex-col items-center justify-center w-[38px] h-[52px] cursor-pointer"
            onClick={handleOpenLikeDialog}
          >
            <Image
              src={"/icons/heart_default.svg"}
              alt="heart-icons"
              width={28}
              height={28}
            />
            <div className="flex justify-center text-sm text-gray-400">찜</div>
          </div>
        }
        dialogContent={dialogContent()}
        open={openLike}
        setOpen={setOpenLike}
      />
    );
  };

  const renderUserIcon = () => {
    if (
      loginedUser &&
      loginedUserInfo &&
      loginedUserInfo.nickname &&
      accessToken
    ) {
      return (
        <div>
          <Link href={`/user/${loginedUserInfo.nickname}`}>
            <div className="flex flex-col items-center justify-center w-[70px] h-[52px]">
              <Image
                src={"/icons/user_default.svg"}
                alt="user-icons"
                width={28}
                height={28}
              />
              <div className="flex w-[70px] justify-center text-sm text-gray-400">
                마이페이지
              </div>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <UnifiedDialog
        dialogTitle="로그인 오류"
        dialogDescription="로그인 오류 알림"
        triggerItem={
          <div
            className="flex flex-col items-center justify-center w-[70px] h-[52px]"
            onClick={handleOpenUserDialog}
          >
            <Image
              src={"/icons/user_default.svg"}
              alt="user-icons"
              width={28}
              height={28}
            />
            <div className="flex w-[70px] justify-center text-sm text-gray-400">
              마이페이지
            </div>
          </div>
        }
        dialogContent={dialogContent()}
        open={openUser}
        setOpen={setOpenUser}
      />
    );
  };

  return (
    <div className="flex flex-row items-start justify-center gap-2 h-full">
      {renderLikeIcon()}
      {renderUserIcon()}
    </div>
  );
};

export default HeaderFeatures;
