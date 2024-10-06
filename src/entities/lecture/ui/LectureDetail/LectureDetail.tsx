import { Divider, Skeleton } from "@/shared/ui";
import {
  Lecture,
  LectureDetailTitleEnum,
  lectureDetailList,
} from "../../model/lecture";

import { LectureDetailItem } from "./LectureDetailItem";
import { SquareLoader } from "react-spinners";

interface LectureDetailProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureDetail = ({ lectureInfo, isLoading }: LectureDetailProps) => {
  if (isLoading) {
    return <SquareLoader />;
  }
  return (
    <div className="flex flex-col w-full px-[120px] pb-[349px] gap-[140px]">
      <div className="flex flex-col w-full gap-[30px]">
        <div className="font-bold desktop:w-full h-[70px] text-[28px] border-b">
          클래스 내용
        </div>
        <div className="flex flex-col gap-7">
          {/* TODO: 컴포넌트화 */}
          {lectureDetailList.map((lectureDetailItem) => {
            return (
              <div className="flex flex-col gap-7" key={lectureDetailItem.type}>
                <LectureDetailItem
                  title={LectureDetailTitleEnum[lectureDetailItem.type]}
                  content={
                    lectureInfo
                      ? lectureDetailItem.render(
                          lectureInfo[lectureDetailItem.type],
                        )
                      : ""
                  }
                />
                <Divider />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <div className="font-bold desktop:w-full tablet:w-[600px] h-[70px] text-[28px] border-b">
          강사 이력
        </div>
        {isLoading && <Skeleton className="w-[698px] h-[148px]" />}
        {lectureInfo && (
          <div className="flex flex-col gap-1">
            <div className="flex w-[52px] h-8 font-bold text-xl">
              {lectureInfo.instructor_name.map((instructor) => instructor.name)}
            </div>
            <ul className="flex flex-col h-full text-xl">
              {lectureInfo.instructor_name.map((instructor) => {
                return instructor.instructor_history.map((history, idx) => {
                  return <li key={idx}>{history.content}</li>;
                });
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="font-bold desktop:w-full h-[70px] text-[28px] border-b">
        <div className="font-bold text-[28px] gap-4">교육 계획</div>
        {/* {isLoading && <Skeleton className="w-[698px] h-[148px]" />} */}
        {/* {lectureInfo && <div>{lectureInfo.educationPlan}</div>} */}
      </div>
    </div>
  );
};

export default LectureDetail;
