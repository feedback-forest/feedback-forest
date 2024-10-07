import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex flex-col justify-center items-center desktop:w-[94px] desktop:h-[70px] desktop:min-w-[94px] desktop:min-h-[70px] tablet:w-[94px] tablet:h-[70px] tablet:min-w-[94px] tablet:min-h-[70px] mobile:w-[57px] mobile:h-[48px] mobile:min-w-[57px] mobile:min-h-[48px]">
      <Link href="/">
        <Image
          src="/icons/sijak_logo.svg"
          alt="sijak_logo"
          width={75}
          height={51}
        />
      </Link>
    </div>
  );
};

export default Logo;
