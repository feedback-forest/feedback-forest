"use client";

import { CarouselApi, ImageCarousel } from "../../../../shared/ui";

import { CarouselImage } from "@/shared/ui/ImageCarousel/ImageCarousel";
import { useCarouselApi } from "@/shared/lib/useCarouselApi";
import { useState } from "react";

const Description = () => {
  const [api, setApi] = useState<CarouselApi>();
  const { current, count } = useCarouselApi(api);

  const descriptionImages: CarouselImage[] = [
    {
      src: "/images/senior.png",
      alt: "senior",
      width: 1440,
      height: 640,
    },
    {
      src: "/images/sijak_happy.png",
      alt: "sijak_happy",
      width: 1440,
      height: 640,
    },
    {
      src: "/images/sijak_position.png",
      alt: "sijak_position",
      width: 1440,
      height: 640,
    },
  ];

  return (
    <div className="flex w-full flex-col justify-center items-center ">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col w-full h-full">
            <ImageCarousel
              setApi={setApi}
              images={descriptionImages}
              isPreviousIcon
              isNextIcon
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
