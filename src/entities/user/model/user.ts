import { Lecture } from "@/entities/lecture/model/lecture";

export interface User {
  id: number;
  account_email: string;
  profile_image: string;
  name: string;
  gender: string;
  age_range: string;
  applied_class: Lecture[];
  latitude: number;
  longitude: number;
  city: string;
}
