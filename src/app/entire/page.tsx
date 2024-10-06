"use client";

import {
  LectureInfo,
  LecturePayload,
  LectureSize,
} from "@/entities/lecture/model/lecture";
import { LectureList, SkeletonCard } from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useLectureList from "@/entities/lecture/api/useLectureList";
import useLoginedUserStore from "@/shared/store/user";

const EntirePage = () => {
  const [lectureListData, setLectureListData] = useState<LectureInfo[]>();
  const [user, setUser] = useState<LecturePayload>();
  const [lectureSize, setLectureSize] = useState<LectureSize>({
    page: 0,
    size: 9,
    dist: 500,
  });

  const getLectureList = useLectureList();
  const isLoading = getLectureList.isIdle || getLectureList.isPending;

  const geolocation = useGeoLocation();

  useEffect(() => {
    if (user && user.latitude && user.longitude) {
      getLectureList.mutate(
        {
          params: {
            page: lectureSize.page,
            size: lectureSize.size,
            dist: lectureSize.dist,
          },
          payload: { latitude: user.latitude, longitude: user.longitude },
        },
        {
          onSuccess: (data) => {
            const lectureListData = data.data.data.data;
            setLectureListData(lectureListData);
          },
          onError: () => {},
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureSize.page, lectureSize.size, user]);

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

  const renderEntireCardContent = () => {
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

    return <div>클래스가 존재하지 않습니다</div>;
  };

  // TODO: 무한 스크롤

  return (
    <div className="flex flex-col w-full h-screen justify-start items-center p-4 min-h-[336px] pt-20 bg-custom-entireLikeBackground">
      <div className="flex flex-row w-full h-12 items-start justify-center">
        <div className="flex flew-row gap-1">
          <div className="text-gray-900 text-[32px] font-bold">전체 클래스</div>
          <div className="text-gray-900 text-[32px]">한번에 보기</div>
        </div>
      </div>
      <div className="flex flex-col pt-14 pb-[209px]">
        <div className="flex px-[120px]">{renderEntireCardContent()}</div>
      </div>
    </div>
  );
};

export default EntirePage;
