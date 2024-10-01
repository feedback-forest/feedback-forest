"use client";

import {
  LectureDetail,
  LectureFooter,
  LectureImageInfo,
  LectureSummary,
} from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import { Lecture } from "@/entities/lecture/model/lecture";
import useLectureInfo from "@/entities/lecture/api/useLectureInfo";
import { useParams } from "next/navigation";

export const runtime = "edge";

const LectureInfoPage = () => {
  const [lectureInfo, setLectureInfo] = useState<Lecture>();

  const { id } = useParams();
  const { data, isLoading, isSuccess } = useLectureInfo(Number(id));

  useEffect(() => {
    if (isSuccess) {
      setLectureInfo(data);
    }
  }, [data, isSuccess]);

  return (
    <div className="flex flex-col w-full h-full justify-start items-start gap-[60px]">
      <div className="flex flex-row w-full py-4 gap-11 px-[120px]">
        <LectureImageInfo lectureInfo={lectureInfo} isLoading={isLoading} />
        <LectureSummary lectureInfo={lectureInfo} isLoading={isLoading} />
      </div>
      <LectureDetail lectureInfo={lectureInfo} isLoading={isLoading} />
      <LectureFooter lectureInfo={lectureInfo} isLoading={isLoading} />
    </div>
  );
};

export default LectureInfoPage;
