import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "../svg/Icons";

const HeroSlide = ({ slide }) => {
  return (
    <div className="bg-[#F2F4F5] rounded-md py-12.75 px-5 relative sm:py-15 sm:px-14 lg:grid lg:grid-cols-2 lg:items-center gap-8 xl:flex xl:flex-row-reverse">
      {/* Image & Price */}
      <div className="relative xl:w-full ">
        <div className="relative w-78 h-86.5 sm:w-92 sm:h-102">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="sm:mx-auto object-contain"
          />
        </div>
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
  );
};

export default HeroSlide;
