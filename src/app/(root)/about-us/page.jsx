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
        <div className="grid grid-cols-12 gap-6 pt-18 pb-18 lg:pb-24">
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
      {/*  Showcase product*/}
      <ProductShowCase />
      {/* NewsLetter */}
      <NewsLetter />
    </>
  );
};

export default page;
