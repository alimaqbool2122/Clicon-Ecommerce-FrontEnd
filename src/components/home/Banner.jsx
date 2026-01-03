"use client";
import React from "react";
import { homepageContent } from "../../../data/home/home";
import { assets } from "../../../constants/assets";
import { ArrowRight } from "../svg/Icons";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

const Banner = () => {
  const slidesData = homepageContent.heroBanner.bannerSlides;
  return (
    <>
      <div className="py-6">
        {/* container */}
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-12 2xl:col-span-8">
              <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                speed={1600} // <-- Change this value to control slider speed (ms)
                loop
                className="banner-swipper"
              >
                {slidesData.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-[#F2F4F5] rounded-md py-12.75 px-5 relative sm:py-15 sm:px-14 lg:grid lg:grid-cols-2 lg:items-center gap-8 xl:flex xl:flex-row-reverse">
                      {/* Image & Price */}
                      <div className="relative xl:w-full ">
                        <Image
                          src={slide.image}
                          width={312}
                          height={345.91}
                          alt={slide.title}
                          className="sm:w-[368px] sm:h-[408px] sm:mx-auto"
                        />
                        <div className="absolute top-0 right-5 w-20 h-20 bg-[#2DA5F3] rounded-[50%] border-4 border-white flex items-center justify-center sm:w-25 sm:h-25">
                          <span className="text-[20px] font-semibold text-white sm:text-[22px]">
                            {slide.price}
                          </span>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="xl:w-full ">
                        <h6 className="text-[14px] leading-5 font-semibold text-[#2DA5F3] mb-1 flex items-center">
                          <span className="w-6 h-0.5 bg-[#2DA5F3] mr-2"></span>
                          {slide.subtitle}
                        </h6>
                        <h2 className="text-[32px] text-[#191C1F] font-semibold leading-[1.16] mb-4 md:text-[42px] lg:text-[48px]">
                          {slide.title}
                        </h2>
                        <p className="text-base text-[#495057] leading-[1.33] mb-3.5 md:text-lg xl:mb-6">
                          {slide.description}
                        </p>

                        <div className="banner-btn">
                          <Link
                            href={slide.btnLink}
                            className="inline-flex items-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-[#FFF] py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]"
                          >
                            {slide.btnText}
                            <ArrowRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Right Column */}
            <div className="col-span-12 2xl:col-span-4">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-6 2xl:col-span-12 py-12.5 px-11.5 rounded-md bg-[#212529] text-center relative sm:text-start xl:w-full 2xl:py-11">
                  <div>
                    <h6 className="text-[#EBC80C] font-medium text-[14px] leading-5 uppercase mb-1.25">
                      Summer Sales
                    </h6>
                    <h2 className="text-white text-[18px] font-semibold leading-[1.33] mb-2.5 sm:text-[20px] lg:text-[24px] lg:mb-3.75 2xl:mb-4.5">
                      New Google
                      <br />
                      Pixel 6 Pro
                    </h2>
                    <div className="flex items-center justify-center sm:block">
                      <Link
                        href="#"
                        className="inline-flex items-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-[#FFF] py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent"
                      >
                        Shop now
                        <ArrowRight />
                      </Link>
                    </div>
                  </div>

                  <div className="hidden sm:block absolute right-0 bottom-0">
                    <div className="relative w-59 h-50.25">
                      <Image src={assets.add_mobile_1} fill alt="log-pic" />
                    </div>
                    <span className="absolute -top-5 right-12.5 bg-[#EFD33D] py-2 px-4 rounded-xs text-[#141414] text-[16px] font-semibold leading-6">
                      29% OFF
                    </span>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-6 2xl:col-span-12 pl-8 pr-10 pb-10 pt-10 rounded-md bg-[#F2F4F5] text-center sm:grid grid-cols-2 gap-5 sm:text-start xl:w-full xl:mt-0 2xl:pb-8">
                  <div className="relative w-40 h-40 hidden sm:block">
                    <Image src={assets.airpods} alt="log-pic" fill />
                  </div>

                  <div>
                    <h2 className="text-[#212529] text-[18px] font-semibold  mb-0.75 sm:text-[20px] lg:text-[24px] lg:mb-1.25 2xl:mb-3.75">
                      Xiaomi
                      <br />
                      FlipBuds Pro
                    </h2>
                    <h6 className="text-[#2DA5F3] text-[16px] font-semibold pb-3.75 sm:text-[18px] 2xl:pb-5">
                      $229 USD
                    </h6>

                    <div className="flex items-center justify-center sm:block">
                      <Link
                        href="#"
                        className="inline-flex items-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-[#FFF] py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]"
                      >
                        Shop now
                        <ArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
