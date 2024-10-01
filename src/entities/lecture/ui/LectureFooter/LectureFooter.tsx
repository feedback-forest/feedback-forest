"use client";

import { Button, IconButton, Skeleton, UnifiedDialog } from "@/shared/ui";

import Image from "next/image";
import { Lecture } from "../../model/lecture";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LectureFooterProps {
  lectureInfo?: Lecture;
  isLoading: boolean;
}

const LectureFooter = ({ lectureInfo, isLoading }: LectureFooterProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const tempApplyStatus = false;
  const router = useRouter();

  const linkToApplyPage = (link: string) => {
    window.open(link);
  };

  const linkToHomePage = () => {
    router.push("/");
  };

  const triggerItem = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="flex justify-center items-center text-center desktop:w-[917px] tablet:w-[560px] mobile:w-[200px]  max-w-[917px] h-14 bg-custom-purple hover:bg-purple-900 text-white text-[22px] font-semibold rounded-lg">
          신청하러 가기
        </div>
      </div>
    );
  };

  const dialogContent = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-[9px]">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-[28px]">신청 페이지를</div>
          <div className="font-bold text-[28px]">불러오지 못했습니다.</div>
        </div>
        <div className="text-base text-custom-textGrayColor">
          데이터가 만료되거나 이용 완료되어 불러오지 못했습니다.
        </div>
        <div>
          <Button
            className="w-[410px] h-14 bg-custom-purple hover:bg-purple-950 text-2xl font-semibold"
            onClick={linkToHomePage}
          >
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  };

  const renderApplyButton = () => {
    if (lectureInfo && lectureInfo.link && tempApplyStatus) {
      return (
        <Button
          className="flex desktop:w-[917px] tablet:w-[560px] mobile:w-[200px]  max-w-[917px] h-14 bg-custom-purple text-[22px] font-semibold"
          onClick={() => linkToApplyPage(lectureInfo.link)}
        >
          신청하러 가기
        </Button>
      );
    }
    return (
      <UnifiedDialog
        open={open}
        setOpen={setOpen}
        triggerItem={triggerItem()}
        dialogTitle="마이페이지"
        dialogDescription="마이페이지 설명"
        dialogContent={dialogContent()}
      />
    );
  };

  return (
    <div className="flex flex-row w-full h-[92px] items-center px-[120px] bg-white drop-shadow fixed bottom-0 gap-[42px] overflow-x-hidden z-10">
      <div className="flex w-16 h-[50px] border-r border-gray-400 justify-center items-center">
        <IconButton
          src="/icons/heart.svg"
          alt="heart"
          iconWidth={27}
          iconHeight={24}
        />
      </div>
      {isLoading && <Skeleton className="w-[100px] h-[33px]" />}
      {lectureInfo && (
        <div className="flex w-[106px] min-w-[106px] h-[33px] justify-center items-center text-[22px] font-extrabold">
          {lectureInfo.price.toLocaleString("ko-KR")}원
        </div>
      )}
      {isLoading && (
        <Skeleton className="desktop:w-[917px] tablet:w-[560px] h-[56px]" />
      )}
      {renderApplyButton()}
    </div>
  );
};

export default LectureFooter;
