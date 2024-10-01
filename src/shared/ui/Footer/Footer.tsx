"use client";

import { ExternalLink } from "../ExternalLink";
import { ExternalLinkProps } from "../ExternalLink/ExternalLink";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const url = pathname.split("/")[1];

  const isRenderFooter = () => {
    if (url !== "login" && url !== "class" && url !== "signup") {
      return true;
    }
    return false;
  };

  const externalLinkList: Array<ExternalLinkProps> = [
    {
      link: "https://ebony-specialist-cf1.notion.site/59f05d08d90346ad989223480f372c84?pvs=4",
      content: "개인정보처리방침 |",
    },
    {
      link: "https://ebony-specialist-cf1.notion.site/a46bfe06464b4101927da295479d4576?pvs=4",
      content: "이용약관 |",
    },
    {
      link: "https://ebony-specialist-cf1.notion.site/807318b7508f4b0c977a2be77f22dfdb?pvs=4",
      content: "위치기반시스템이용약관 |",
    },
    {
      link: "https://ebony-specialist-cf1.notion.site/15d15238629640f8a3ed6e1fc289eb86?pvs=4",
      content: "서비스가이드",
    },
  ];

  return (
    isRenderFooter() && (
      <div className="w-full h-[162px] bg-[#E5E5E5] px-20 py-5 text-gray-600 border-t">
        <div className="flex mb-10 gap-2 desktop:flex-row tablet:flex-row mobile:flex-col">
          {/* TODO: URL ENV 처리 필요한지 확인: 공유 페이지라 괜찮을 것 같지만 확인 필요 */}
          {externalLinkList.map((externalLink) => {
            return (
              <ExternalLink
                key={externalLink.content}
                link={externalLink.link}
                content={externalLink.content}
              />
            );
          })}
        </div>
      </div>
    )
  );
};

export default Footer;
