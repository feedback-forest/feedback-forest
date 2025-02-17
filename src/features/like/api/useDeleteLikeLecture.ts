import {
  HOME_LECTURE_KEYS,
  LECTURE_KEYS,
  LIKE_LECTURE_KEYS,
  LOCATION_LECTURE_KEYS,
} from "@/shared/api/keyFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LikeLecture } from "../model/like";
import { deleteLikeLecture } from ".";

const useDeleteLikeLecture = (lectureId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LikeLecture["Request"]["query"]["params"]) =>
      deleteLikeLecture({
        params,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: LECTURE_KEYS.detail({
          lectureId,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: LECTURE_KEYS.list({ location: " ", page: 0, size: 9 }),
      });
      queryClient.invalidateQueries({
        queryKey: HOME_LECTURE_KEYS.list({ page: 0, size: 9 }),
      });
      queryClient.refetchQueries({
        queryKey: LOCATION_LECTURE_KEYS.list({
          location: " ",
          page: 0,
          size: 9,
        }),
      });
      queryClient.refetchQueries({
        queryKey: LIKE_LECTURE_KEYS.lists(),
      });
    },
  });
};

export default useDeleteLikeLecture;
