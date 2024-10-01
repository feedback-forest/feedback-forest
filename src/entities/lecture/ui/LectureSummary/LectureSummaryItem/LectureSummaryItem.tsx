import Image from "next/image";
import { Skeleton } from "@/shared/ui";

export interface LectureSummaryItemProps {
  src: string;
  title: string;
  content?: string;
}

const LectureSummaryItem = ({
  src,
  title,
  content,
}: LectureSummaryItemProps) => {
  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-row justify-center items-center gap-2">
        <Image src={src} alt={title} width={28} height={28} />
        <div className="min-w-[38px] text-custom-textGrayColor text-[22px]">
          {title}
        </div>
      </div>
      {content ? (
        <div className="desktop:max-w-[476px] tablet:max-w-[300px] text-[22px] whitespace-nowrap">
          {content}
        </div>
      ) : (
        <Skeleton className="w-[280px] h-[42px]" />
      )}
    </div>
  );
};

export default LectureSummaryItem;
