"use client";

import { Description, LectureList, SkeletonCard } from "@/entities/lecture/ui";
import {
  LectureInfo,
  LectureSize,
  PickLectureInfo,
} from "@/entities/lecture/model/lecture";
import { useEffect, useState } from "react";

import { Button } from "@/shared/ui";
import { LoginUserInfo } from "@/entities/user/model/user";
import Map from "@/features/map/ui/Map/Map";
import MapSkeleton from "@/features/map/ui/MapSkeleton/MapSkeleton";
import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useGetLoginUserInfo from "@/entities/user/api/useGetLoginUserInfo";
import useHomeLectureList from "@/entities/lecture/api/useHomeLectureList";
import useLoginedUserStore from "@/shared/store/user";
import { useRouter } from "next/navigation";

const Home = () => {
  const [lectureListData, setLectureListData] = useState<LectureInfo[]>();
  const [pickLectureListData, sePickLectureListData] =
    useState<PickLectureInfo[]>();
  const [lectureSize, setLectureSize] = useState<LectureSize>({
    page: 0,
    size: 9,
    dist: 500,
  });
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

  const { setLoginedUser: setLoginedUserStore } = useLoginedUserStore();

  const {
    data: loginUserData,
    isLoading: isLoginUserLoading,
    isSuccess: isLoginUserSuccess,
  } = useGetLoginUserInfo();

  const getHomeLectureList = useHomeLectureList();
  const isLoading = getHomeLectureList.isIdle || getHomeLectureList.isPending;

  const geolocation = useGeoLocation();

  const router = useRouter();
  // TODO: 멘토님 확인 필요 console.log("1"); 많이 찍히는 문제

  // FIXME: useEffect 정리 필요
  useEffect(() => {
    if (isLoginUserSuccess) {
      setLoginedUser((prev) => {
        const loginedUserInfo = loginUserData.data.data;
        return {
          ...prev,
          id: loginedUserInfo.id,
          email: loginedUserInfo.email,
          nickname: loginedUserInfo.nickname,
          gender: loginedUserInfo.gender,
          age_range: loginedUserInfo.age_range,
          birth: loginedUserInfo.birth,
          phone_number: loginedUserInfo.phone_number,
          location: loginedUserInfo.location,
        };
      });
    }
  }, [isLoginUserSuccess, loginUserData, setLoginedUserStore]);

  useEffect(() => {
    if (
      geolocation.curLocation &&
      geolocation.curLocation.latitude &&
      geolocation.curLocation.longitude
    ) {
      setLoginedUser((prev) => {
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

  useEffect(() => {
    if (loginedUser.latitude && loginedUser.longitude) {
      getHomeLectureList.mutate(
        {
          params: {
            page: lectureSize.page,
            size: lectureSize.size,
            dist: lectureSize.dist,
          },
          payload: {
            latitude: loginedUser.latitude,
            longitude: loginedUser.longitude,
          },
          // { latitude: 37.4996992, longitude: 127.1169024 },
        },
        {
          onSuccess: (data) => {
            const lectureListData = data.data.data.data;
            const pickLectureListData = data.data.data.pickClasses;
            setLectureListData(lectureListData);
            sePickLectureListData(pickLectureListData);
          },
          onError: () => {},
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureSize.page, lectureSize.size, loginedUser]);

  useEffect(() => {
    setLoginedUserStore(loginedUser);
  }, [loginedUser, setLoginedUserStore]);

  const linkToEntireLecture = () => {
    router.push("/entire");
  };

  const renderColLectureList = () => {
    if (isLoading) {
      return (
        <div className="flex flex-row space-x-6">
          <SkeletonCard type="col" />
          <SkeletonCard type="col" />
          <SkeletonCard type="col" />
        </div>
      );
    }

    if (lectureListData && lectureListData.length > 0) {
      return <LectureList lectureListData={lectureListData} type="col" />;
    }

    return (
      <div className="text-2xl font-semibold">클래스가 존재하지 않습니다</div>
    );
  };

  const renderRowLectureList = () => {
    if (isLoading) {
      return (
        <div className="flex desktop:flex-row tablet:flex-col gap-6">
          <SkeletonCard type="row" />
          <SkeletonCard type="row" />
        </div>
      );
    }

    if (pickLectureListData && pickLectureListData.length > 0) {
      return <LectureList lectureListData={pickLectureListData} type="row" />;
    }

    return (
      <div className="text-2xl font-semibold">클래스가 존재하지 않습니다</div>
    );
  };

  // TODO: 캐러셀
  // TODO: 캐러셀 더 불러오기 상태관리

  return (
    <div className="flex w-full h-full flex-col 16">
      <Description />
      <div className="flex flex-col px-[120px] py-[60px] bg-custom-homeMapBackground gap-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-1">
            <div className="text-3xl font-bold">📍 내 주변 클래스</div>
            <div className="text-3xl">둘러보기</div>
          </div>
          <div className="flex justify-center items-center content-center text-base">
            <Button variant={"outline"} onClick={linkToEntireLecture}>
              더보기
            </Button>
          </div>
        </div>
        {isLoading && <MapSkeleton />}
        {lectureListData && (
          <Map
            latitude={loginedUser.latitude}
            longitude={loginedUser.longitude}
            lectureListData={lectureListData}
          />
        )}
        <div className="flex flex-col gap-5 pt-10">
          <div className="font-semibold text-2xl">
            가장 가까운 순으로 클래스 정보를 보여드릴게요!
          </div>
          <div>{renderColLectureList()}</div>
        </div>
      </div>
      <div className="flex flex-col pb-4 px-[120px] py-[60px] gap-5">
        <div className="flex flex-row gap-1">
          <div className="font-bold text-2xl">시:작 PICK</div>
          <div className="text-2xl">클래스 📌</div>
        </div>
        <div>{renderRowLectureList()}</div>
      </div>
    </div>
  );
};

export default Home;
