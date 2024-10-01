"use client";

import { LectureList, SkeletonCard } from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import { Lecture } from "@/entities/lecture/model/lecture";
import useEntireLecture from "@/entities/lecture/api/useEntireLecture";

const EntirePage = () => {
  const [lectureListData, setLectureListData] = useState<Lecture[]>();

  // TODO: 전체 클래스 가져오는 API로 수정 필요
  const { data, isLoading, isSuccess } = useEntireLecture();

  useEffect(() => {
    if (isSuccess) {
      setLectureListData(data.data.data);
    }
  }, [data, isSuccess]);

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
