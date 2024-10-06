"use client";

import { Lecture, LecturePayload } from "@/entities/lecture/model/lecture";
import {
  LectureDetail,
  LectureFooter,
  LectureImageInfo,
  LectureSummary,
} from "@/entities/lecture/ui";
import { useEffect, useState } from "react";

import { useGeoLocation } from "@/shared/lib/useGeolocation";
import useLectureInfo from "@/entities/lecture/api/useLectureInfo";
import { useParams } from "next/navigation";

export const runtime = "edge";

const LectureInfoPage = () => {
  const [lectureInfo, setLectureInfo] = useState<Lecture>();
  const [user, setUser] = useState<LecturePayload>();

  const { id } = useParams();

  const getLectureInfo = useLectureInfo(Number(id));
  const isLoading = getLectureInfo.isIdle || getLectureInfo.isPending;

  const geolocation = useGeoLocation();

  useEffect(() => {
    if (user) {
      getLectureInfo.mutate(
        {
          lectureId: Number(id),
          payload: { latitude: user.latitude, longitude: user.longitude },
        },
        {
          onSuccess: (data) => {
            setLectureInfo(data.data.data);
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  useEffect(() => {
    if (
      geolocation.curLocation &&
      geolocation.curLocation.latitude &&
      geolocation.curLocation.longitude
    ) {
      setUser((prev) => {
        return {
          ...prev,
          latitude: geolocation.curLocation
            ? geolocation.curLocation.latitude
            : 0,
          longitude: geolocation.curLocation
            ? geolocation.curLocation.longitude
            : 0,
        };
      });
    }
  }, [geolocation.curLocation]);

  return (
    <div className="flex flex-col w-full h-full justify-start items-start gap-[60px]">
      <div className="flex flex-row w-full py-4 gap-11 px-[120px]">
        <LectureImageInfo lectureInfo={lectureInfo} isLoading={isLoading} />
        <LectureSummary lectureInfo={lectureInfo} isLoading={isLoading} />
      </div>
      <LectureDetail lectureInfo={lectureInfo} isLoading={isLoading} />
      <LectureFooter lectureInfo={lectureInfo} isLoading={isLoading} />
    </div>
  );
};

export default LectureInfoPage;
