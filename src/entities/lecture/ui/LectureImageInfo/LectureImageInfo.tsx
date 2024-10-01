import Image from "next/image";
import { Lecture } from "../../model/lecture";
import { Skeleton } from "@/shared/ui";

interface LectureImageInfoProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureImageInfo = ({
  lectureInfo,
  isLoading,
}: LectureImageInfoProps) => {
  return (
    <div className="relative flex flex-col desktop:w-[588px] tablet:w-[400px] h-[635px] rounded-xl overflow-hidden">
      {lectureInfo && (
        <div className="absolute top-3 left-3 w-16 h-16 content-center text-center text-white font-bold rounded-full bg-custom-purple">
          문화
        </div>
      )}
      {/* TODO: 몇 일 남았는지 계산하는 로직 필요 */}
      {lectureInfo && (
        <div className="absolute top-3 right-3 w-[79px] h-8 content-center text-center text-white font-semibold rounded-lg bg-custom-textBlackColor">
          7일 남음
        </div>
      )}
      {isLoading && <Skeleton className="w-[588px] h-[588px]" />}
      {lectureInfo && (
        <Image
          src={lectureInfo.thumbnail}
          alt={lectureInfo.name}
          width={588}
          height={588}
          className="w-[588px] h-[588px] object-cover"
        />
      )}
      <div className="flex flex-row desktop:w-[588px] tablet:w-[400px] h-[47px] items-center gap-[2.5px] bg-custom-purple pl-5">
        <div>
          <Image
            src="/icons/map_pin.svg"
            alt="map_pin"
            width={22}
            height={22}
          />
        </div>
        {isLoading && <Skeleton className="w-[356px] h-[28px] z-10" />}
        {/* TODO: 거리 계산 */}
        {lectureInfo && (
          <div className="w-full text-white text-lg font-semibold">
            내 위치에서 1.1km ∙ 대중교통 약 10분 이내
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureImageInfo;
