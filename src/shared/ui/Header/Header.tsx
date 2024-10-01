"use client";

import { HeaderDescription } from "./HeaderDescription";
import { HeaderFeatures } from ".";
import { Logo } from "./Logo";

const Header = () => {
  return (
    <div className="flex w-full h-16 justify-between items-center gap-2 p-2 fixed top-0 bg-white z-10 px-[120px] mobile:px-4">
      <Logo />
      <HeaderDescription />
      <HeaderFeatures />
    </div>
  );
};

export default Header;
