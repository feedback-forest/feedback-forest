import { Lecture } from "@/entities/lecture/model/lecture";
import apiRequest from "@/shared/api";

// TODO: Lecture
const BASE_PATH = "/likeClass";

export const getClassList = () => apiRequest.get<Lecture[]>(`${BASE_PATH}`, {});
