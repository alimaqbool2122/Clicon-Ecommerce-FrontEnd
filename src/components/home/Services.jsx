import React from "react";
import Link from "next/link";
import Image from "next/image";
import { homepageContent } from "../../../data/home/home";

const Services = () => {
  const services = homepageContent.featured;
  return (
    <>
      <div>
        <div className="container">
          <div className="py-4 border border-[#E4E7E9] rounded-md grid gap-y-6 grid-cols-[auto] justify-center sm:grid-cols-[auto_auto] sm:justify-around lg:grid-cols-[auto_auto_auto_auto]">
            {services.map((item, index) => (
              <div key={index} className="relative">
                <div
                  className={`flex items-center ${
                    index % 1 !== 0
                      ? 'xl:before:content-[""] xl:before:absolute xl:before:left-[-40px] xl:before:top-1/2 xl:before:-translate-y-1/2 xl:before:w-px xl:before:h-14 xl:before:bg-[#E4E7E9]'
                      : ""
                  } ${
                    index % 4 !== 0
                      ? 'xl:before:content-[""] xl:before:absolute xl:before:left-[-40px] xl:before:top-1/2 xl:before:-translate-y-1/2 xl:before:w-px xl:before:h-14 xl:before:bg-[#E4E7E9]'
                      : ""
                  }`}
                >
                  <div className="relative shrink-0 cursor-pointer w-10 h-10 mr-4">
                    <Image src={item.image} fill alt={item.title} />
                  </div>
                  <div>
                    <h4 className="text-[14px] text-[#212526] font-medium uppercase leading-5 mb-1.25">
                      {item.title}
                    </h4>
                    <p className="text-[14px] text-[#5F6C72] leading-5 font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
