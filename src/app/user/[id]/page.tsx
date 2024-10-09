"use client";

import { Button, InputLabel, UnifiedDialog } from "@/shared/ui";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginUserInfo, PatchUserAddress } from "@/entities/user/model/user";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";

import { InputLabelStatus } from "@/shared/ui/InputLabel/InputLabel";
import { SquareLoader } from "react-spinners";
import axios from "axios";
import { debounce } from "lodash";
import { toast } from "sonner";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useGetLoginUserInfo from "@/entities/user/api/useGetLoginUserInfo";
import useGetLogout from "@/features/authentication/api/usePostLogout";
import usePatchUserAddress from "@/entities/user/api/usePatchUserAddress";
import usePatchUserInfo from "@/entities/user/api/usePatchUserInfo";
import usePostLogout from "@/features/authentication/api/usePostLogout";
import { useRouter } from "next/navigation";
import useValidateNickname from "@/entities/user/api/useValidateNickname";

export const runtime = "edge";

type UserInfoForm = {
  nickname: string;
  address: string;
};

const UserInfoPage = () => {
  const [loginedUser, setLoginedUser] = useState<LoginUserInfo>({
    id: 0,
    email: "",
    nickname: "",
    gender: "male",
    age_range: "",
    birth: "",
    phone_number: "",
    latitude: 0,
    longitude: 0,
    location: "",
  });
  const [user, setUser] = useState<PatchUserAddress["Request"]["body"]>();
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);

  const router = useRouter();
  const accessToken = getCookie("accessToken");
  const geolocation = useGeoLocation();

  const { data, isLoading, isSuccess } = useGetLoginUserInfo();
  const postLogout = usePostLogout();

  const validateNickname = useValidateNickname();
  const patchUserAddress = usePatchUserAddress();
  const patchUserInfo = usePatchUserInfo();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useForm<UserInfoForm>({
    defaultValues: {
      nickname: data?.data.data.nickname,
      address: data?.data.data.location,
    },
  });

  const [status, setStatus] = useState<InputLabelStatus>("default");
  const [message, setMessage] = useState<string>("");

  const validationCheckNickname = debounce((nickname: string) => {
    validateNickname.mutate(
      { nickname },
      {
        onSuccess: (data) => {
          const validateCheck = data.data;
          if (validateCheck && validateCheck.status === 200) {
            clearErrors("nickname"); // 유효성 검사 성공 시 에러 지우기
            setStatus("correct");
            setMessage("사용 가능한 닉네임입니다.");
          }
        },
        onError: (error) => {
          console.error(error);
          if (axios.isAxiosError(error)) {
            const errorMessage =
              error.response?.data?.message || "서버 오류가 발생했습니다.";
            setError("nickname", {
              type: "manual",
              message: errorMessage,
            });
            setStatus("error");
          } else {
            setError("nickname", {
              type: "manual",
              message: "알 수 없는 오류가 발생했습니다.",
            });
          }
        },
      },
    );
  }, 500);

  const handleChangeNickname = (nickname: string) => {
    validationCheckNickname(nickname);
  };

  const updateCurrentPosition = () => {
    if (user) {
      patchUserAddress.mutate(
        {
          latitude: user.latitude,
          longitude: user.longitude,
        },
        {
          onSuccess: (data) => {
            setValue("address", data.data.data.address);
          },
        },
      );
    }
  };

  const updateUserInfo: SubmitHandler<UserInfoForm> = (data) => {
    patchUserInfo.mutate(
      {
        address: data.address,
        nickname: data.nickname,
      },
      {
        onSuccess: () => {
          toast("유저 정보 업데이트가 성공적으로 됐어요.");
          window.location.reload();
        },
      },
    );
  };

  const logout = () => {
    postLogout.mutate(undefined, {
      onSuccess: () => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        toast("로그아웃 성공");
        router.push("/");
      },
    });
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (data && isSuccess) {
      setLoginedUser(data.data.data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (
      geolocation.curLocation &&
      geolocation.curLocation.latitude &&
      geolocation.curLocation.longitude
    ) {
      setUser((prev) => {
        return {
          ...prev,
          latitude: geolocation.curLocation
            ? geolocation.curLocation.latitude
            : 0,
          longitude: geolocation.curLocation
            ? geolocation.curLocation.longitude
            : 0,
        };
      });
    }
  }, [geolocation.curLocation]);

  const triggerItem = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="flex justify-center items-center text-center desktop:w-[400px] tablet:w-[300px] mobile:w-[200px] max-w-[400px] h-14 bg-white hover:bg-gray-300 text-custom-textGrayColor text-xl font-semibold rounded-lg border border-custom-disabled">
          로그아웃
        </div>
      </div>
    );
  };

  const dialogContent = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-[69px]">
        <div className="text-xl font-semibold">로그아웃 하시겠어요?</div>
        <div className="flex flex-row gap-2.5">
          <div>
            <Button
              variant="outline"
              className="w-[125px] h-[52px] text-base font-semibold"
              onClick={() => setOpenLogoutDialog(false)}
            >
              취소
            </Button>
          </div>
          <div>
            <Button
              className="w-[125px] h-[52px] bg-custom-purple hover:bg-purple-950 text-base font-semibold"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <SquareLoader color="#4F118C" />
      </div>
    );
  }

  return (
    loginedUser && (
      <div className="flex flex-col w-full h-full justify-start items-star pt-[79px] gap-[51px] pb-80">
        <div className="flex flex-row justify-center items-center h-14 px-[120px]">
          <div className="text-[32px]">마이페이지</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-14">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="font-bold text-2xl ">
                {loginedUser.nickname}님
              </div>
              {/* TODO: 연령대, 주소 조건문 처리 */}
              <div className="text-lg text-gray-500">
                {loginedUser.age_range}대, {loginedUser.location}
              </div>
            </div>
          </div>
          <form
            className="flex flex-col h-full gap-14"
            onSubmit={handleSubmit(updateUserInfo)}
          >
            <div className="flex flex-col h-full">
              <div className="flex flex-col w-[400px] gap-6">
                <Controller
                  name="nickname"
                  control={control}
                  defaultValue={data?.data.data.nickname}
                  rules={{
                    required: "닉네임은 필수로 작성해주셔야 해요.",
                    minLength: {
                      value: 2,
                      message: "띄어쓰기 없이 2자 ~ 12자까지 가능해요.",
                    },
                    maxLength: {
                      value: 12,
                      message: "닉네임은 최대 12자까지 설정 가능합니다.",
                    },
                  }}
                  render={({ field }) => (
                    <InputLabel
                      labelContent="닉네임 입력"
                      placeholder="띄어쓰기 없이 2자 ~ 12자까지 가능해요."
                      error={!!errors.nickname}
                      onChange={(e) => {
                        field.onChange(e.target.value); // react-hook-form의 onChange 호출
                        handleChangeNickname(e.target.value); // 디바운스된 유효성 검사 호출
                      }}
                      onBlur={field.onBlur}
                      value={field.value}
                      status={status}
                      message={errors.nickname?.message || message} // 메시지 처리
                    />
                  )}
                />
                <div className="flex flex-row gap-4">
                  <Controller
                    name="address"
                    control={control}
                    defaultValue={data?.data.data.location}
                    render={({ field }) => (
                      <InputLabel
                        labelContent="지역"
                        placeholder={
                          loginedUser.location ? loginedUser.location : ""
                        }
                        onChange={(e) => {
                          field.onChange(e.target.value); // react-hook-form의 onChange 호출
                        }}
                        onBlur={field.onBlur}
                        value={field.value}
                      />
                    )}
                  />
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      type="button"
                      className="w-[92px] h-14 bg-custom-buttonGrayBackground hover:bg-gray-300 text-base font-semibold"
                      onClick={updateCurrentPosition}
                    >
                      현재 위치
                    </Button>
                  </div>
                </div>
                <InputLabel
                  labelContent="이메일"
                  placeholder={loginedUser.email}
                  disabled
                />
                <InputLabel
                  labelContent="휴대폰 번호"
                  placeholder={loginedUser.phone_number}
                  disabled
                />
                <InputLabel
                  labelContent="생년월일"
                  placeholder={loginedUser.birth}
                  disabled
                />
                <InputLabel
                  labelContent="성별"
                  placeholder={loginedUser.gender === "male" ? "남성" : "여성"}
                  disabled
                />
              </div>
            </div>
            <div>
              <Button className="w-[400px] h-14 font-semibold text-2xl bg-custom-purple hover:bg-purple-950">
                저장하기
              </Button>
            </div>
          </form>
          <div>
            <UnifiedDialog
              open={openLogoutDialog}
              setOpen={setOpenLogoutDialog}
              triggerItem={triggerItem()}
              dialogTitle="로그아웃 다이얼로그"
              dialogDescription="로그아웃 확인 다이얼로그"
              dialogContent={dialogContent()}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfoPage;
