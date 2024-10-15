import {
  GetHomeLectureList,
  GetLecture,
  GetLectureList,
  GetLocationLectureList,
} from "@/entities/lecture/model/lecture";

import apiRequest from "@/shared/api";
import { getCookie } from "cookies-next";

const BASE_PATH = "/api/lectures";
const HOME_BASE_PATH = "/api/home";
const LOCATION_BASE_PATH = "/api/location";

export const getLectureList = ({
  params,
  payload,
}: {
  params: GetLectureList["Request"]["body"]["params"];
  payload: GetLectureList["Request"]["body"]["payload"];
}) => {
  const accessToken = getCookie("accessToken");

  return apiRequest.post<GetLectureList["Response"]>(`${BASE_PATH}`, payload, {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    params,
  });
};

export const getHomeLectureList = ({
  params,
  payload,
}: {
  params: GetHomeLectureList["Request"]["body"]["params"];
  payload: GetHomeLectureList["Request"]["body"]["payload"];
}) => {
  const accessToken = getCookie("accessToken");
  return apiRequest.post<GetHomeLectureList["Response"]>(
    `${HOME_BASE_PATH}`,
    payload,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      params,
    },
  );
};

export const getLocationLectureList = ({
  params,
}: {
  params: GetLocationLectureList["Request"]["query"];
}) => {
  const accessToken = getCookie("accessToken");
  return apiRequest.post<GetLocationLectureList["Response"]>(
    `${LOCATION_BASE_PATH}`,
    {},
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      params,
    },
  );
};

export const getLectureInfo = ({
  lectureId,
  payload,
}: {
  lectureId: number;
  payload: GetLecture["Request"]["body"];
}) => {
  const accessToken = getCookie("accessToken");
  return apiRequest.post<GetLecture["Response"]>(
    `${BASE_PATH}/${lectureId}`,
    payload,
    {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );
};
