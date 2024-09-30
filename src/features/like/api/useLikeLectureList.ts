import { LIKE_LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getClassList } from ".";
import { useQuery } from "@tanstack/react-query";

const useLikeLectureList = () => {
  return useQuery({
    queryKey: LIKE_LECTURE_KEYS.list(),
    queryFn: () => getClassList(),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch Like Lecture List",
    },
  });
};

export default useLikeLectureList;
