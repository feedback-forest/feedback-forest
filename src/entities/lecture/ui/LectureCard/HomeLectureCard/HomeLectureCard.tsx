import "moment/locale/ko";

import { Button, UnifiedDialog } from "@/shared/ui";
import { LectureInfo, PickLectureInfo } from "@/entities/lecture/model/lecture";
import { MouseEvent, useEffect, useState } from "react";

import { DisabledHomeLectureCard } from "./DisabledHomeLectureCard";
import { HeartsLectureListResDataInfo } from "@/features/like/model/like";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next";
import moment from "moment";
import { toast } from "sonner";
import useDeleteLikeLecture from "@/features/like/api/useDeleteLikeLecture";
import usePostLikeLecture from "@/features/like/api/usePostLikeLecture";
import { useRouter } from "next/navigation";

moment.locale("ko");

interface HomeLectureCardProps {
  lectureData: LectureInfo | PickLectureInfo | HeartsLectureListResDataInfo;
  type: "homeLecture" | "pickLecture";
}
const HomeLectureCard = (props: HomeLectureCardProps) => {
  const { lectureData, type } = props;

  const {
    id,
    thumbnail,
    name,
    time,
    target,
    status,
    long_address,
    short_address,
    division,
    link,
    heart: initialHeart,
    start_date,
    end_date,
    day_of_week,
  } = lectureData;

  const [dimensions, setDimensions] = useState({ width: 384, height: 280 });
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredFilled, setIsHoveredFilled] = useState(true);
  const [heart, setHeart] = useState(initialHeart);

  const postLikeLecture = usePostLikeLecture(id);
  const deleteLikeLecture = useDeleteLikeLecture(id);

  const router = useRouter();
  const token = getCookie("accessToken");

  const dateString = start_date.replaceAll("-", ".");

  // Moment 객체 생성
  const date = moment(dateString, "YYYY.MM.DD");

  // 요일 가져오기 (예: "요일" 표시)
  const shortDayOfWeek = date.format("ddd"); // 짧은 요일 이름 (예: "Wed")

  useEffect(() => {
    setHeart(initialHeart);
  }, [initialHeart]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDimensions({ width: 240, height: 168 });
      } else if (window.innerWidth < 1440) {
        setDimensions({ width: 280, height: 188 });
      } else {
        setDimensions({ width: 384, height: 280 });
      }
    };

    window.addEventListener("resize", handleResize);

    // 초기 크기 설정
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const linkToLogin = () => {
    setOpenLoginDialog(false);
    router.push("/login");
  };

  const handleLikeClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!token) {
      // DIALOG OPEN
      setOpenLoginDialog(true);
      return;
    }
    if (heart === true) {
      setHeart(false);
      deleteLikeLecture.mutate(
        {
          lectureId: id,
        },
        {
          onSuccess: () => {},
          onError: () => {
            setHeart(true);
          },
        },
      );
    }
    if (heart === false) {
      setHeart(true);
      postLikeLecture.mutate(
        {
          lectureId: id,
        },
        {
          onSuccess: () => {},
          onError: () => {
            setHeart(false);
          },
        },
      );
    }
  };

  const triggerItem = () => {
    return (
      <div
        className="flex items-center justify-center desktop:w-[36px] tablet:w-[36px] mobile:w-[36px] desktop:h-[32px] tablet:h-[24px] mobile:h-[24px] hover:bg-transparent"
        onClick={(e) => handleLikeClick(e)}
      >
        {heart ? (
          <Image
            className="home-lecture-card-like-filled-btn"
            src={isHoveredFilled ? "/icons/like_filled.svg" : "/icons/like.svg"}
            alt="heart"
            width={36}
            height={36}
          />
        ) : (
          <Image
            className="home-lecture-card-like-btn"
            src={isHovered ? "/icons/like_filled.svg" : "/icons/like.svg"}
            alt="heart"
            width={36}
            height={36}
          />
        )}
      </div>
    );
  };

  const dialogContent = () => {
    return (
      <div className="flex flex-col desktop:gap-[55px] tablet:gap-5 mobile:gap-5 desktop:pt-[35px] tablet:pt-5 mobile:pt-5">
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-xl content-center">
            로그인이 필요한
          </div>
          <div className="font-bold text-xl content-center">서비스에요</div>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="flex items-center justify-center w-full h-[52px] text-base font-semibold bg-custom-purple hover:bg-custom-hoverPurple rounded text-white cursor-pointer"
            onClick={linkToLogin}
          >
            회원가입 / 로그인 하기
          </div>
        </div>
      </div>
    );
  };

  if (lectureData.status === false) {
    return <DisabledHomeLectureCard lectureData={lectureData} />;
  }

  return (
    <Link
      href={`/class/${id}`}
      className="desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[468px] tablet:h-[343px] mobile:h-[323px]"
    >
      <div className="flex flex-col desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[468px] tablet:h-[343px] mobile:h-[323px] bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="relative desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[280px] tablet:h-[188px] mobile:h-[168px]">
              <Image
                src={thumbnail}
                alt="thumbnail"
                width={dimensions.width}
                height={dimensions.height}
                className="object-cover desktop:w-[384px] tablet:w-[280px] mobile:w-[240px] desktop:h-[280px] tablet:h-[188px] mobile:h-[168px]"
              />
              <div className="flex items-center justify-center absolute top-3 left-3 desktop:w-16 tablet:w-[52px] mobile:w-[52px] desktop:h-[34px] tablet:h-[27px] mobile:h-[27px] rounded-sm bg-custom-purple content-center text-white text-base font-semibold">{`문화`}</div>
              <div
                className="absolute top-3 right-3"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <UnifiedDialog
                  dialogTitle="로그인 오류"
                  dialogDescription="로그인 오류 Dialog"
                  triggerItem={triggerItem()}
                  dialogContent={dialogContent()}
                  open={openLoginDialog}
                  setOpen={setOpenLoginDialog}
                />
              </div>
            </div>
            <div className="flex flex-col desktop:px-[22px] tablet:px-4 mobile:px-4 desktop:py-5 tablet:pt-3 tablet:pb-[14px] mobile:pt-3 mobile:pb-[14px] desktop:gap-7 tablet:gap-[14px] mobile:gap-[14px]">
              <div className="flex flex-col desktop:w-[340px] tablet:w-[248px] desktop:h-[93px] tablet:h-[67px]">
                <div className="flex flex-col gap-1">
                  <div className="text-custom-textGrayColor desktop:text-lg tablet:text-sm mobile:text-sm desktop:font-bold tablet:font-medium mobile:font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                    {division}
                  </div>
                  <div className="flex justify-between items-center desktop:w-[340px] tablet:w-[248px] mobile:w-[208px]">
                    <div className="text-custom-textBlackColor desktop:text-2xl tablet:text-base mobile:text-base font-semibold desktop:w-[340px] tablet:w-[248px] mobile:w-[208px] min-w-[208px] max-w-[340px] desktop:min-h-[62px] tablet:min-h-[42px] mobile:min-h-[42px] text-ellipsis line-clamp-2">
                      {name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex desktop:flex-row tablet:flex-col mobile:flex-col desktop:justify-between desktop:w-[340px] tablet:w-[248px] mobile:w-[208px] desktop:h-[27px] tablet:h-[48px] mobile:h-[48px]">
                {/* FIXME: 색상 추가 */}
                <div className="text-custom-textGrayColor desktop:text-lg tablet:text-base mobile:text-base desktop:font-semibold tablet:font-medium mobile:font-medium">
                  {short_address}
                </div>
                <div className="text-custom-textGrayColor desktop:text-lg tablet:text-base mobile:text-base desktop:font-bold tablet:font-medium mobile:font-medium ">
                  {start_date.replaceAll("-", ".").split(".")[1]}.
                  {start_date.replaceAll("-", ".").split(".")[2]}
                  {`(${shortDayOfWeek})`}{" "}
                  {Number(time.split(":")[0]) / 12 ? "오후" : "오전"}{" "}
                  {Number(time.split(":")[0]) % 12}:
                  {time.split(":")[1].slice(0, 2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeLectureCard;
