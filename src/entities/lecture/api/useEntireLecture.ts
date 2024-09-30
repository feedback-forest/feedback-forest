import { LECTURE_KEYS } from "@/shared/api/keyFactory";
import { getEntireLecture } from ".";
import { useQuery } from "@tanstack/react-query";

const useEntireLecture = () => {
  return useQuery({
    queryKey: LECTURE_KEYS.list(),
    queryFn: () => getEntireLecture(),
    select: (response) => response.data,
    meta: {
      errorMessage: "Failed to fetch Entire Lecture",
    },
  });
};

export default useEntireLecture;
