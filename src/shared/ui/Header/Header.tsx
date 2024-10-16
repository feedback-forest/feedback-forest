"use client";

import { HeaderFeatures, HeaderPrevious, HeaderTitle } from ".";

import { HeaderDescription } from "./HeaderDescription";
import { Logo } from "./Logo";

const Header = () => {
  return (
    <div className="flex w-full desktop:justify-between tablet:justify-around mobile:justify-between items-center desktop:max-w-[1440px] tablet:max-w-[1440px] mobile:max-w-[768px] desktop:h-[70px] tablet:h-[70px] mobile:h-12 desktop:px-[120px] tablet:px-6 mobile:px-4 desktop:gap-2 tablet:gap-2 fixed top-0 bg-white z-[101] border-b border-custom-disabled">
      <div className="flex flex-row gap-5">
        <Logo />
        <HeaderPrevious />
        <HeaderDescription />
      </div>
      <HeaderTitle />
      <HeaderFeatures />
    </div>
  );
};

export default Header;
