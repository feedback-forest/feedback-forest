import { LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getLectureInfo } from ".";
import { useQuery } from "@tanstack/react-query";

const useLectureInfo = (lectureId: number) => {
  return useQuery({
    queryKey: LECTURE_KEYS.detail({ lectureId }),
    queryFn: () => getLectureInfo(lectureId),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch Entire Class",
    },
  });
};

export default useLectureInfo;
