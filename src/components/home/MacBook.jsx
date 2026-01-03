import React from "react";
import Link from "next/link";
import Image from "next/image";
import { homepageContent } from "../../../data/home/home";
import { ArrowRight } from "../svg/Icons";
import Button from "./Button";
const MacBook = () => {
  const mac = homepageContent.macbookSection;
  return (
    <>
      <div className="bg-[#FFE7D6] py-20">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:flex lg:items-center lg:justify-between">
              {mac.map((cta, index) => (
                <div key={index}>
                  <div className="text-center mb-7.5 xl:mb-0 lg:text-start">
                    <h6 className="bg-[#2DA5F3] py-1.5 px-3 rounded-[3px] text-[14px] text-white font-semibold leading-5 inline-block">
                      {cta.text}
                    </h6>
                    <h2 className="text-[38px] leading-14 font-semibold mt-2.5 mb-3.75 sm:text-[48px]">
                      {cta.title}
                    </h2>
                    <p className="text-[18px] leading-8 font-normal sm:text-[24px]">
                      {cta.description1} <br /> {cta.description2}
                    </p>
                    <div className="mt-5.5 inline-block">
                      <Button />
                    </div>
                  </div>
                </div>
              ))}

              {mac.map((cta, index) => (
                <div key={index}>
                  <div className="relative">
                    <Image
                      src={cta.image}
                      width={536}
                      height={424}
                      alt="cta-pic"
                      className="w-full! h-full! object-cover sm:w-124.5! sm:h-77.25! sm:mx-auto"
                    />
                    <div className="absolute -top-5 left-0 w-20 h-20 bg-[#FFCEAD] rounded-[50%]  flex items-center justify-center border-[5px] border-white sm:w-27.5 sm:h-27.5 sm:-top-7.5 sm:-left-5 md:left-17.5 lg:-left-7.5 xl:-left-7.5">
                      <span className="text-[20px] font-semibold text-[#212529]">
                        {cta.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MacBook;
