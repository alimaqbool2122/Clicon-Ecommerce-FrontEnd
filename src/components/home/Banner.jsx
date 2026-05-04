"use client";
import React from "react";
import ReusableSwiper from "../common/ReusableSwiper";
import HeroSlide from "./HeroSlide";
import PromoBanners from "./PromoBanners";
import { useGetAllBannersQuery } from "@/redux/services/bannerSlice";

const Banner = () => {
  const { data: banners } = useGetAllBannersQuery();
  return (
    <>
      <div className="py-6">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column (Main Slider) */}
            <div className="col-span-12 2xl:col-span-8">
              <ReusableSwiper
                slides={banners?.data}
                swiperProps={{
                  slidesPerView: 1,
                  effect: "fade",
                  fadeEffect: { crossFade: true },
                  pagination: { clickable: true },
                  autoplay: { delay: 3000 },
                  speed: 1600,
                  loop: true,
                }}
                className="banner-swipper"
                renderSlide={(slide) => <HeroSlide slide={slide} />}
              />
            </div>

            {/* Right Column (Promotions) */}
            <div className="col-span-12 2xl:col-span-4">
              <PromoBanners />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
