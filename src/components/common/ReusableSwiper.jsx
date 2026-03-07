"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const ReusableSwiper = ({
  slides,
  renderSlide,
  swiperProps = {},
  className = "",
}) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      {...swiperProps}
      className={className}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{renderSlide(slide, index)}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReusableSwiper;
