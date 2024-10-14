import { Divider, Skeleton } from "@/shared/ui";
import {
  Lecture,
  LectureDetailListProps,
  LectureDetailTitleEnum,
  lectureDetailList,
} from "../../model/lecture";

import Image from "next/image";
import { LectureDetailItem } from "./LectureDetailItem";

interface LectureDetailProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureDetail = ({ lectureInfo, isLoading }: LectureDetailProps) => {
  return (
    <div className="flex flex-col w-full desktop:px-[120px] tablet:px-8 mobile:px-6 pb-[349px] desktop:gap-[140px] tablet:gap-[52px] mobile:gap-5">
      <div className="flex flex-col justify-center desktop:w-full tablet:w-[704px] mobile:w-[312px] gap-[30px]">
        <div className="font-bold desktop:w-full h-[70px] desktop:text-[28px] tablet:text-[23px] mobile:text-[23px] border-b border-black content-center">
          클래스 내용
        </div>
        <div className="flex flex-col gap-7">
          {lectureDetailList.map(
            (lectureDetailItem: LectureDetailListProps) => {
              return (
                <div
                  className="flex flex-col gap-7"
                  key={lectureDetailItem.type}
                >
                  <LectureDetailItem
                    title={LectureDetailTitleEnum[lectureDetailItem.type]}
                    content={
                      lectureInfo
                        ? lectureDetailItem.render(
                            lectureInfo[lectureDetailItem.type],
                          )
                        : " "
                    }
                  />
                  <Divider />
                </div>
              );
            },
          )}
          {lectureInfo &&
            lectureInfo.images &&
            lectureInfo.images.map((image) => (
              <div key={image.id} className="w-auto h-auto">
                <Image
                  src={image.url}
                  alt={`${image.id}`}
                  width={1200}
                  height={1000}
                  className="object-cover"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col desktop:w-[1200px] tablet:w-[704px] mobile:w-[312px] gap-[30px]">
        <div className="font-bold content-center desktop:w-full tablet:w-[600px] h-[70px] desktop:text-[28px] tablet:text-[23px] mobile:text-[23px] border-b border-black">
          강사 이력
        </div>
        {isLoading && <Skeleton className="w-[698px] h-[148px]" />}
        {lectureInfo && (
          <div className="flex flex-col gap-1">
            <div className="flex w-full h-8 font-bold desktop:text-xl tablet:text-base mobile:text-base">
              {lectureInfo.instructor_name.map((instructor) => instructor.name)}
            </div>
            <ul className="flex flex-col h-full desktop:text-xl tablet:text-base mobile:text-base">
              {lectureInfo.instructor_name.map((instructor) => {
                return instructor.instructor_history.map((history, idx) => {
                  return <li key={idx}>{history.content}</li>;
                });
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="font-bold desktop:w-[1200px] tablet:w-[704px] mobile:w-[312px] h-[70px] text-[28px] border-b border-black">
        <div className="font-bold content-center desktop:text-[28px] tablet:text-[23px] mobile:text-[23px] gap-4">
          교육 계획
        </div>
        {/* {isLoading && <Skeleton className="w-[698px] h-[148px]" />} */}
        {/* {lectureInfo && <div>{lectureInfo.educationPlan}</div>} */}
      </div>
    </div>
  );
};

export default LectureDetail;
