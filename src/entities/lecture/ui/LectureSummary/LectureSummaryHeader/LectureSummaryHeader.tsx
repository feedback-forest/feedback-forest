import { Button, IconDialog, ImageDescription, Skeleton } from "@/shared/ui";

import Image from "next/image";
import { Lecture } from "@/entities/lecture/model/lecture";
import { handleCopyClipBoard } from "@/shared/lib/utils";

interface LectureInfoDetailHeaderProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureSummaryHeader = ({
  lectureInfo,
  isLoading,
}: LectureInfoDetailHeaderProps) => {
  const handleLikeLecture = () => {
    // TODO: 좋아요 API
  };

  const shareLinkToKakao = () => {
    // TODO: 카카오 링크 공유하기 API
  };

  const shareLinkToURL = () => {
    if (lectureInfo) {
      handleCopyClipBoard(lectureInfo.link);
    }
  };

  const renderDialogContent = () => {
    return (
      <div className="flex flex-row items-center justify-center py-[102px] gap-5">
        <ImageDescription
          containerWidth={180}
          containerHeight={96}
          src="/icons/kakao.svg"
          alt="kakao logo"
          width={60}
          height={60}
          imageDescription="카카오톡 공유하기"
          handleClick={shareLinkToKakao}
        />
        <ImageDescription
          containerWidth={180}
          containerHeight={96}
          src="/icons/Copy_link.svg"
          alt="copy_link"
          width={60}
          height={60}
          imageDescription="링크 복사하기"
          handleClick={shareLinkToURL}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-[42px] gap-2">
      <div className="flex flex-row gap-7">
        {isLoading && <Skeleton className="w-[430px] h-[42px]" />}
        {lectureInfo && (
          <div className="flex justify-start items-center text-2xl desktop:w-[430px] tablet:w-[300px] tablet:text-ellipsis tablet:whitespace-nowrap tablet:overflow-hidden h-[42px] font-bold">
            {lectureInfo.name}
          </div>
        )}
        <div className="flex justify-center items-center gap-7">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={handleLikeLecture}
          >
            <Image src="/icons/heart.svg" alt="heart" width={27} height={24} />
          </Button>
          <IconDialog
            dialogTitle="링크 공유"
            dialogDescription="링크 공유용 모달"
            renderItem={renderDialogContent()}
          />
        </div>
      </div>
    </div>
  );
};

export default LectureSummaryHeader;
