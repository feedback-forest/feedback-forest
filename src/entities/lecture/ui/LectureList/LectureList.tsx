import { Lecture } from "@/entities/lecture/model/lecture";
import { LectureCard } from "../LectureCard";

interface LectureListProps {
  lectureListData: Lecture[];
  type: "row" | "col";
}

const LectureList = ({ lectureListData, type }: LectureListProps) => {
  return type === "col" ? (
    <div className="w-full grid grid-cols-3 gap-6 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
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
  ) : (
    <div className="w-full grid grid-cols-2 gap-6 mobile:grid-cols-1 tablet:grid-cols-1 desktop:grid-cols-2 pb-[265px]">
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