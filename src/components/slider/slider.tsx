"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { LeftArrowSvg, RightArrowSvg } from "@/assets/svgs";

interface SliderProps {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  slidesPerView?: number;
  showControls?: boolean;
  autoplay?: boolean;
}

const Slider = <T,>({
  data,
  renderItem,
  slidesPerView = 3,
  showControls = true,
  autoplay = true,
}: SliderProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  return (
    <div className="overflow relative max-h-80 w-full">
      {showControls && (
        <button
          className="absolute left-2 top-1/2 z-10 flex -translate-y-1/2 transform items-center justify-center rounded-full p-3 shadow-lg transition-all bg-white dark:border-stroke-dark dark:bg-gray-dark opacity-0 duration-300 group-hover:opacity-100"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <LeftArrowSvg className="text-dark-4 dark:text-gray-5" />
        </button>
      )}
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={slidesPerView}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        autoplay={
          autoplay ? { delay: 2000, disableOnInteraction: false } : false
        }
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} style={{ width: "90%" }}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
      {showControls && (
        <button
          className="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 transform items-center justify-center rounded-full p-3 shadow-lg transition-all bg-white opacity-0 dark:border-stroke-dark dark:bg-gray-dark duration-300 group-hover:opacity-100"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <RightArrowSvg className="text-dark-4 dark:text-gray-5" />
        </button>
      )}
    </div>
  );
};

export default Slider;
