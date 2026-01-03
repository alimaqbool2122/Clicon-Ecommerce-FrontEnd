"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { homepageContent } from "../../../data/home/home";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "../svg/Icons";

const Categories = () => {
  const categorydata = homepageContent.categories;
  const swiperRef = useRef(null);
  return (
    <>
      <div>
        <div className="container">
          {/* Section Title */}
          <div className="text-center mb-10">
            <h2 className="text-[32px] leading-10 font-semibold text-[#212529]">
              Shop with Categories
            </h2>
          </div>

          {/* Category Slider */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={false} // <--- disable Swiper's default arrows
              pagination={{ clickable: true }}
              speed={800} // <-- Change this value to control slider speed (ms)
              className="category-product"
              loop
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },

                1200: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },

                1530: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
              }}
            >
              {categorydata.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="border border-[#E4E7E9] rounded-sm py-6 px-3 mx-7.5 flex flex-col items-center justify-center gap-4  cursor-pointer sm:mx-0">
                    <div
                      href="#"
                      className="flex items-center justify-center w-37 h-37 relative"
                    >
                      <Image
                        src={slide.image}
                        fill
                        alt={slide.title}
                        className="mx-auto"
                      />
                    </div>

                    <div className="mb-2 text-center">
                      <h6 className="text-[16px] text-[#212529] leading-4 font-medium">
                        {slide.title}
                      </h6>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="hidden sm:block">
              <div
                onClick={() => swiperRef.current.slidePrev()}
                className="bg-[#FA8232] w-12 h-12 flex items-center justify-center rounded-[50%] text-white absolute top-[50%] translate-y-[-50%] -left-6 z-50 cursor-pointer"
              >
                <ArrowLeft width={24} height={24} />
              </div>
              <div
                onClick={() => swiperRef.current.slideNext()}
                className="bg-[#FA8232] w-12 h-12 flex items-center justify-center rounded-[50%] text-white absolute top-[50%] translate-y-[-50%] -right-6 z-50 cursor-pointer"
              >
                <ArrowRight width={24} height={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
