"use client";

import { HeaderDescription } from "./HeaderDescription";
import { HeaderFeatures } from ".";
import { Logo } from "./Logo";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full desktop:h-[70px] tablet:h-[70px] mobile:h-12 desktop:px-[120px] tablet:px-6 mobile:px-6 gap-2 fixed top-0 bg-white z-10 ">
      <div className="flex flex-row w-full gap-5">
        <Logo />
        <HeaderDescription />
      </div>
      <HeaderFeatures />
    </div>
  );
};

export default Header;
