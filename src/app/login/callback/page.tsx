"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { SquareLoader } from "react-spinners";
import { Suspense } from "react";
import { setCookie } from "cookies-next";
import { toast } from "sonner";
import { useEffect } from "react";
import useGetAccessToken from "@/features/authentication/api/useGetAccessToken";

const LoginCallback = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { data, error, isSuccess, isError } = useGetAccessToken(
    code ? code : "",
  );

  useEffect(() => {
    if (code && data && isSuccess) {
      const accessToken = data.tokenDTO.access_token;
      const refreshToken = data.tokenDTO.refresh_token;

      setCookie("accessToken", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      setCookie("refreshToken", refreshToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      toast("회원가입 / 로그인 성공", {
        description: "시ː니어를 위한 문화생활 플랫폼에 오신 걸 환영합니다!",
      });
      if (data.is_new) {
        router.push("/signup");
      }

      router.push("/");
    }
    if (isError) {
      toast("로그인 실패", {
        description: `${error}`,
      });
    }
  }, [code, data, error, isError, isSuccess, router]);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <SquareLoader color="#4F118C" />
    </div>
  );
};

const LoginCallbackPage = () => {
  return (
    <Suspense>
      <LoginCallback />
    </Suspense>
  );
};

export default LoginCallbackPage;
