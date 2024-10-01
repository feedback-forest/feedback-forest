const HeaderDescription = () => {
  return (
    <div className="flex w-full">
      <div className="desktop:flex tablet:flex mobile:hidden flex-row items-center justify-center w-full gap-0">
        {/* FIXME: 수정 필요 */}
        <div className="flex flex-shrink-0  min-w-[82px] max-w-[82px] text-md text-custom-purple">
          50+ 시ː니어
        </div>
        <div className="flex w-full min-w-44 text-md text-gray-600">
          를 위한 문화생활 플랫폼
        </div>
      </div>
    </div>
  );
};

export default HeaderDescription;
