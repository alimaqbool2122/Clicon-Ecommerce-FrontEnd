import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "../svg/Icons";
import { homepageContent } from "../../../data/home/home";

const IntroBanner = () => {
  const productionbannerone = homepageContent.introBanner1;
  const productionbannertwo = homepageContent.introBanner2;
  return (
    <>
      <div>
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            {/* first column */}
            <div className="col-span-12 xl:col-span-6">
              <div>
                {productionbannerone.map((data, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 items-center bg-[#F2F4F5] py-11 px-7.5 rounded-sm md:px-11"
                  >
                    <div className="flex flex-col items-start col-span-12 md:col-span-6">
                      <h6 className="bg-[#2DA5F3] text-white py-1.5 px-3 rounded-xs text-[14px] font-semibold leading-5 inline-block">
                        {data.introText}
                      </h6>
                      <h2 className="text-[32px] leading-10 font-semibold text-[#212529] mt-2 mb-3">
                        {data.title1} <br />
                        {data.title2}
                      </h2>
                      <p className="text-[16px] leading-6 text-[#475156] font-normal mb-5">
                        {data.description1} <br /> {data.description2}
                      </p>
                      <div>
                        <Link
                          href={data.btnLink}
                          className="inline-flex items-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#212529]"
                        >
                          {data.btnText}
                          <ArrowRight />
                        </Link>
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-6 flex justify-end">
                      <div className="relative w-60 h-60 xl:w-35.25 xl:h-35.25 2xl:w-57.75 2xl:h-57.75 hidden md:block">
                        <Image
                          src={data.image}
                          alt={data.title1}
                          fill
                          className="mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* second column */}
            <div className="col-span-12 xl:col-span-6">
              <div>
                {productionbannertwo.map((data, index) => (
                  <div
                    key={index}
                    className="bg-[#212529] py-11 px-7.5 rounded-sm md:px-11 xl:mt-0 relative"
                  >
                    <div>
                      <h6 className="bg-[#EFD33D] text-[#212529] py-1.5 px-3 rounded-xs text-sm font-semibold leading-5 inline-block">
                        {data.introText}
                      </h6>
                      <h2 className="text-[32px] leading-10 font-semibold text-white mt-2 mb-3">
                        {data.title1} <br />
                        {data.title2}
                      </h2>
                      <p className="text-[16px] leading-6 text-[#ADB7BC] font-normal mb-5">
                        {data.description1} <br />
                        {data.description2}
                      </p>
                      <div>
                        <Link
                          href={data.btnLink}
                          className="inline-flex items-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-white"
                        >
                          {data.btnText}
                          <ArrowRight />
                        </Link>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <Link href="#">
                        <div className="absolute right-0 bottom-0 w-78 h-87.25 xl:w-60.25 xl:h-58.75 2xl:w-78 2xl:h-76.25">
                          <Image src={data.image} alt={data.title1} fill />
                        </div>

                        <div className="absolute top-5 right-7.5 w-22 h-22 bg-[#2DA5F3] rounded-[50%]  flex items-center justify-center xl:top-21.25 2xl:top-5">
                          <span className="text-[20px] font-semibold text-white sm:text-[22px]">
                            {data.badge}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroBanner;
