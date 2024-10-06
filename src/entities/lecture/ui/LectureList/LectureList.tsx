import { LectureInfo, PickLectureInfo } from "@/entities/lecture/model/lecture";

import { HeartsLectureListResDataInfo } from "@/features/like/model/like";
import { LectureCard } from "../LectureCard";

interface LectureListProps {
  lectureListData:
    | LectureInfo[]
    | PickLectureInfo[]
    | HeartsLectureListResDataInfo[];
  type: "row" | "col";
}

const LectureList = ({ lectureListData, type }: LectureListProps) => {
  const setClassNameByType = () => {
    if (type === "col") {
      return `w-full grid grid-cols-3 gap-6 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3`;
    }
    return `w-full grid grid-cols-2 gap-6 mobile:grid-cols-1 tablet:grid-cols-1 desktop:grid-cols-2 pb-[265px]`;
  };

  return (
    <div className={setClassNameByType()}>
      {lectureListData.map((lectureData) => {
        return (
          <LectureCard
            key={lectureData.id}
            lectureData={lectureData}
            type={type}
          />
        );
      })}
    </div>
  );
};

export default LectureList;
