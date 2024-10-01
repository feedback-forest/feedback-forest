export interface Lecture {
  id: number;
  name: string;
  description: string;
  price: number;
  day_of_week: string;
  time: string;
  capacity: number;
  link: string;
  location: string;
  latitude: number;
  longitude: number;
  target: string;
  status: string;
  thumbnail: string;
  like: boolean;
  location_detail: string;
  hosted_by: string;
  address: string;
  period: { startData: string; endDate: string; total: number };
  division: "oneDay" | "long";
  distance: string;
  category: string;
  condition: string;
  detail: string;
  certification: string;
  textbookName: string;
  textbookPrice: number;
  need: string;
  instructorName: string;
  instructorHistory: Array<string>;
  educationPlan: string;
}

type LectureTitleType =
  | "capacity"
  | "hosted_by"
  | "division"
  | "period"
  | "time"
  | "price"
  | "location";

export const LectureTitleEnum = {
  capacity: "인원",
  hosted_by: "주최",
  division: "구분",
  period: "기간",
  time: "시간",
  price: "가격",
  location: "장소",
} as const;

export interface LectureSummaryListProps {
  src: string;
  type: LectureTitleType;
  render: (content: Lecture[keyof Lecture]) => string;
}

export const lectureSummaryList: Array<LectureSummaryListProps> = [
  {
    src: "/icons/person.svg",
    type: "capacity",
    render: (content) => `정원 ${content}명`,
  },
  {
    src: "/icons/hosted_by.svg",
    type: "hosted_by",
    render: (content) => `${content}`,
  },
  {
    src: "/icons/user_circle.svg",
    type: "division",
    render: (content) => `${content}`,
  },
  {
    src: "/icons/calendar_filled.svg",
    type: "period",
    render: (content) => `${content}`,
  },
  {
    src: "/icons/time.svg",
    type: "time",
    render: (content) => `${content}`,
  },
  {
    src: "/icons/price.svg",
    type: "price",
    render: (content) => `${content.toLocaleString("ko-KR")}원`,
  },
  {
    src: "/icons/location.svg",
    type: "location",
    render: (content) => `${content}`,
  },
];

type LectureDetailTitleType =
  | "target"
  | "description"
  | "certification"
  | "textbookName"
  | "textbookPrice"
  | "need";

export const LectureDetailTitleEnum = {
  target: "수강자격",
  description: "교육내용",
  certification: "자격증 관련사항",
  textbookName: "교재명",
  textbookPrice: "교재비",
  need: "준비물",
} as const;

export interface LectureDetailListProps {
  type: LectureDetailTitleType;
  render: (content: Lecture[keyof Lecture]) => string;
}

export const lectureDetailList: Array<LectureDetailListProps> = [
  {
    type: "target",
    render: (content) => `${content}`,
  },
  {
    type: "description",
    render: (content) => `${content}`,
  },
  {
    type: "certification",
    render: (content) => `${content}`,
  },
  {
    type: "textbookName",
    render: (content) => `${content}`,
  },
  {
    type: "textbookPrice",
    render: (content) => `${content}`,
  },
  {
    type: "need",
    render: (content) => `${content}`,
  },
];
