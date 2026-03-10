import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import { aboutUsData } from "@/data/about-us/about-us";
import Image from "next/image";
import ProductShowCase from "@/components/home/ProductShowCase";
import NewsLetter from "@/components/home/NewsLetter";
import OurTeam from "@/components/about-us/OurTeam";

const page = () => {
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "Pages", href: ROUTES.HOME },
          { label: "About Us", href: ROUTES.ABOUT_US, active: true },
        ]}
      />
      <div className="container">
        {/* About Us Header */}
        <div className="grid grid-cols-12 items-center gap-6 pt-18 pb-18 lg:pb-24">
          {/* about header data */}
          <div className="col-span-12 lg:col-span-6 w-full max-w-134 space-y-8">
            <div className="space-y-6">
              <span className="bg-[#2DA5F3] px-4 py-2 rounded-xs text-sm text-white font-semibold uppercase">
                {aboutUsData.badge}
              </span>
              <h2 className="text-2xl sm:text-[40px] mt-4 font-semibold text-[#191C1F] sm:leading-12">
                {aboutUsData.title}
              </h2>
              <p className="text-[#475156] text-base sm:leading-6">
                {aboutUsData.description}
              </p>
            </div>
            <ul className="space-y-4">
              {aboutUsData.features.map((feature) => (
                <li key={feature.id} className="flex items-center gap-3">
                  <Image src={feature.icon} alt="tick" width={24} height={24} />
                  <span className="text-base text-[#191C1F]">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* about header image */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative w-full h-80 sm:h-110 md:h-134">
              <Image
                src={aboutUsData.banner}
                alt="about_banner"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      {/* our team */}
      <OurTeam />
      {/* Trusted section */}
      <div
        className="relative w-full h-110 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${assets.banner.src})` }}
      >
        {/* White overlay */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
        />
        <div className="relative z-10 container flex flex-col items-center md:items-start justify-center text-center md:text-start py-22 space-y-7">
          <div className="space-y-3 ">
            <h1 className="text-3xl sm:text-[32px] font-semibold text-[#191C1F] sm:leading-10 md:max-w-92">
              Your trusted and reliable retail shop
            </h1>
            <p className="text-lg text-[#191C1F] leading-6 max-w-106 mx-auto">
              Praesent sed semper metus. Nunc aliquet dolor mauris, et fringilla
              elit gravida eget. Nunc consequat auctor urna a placerat.
            </p>
          </div>
          {/* Pulsing ripple play button */}
          <style>{`
            @keyframes ripple-pulse {
              0%   { transform: scale(1);   opacity: 0.6; }
              100% { transform: scale(2.2); opacity: 0; }
            }
            .play-ripple-1 {
              animation: ripple-pulse 2s ease-out infinite;
            }
            .play-ripple-2 {
              animation: ripple-pulse 2s ease-out infinite 0.7s;
            }
          `}</style>
          <div className="relative flex items-center justify-center w-18 h-18 cursor-pointer">
            {/* Ripple ring 1 */}
            <span className="play-ripple-1 absolute inset-0 rounded-full bg-[#FA8232]" />
            {/* Ripple ring 2 */}
            <span className="play-ripple-2 absolute inset-0 rounded-full bg-[#FA8232]" />
            {/* Orange play button */}
            <div className="relative z-10 size-18 bg-[#FA8232] rounded-full grid place-content-center shadow-lg">
              <Image src={assets.Play} alt="play-icon" width={24} height={24} />
            </div>
          </div>
        </div>
      </div>
      {/*  Showcase product*/}
      <ProductShowCase />
      {/* NewsLetter */}
      <NewsLetter />
    </>
  );
};

export default page;
