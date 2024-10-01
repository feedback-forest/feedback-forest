import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { USER_KEYS } from "@/shared/api/keyFactory";
import { postLogin } from ".";

const usePostKakaoCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { code: string }) => postLogin({ payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.lists() });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default usePostKakaoCode;
