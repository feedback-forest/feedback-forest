"use client";

import { LectureList, SkeletonCard } from "@/entities/lecture/ui";
import { useCallback, useEffect, useState } from "react";

import { Lecture } from "@/entities/lecture/model/lecture";
import useLikeLectureList from "@/features/like/api/useLikeLectureList";

const LikePage = () => {
  const [lectureListData, setLectureListData] = useState<Lecture[]>();
  const { data, isLoading, isSuccess } = useLikeLectureList();

  const handleLikeLectureDataList = useCallback(() => {
    if (data) {
      const likeLectureData = data;
      // FIXME: 수정
      setLectureListData(likeLectureData);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      handleLikeLectureDataList();
    }
  }, [handleLikeLectureDataList, isSuccess]);

  return (
    <div className="flex flex-col w-full h-screen justify-start items-center p-4 min-h-[336px] pt-20 bg-[#E9E8EC]">
      <div className="flex flex-row w-full h-12 items-start justify-center">
        <div className="flex flew-row gap-1">
          <div className="text-gray-900 text-[32px] font-bold">
            내가 찜한 클래스
          </div>
          <div className="text-gray-900 text-[32px]">한번에 보기</div>
        </div>
      </div>
      <div className="flex flex-col pt-14 pb-[209px]">
        <div className="flex px-[120px]">
          {isLoading ? (
            <div className="flex flex-row space-x-6">
              <SkeletonCard type="col" />
              <SkeletonCard type="col" />
              <SkeletonCard type="col" />
            </div>
          ) : lectureListData && isSuccess ? (
            <LectureList lectureListData={lectureListData} type="col" />
          ) : (
            <div>클래스가 존재하지 않습니다</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikePage;
