import { LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getLectureList } from ".";
import { useQuery } from "@tanstack/react-query";

const useLectureList = () => {
  return useQuery({
    queryKey: LECTURE_KEYS.list(),
    queryFn: () => getLectureList(),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch Lecture List",
    },
  });
};

export default useLectureList;
