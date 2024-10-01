"use client";

import { Button, Input, InputLabel } from "@/shared/ui";

import { User } from "@/entities/user/model/user";
import { useState } from "react";

export const runtime = "edge";

const UserInfoPage = () => {
  // TODO: 전역 로그인된 유저 정보로 수정
  const [loginedUser, setLoginedUser] = useState<User>({
    id: 1,
    account_email: "jkb2221@gmail.com",
    profile_image:
      "https://avatars.githubusercontent.com/u/33307948?s=400&u=a642bbeb47b47e203f37b47db12d2d92d8f98580&v=4",
    name: "kyubumjang",
    gender: "male",
    age_range: "20~29",
    applied_class: [
      {
        id: 1,
        name: "디지털카메라초급(눈으로 사진찍기)",
        description:
          "컴팩트 카메라부터 DSLR 카메라까지 디지털 카메라에 대해서 이해하고 카메라의 모든 기능을 200% 활용하는데 목적을 둔다 ** 사진입문자를 위한 수업입니다. ** 3개월 동안 사진 완전초보를 벗어날 수 있도록 도와드립니다. **야외수업시 보험가입 필수 (1일 보험료 별도) 보험가입증서 제출 또는 동의서 작성",
        price: 90000,
        day_of_week: "수",
        time: "2024-09-16 18:00:00",
        capacity: 15,
        link: "https://www.songpawoman.org/2024/epit_contents.asp?epit_num=10501042&om=202410&ucode=&period=3",
        location: "서울 송파",
        latitude: 108,
        longitude: 108,
        target: "사진 입문자",
        status: "모집 중",
        thumbnail:
          "https://images.unsplash.com/photo-1601134991665-a020399422e3?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        like: true,
        location_detail: "송파여성문화회관 미디어1실(101호)",
        hosted_by: "송파여성문화회관",
        address: "서울특별시 송파구 백제고분로42길 5",
      },
    ],
    latitude: 37.5059054977082,
    longitude: 127.109788230628,
    city: "서울특별시",
  });

  return (
    loginedUser && (
      <div className="flex flex-col w-full h-full justify-start items-star pt-[79px] gap-[51px] pb-80">
        <div className="flex flex-row justify-center items-center h-14 px-[120px]">
          <div className="text-[32px]">마이페이지</div>
        </div>
        <div className="flex flex-col justify-center items-center gap-14">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="font-bold text-2xl ">{loginedUser.name}님</div>
              {/* TODO: 연령대, 주소 조건문 처리 */}
              <div className="text-lg text-gray-500">
                {loginedUser.age_range}대, {loginedUser.city}
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full">
            {/* TODO: 컴포넌트화 InputLabel */}
            <div className="flex flex-col w-[400px] gap-6">
              <InputLabel
                labelContent="닉네임"
                borderColor="#4F118C"
                placeholder={loginedUser.name}
              />
              <InputLabel
                labelContent="지역"
                borderColor="#4F118C"
                placeholder={loginedUser.city}
                renderItem={
                  <div>
                    <Button
                      variant="ghost"
                      className="w-[92px] h-14 bg-[#F5F5F5] hover:bg-gray-300 text-[#171717] text-base font-semibold"
                    >
                      현재 위치
                    </Button>
                  </div>
                }
              />
              <InputLabel
                labelContent="이메일"
                borderColor="#D4D4D4"
                placeholder={loginedUser.account_email}
                disabled
                inputClassName="text-xl border-none shadow-none h-14 focus-visible:ring-0 text-[#A3A3A3]"
              />
              <InputLabel
                labelContent="휴대폰 번호"
                borderColor="#D4D4D4"
                placeholder="010-0000-0000"
                disabled
                inputClassName="text-xl border-none shadow-none h-14 focus-visible:ring-0 text-[#A3A3A3]"
              />
              <InputLabel
                labelContent="생년월일"
                borderColor="#D4D4D4"
                placeholder="1900.01.01"
                disabled
                inputClassName="text-xl border-none shadow-none h-14 focus-visible:ring-0 text-[#A3A3A3]"
              />
              <InputLabel
                labelContent="성별"
                borderColor="#D4D4D4"
                placeholder={loginedUser.gender === "male" ? "남성" : "여성"}
                disabled
                inputClassName="text-xl border-none shadow-none h-14 focus-visible:ring-0 text-[#A3A3A3]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <Button className="w-[400px] h-14 font-semibold text-2xl bg-[#4F118C] hover:bg-purple-950">
                저장하기
              </Button>
            </div>
            <div>
              <Button
                variant="outline"
                className="w-[400px] h-14 text-2xl text-[#737373]"
              >
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfoPage;
