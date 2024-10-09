"use client";

import { LectureList, SkeletonCard } from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import { BackToPrevious } from "@/shared/ui";
import { HeartsLectureListResDataInfo } from "@/features/like/model/like";
import { LectureSize } from "@/entities/lecture/model/lecture";
import useLikeLectureList from "@/features/like/api/useLikeLectureList";

const LikePage = () => {
  const [lectureListData, setLectureListData] =
    useState<HeartsLectureListResDataInfo[]>();
  const [lectureSize, setLectureSize] = useState<LectureSize>({
    page: 1,
    size: 2,
    dist: 500,
  });

  const { data, isLoading, isSuccess } = useLikeLectureList({
    page: lectureSize.page,
    size: lectureSize.size,
    dist: lectureSize.dist,
  });

  useEffect(() => {
    if (isSuccess) {
      setLectureListData(data.data.data);
    }
  }, [data, isSuccess]);

  const renderLikeCardContent = () => {
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
      return (
        <LectureList lectureListData={lectureListData} type="pickLecture" />
      );
    }

    return <div>클래스가 존재하지 않습니다</div>;
  };

  return (
    <div className="flex flex-col w-full h-full justify-start items-center desktop:pt-20 tablet:pt-10 mobile:pt-10 bg-custom-entireLikeBackground relative">
      <div className="desktop:hidden tablet:flex mobile:hidden absolute top-10 left-4">
        <BackToPrevious />
      </div>
      <div className="flex flex-row w-full h-12 items-start justify-center">
        <div className="flex flew-row gap-3">
          <div className="text-gray-900 text-[32px] font-bold">
            내가 찜한 클래스
          </div>
          <div className="text-gray-900 text-[32px]">한번에 보기</div>
        </div>
      </div>
      <div className="flex flex-col pt-14 pb-[209px]">
        <div className="flex desktop:px-[120px] tablet:px-8 mobile:px-6">
          {renderLikeCardContent()}
        </div>
      </div>
    </div>
  );
};

export default LikePage;
