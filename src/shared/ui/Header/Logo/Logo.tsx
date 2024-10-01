import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex flex-col w-20 min-w-[55px] justify-center items-center gap-2">
      <Link href="/">
        <Image
          src="/images/sijak_logo.png"
          alt="sijak_logo"
          width={94}
          height={80}
        />
      </Link>
    </div>
  );
};

export default Logo;
