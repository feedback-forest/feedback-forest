import {
  Lecture,
  LectureTitleEnum,
  lectureSummaryList,
} from "../../model/lecture";

import { LectureSummaryHeader } from "./LectureSummaryHeader";
import { LectureSummaryItem } from ".";
import MiniMap from "@/features/map/ui/MiniMap/MiniMap";
import { Skeleton } from "@/shared/ui";

interface LectureInfoDetail {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureSummary = ({ lectureInfo, isLoading }: LectureInfoDetail) => {
  return (
    <div className="flex flex-col w-full h-full desktop:w-[588px] tablet:w-[400px] max-w-[608px] max-h-[635px] gap-[13px]">
      <LectureSummaryHeader lectureInfo={lectureInfo} isLoading={isLoading} />
      <div className="flex flex-col desktop:w-[588px] desktop:h-[580px]">
        <div className="flex flex-col gap-5">
          {lectureSummaryList.map((lectureSummaryItem) => {
            return (
              <LectureSummaryItem
                key={lectureSummaryItem.type}
                src={lectureSummaryItem.src}
                title={LectureTitleEnum[lectureSummaryItem.type]}
                content={
                  lectureInfo
                    ? lectureSummaryItem.render(
                        lectureInfo[lectureSummaryItem.type],
                      )
                    : ""
                }
              />
            );
          })}
        </div>
      </div>
      {isLoading && <Skeleton className="w-[568px] h-[256px]" />}
      {lectureInfo && (
        <div>
          <MiniMap
            latitude={lectureInfo.latitude}
            longitude={lectureInfo.longitude}
          />
        </div>
      )}
    </div>
  );
};

export default LectureSummary;
