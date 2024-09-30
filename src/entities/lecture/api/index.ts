import { Lecture } from "@/entities/lecture/model/lecture";
import apiRequest from "@/shared/api";

// TODO: BASE_PATH "/lectures"로 변경 필요
const BASE_PATH = "/class";
const API_BASE_PATH = "/lectures";

export const getLectureList = () =>
  apiRequest.get<Lecture[]>(`${BASE_PATH}`, {});

export const getLectureInfo = (id: number) =>
  apiRequest.get<Lecture>(`${BASE_PATH}/${id}`, {});

export const getEntireLecture = () =>
  apiRequest.get<{
    status: string;
    message: string;
    data: { data: Lecture[]; hasNext: boolean };
  }>(`${API_BASE_PATH}`, {});
