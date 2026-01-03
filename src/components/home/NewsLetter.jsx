"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { ArrowRight } from "../svg/Icons";
import { assets } from "../../../constants/assets";

const NewsLetter = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };
  const brandLogos = [
    { id: 1, src: assets.googel, alt: "google" },
    { id: 2, src: assets.amaazon, alt: "amazon" },
    { id: 3, src: assets.philips, alt: "philips" },
    { id: 4, src: assets.toshiba, alt: "toshiba" },
    { id: 5, src: assets.samsung, alt: "samsung" },
  ];
  return (
    <>
      <div className="bg-[#1B6392] py-18">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className='relative before:content-[""] before:absolute before:bottom-0 before:left-0 before:right-0 before:m-auto before:bg-white before:opacity-[0.12] before:w-[65%] before:lg:w-1/2 before:xl:w-[40%] before:2xl:w-[35%] before:h-px pb-8 mb-6'>
                <div className="text-center mb-9">
                  <h2 className="text-[24px] leading-10 font-semibold text-white mb-2 sm:text-[32px] sm:mb-4">
                    Subscribe to our newsletter
                  </h2>
                  <p className="text-base text-white leading-6 opacity-[0.7] sm:w-[95%] mx-auto md:w-[80%] lg:w-[67%] xl:w-1/2 2xl:w-[45%]">
                    Praesent fringilla erat a lacinia egestas. Donec vehicula
                    tempor libero et cursus. Donec non quam urna. Quisque vitae
                    porta ipsum.
                  </p>
                </div>

                <form action="#" className="sm:hidden">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="bg-white rounded-[3px] w-full h-16 p-3 outline-0"
                  />
                  <div className="top-btnn mt-2.5 ">
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] w-full duration-500 ease-linear hover:bg-transparent hover:text-[#212529]"
                    >
                      Subscribe
                      <ArrowRight />
                    </Link>
                  </div>
                </form>

                <form
                  action="#"
                  className="hidden sm:block bg-white rounded-sm h-15 relative py-4.5 pl-7 pr-3 sm:mx-auto md:w-xl lg:w-154 xl:w-156 xl:h-18 xl:py-6.25"
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    className="outline-0 w-[71%]!"
                  />
                  <div className="top-btnn">
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white py-3.75 px-6 text-sm leading-px uppercase font-bold rounded-[3px] absolute top-[50%] right-3 translate-y-[-50%] duration-500 ease-linear hover:bg-transparent hover:text-[#212529]"
                    >
                      Subscribe
                      <ArrowRight />
                    </Link>
                  </div>
                </form>
              </div>

              {/* slider container */}
              <div className="slider-container w-full md:w-[75%]! lg:w-[45%]! md:mx-auto">
                <Slider {...settings}>
                  {brandLogos.map((item) => (
                    <div key={item.id}>
                      <Image
                        src={item.src}
                        width={72}
                        height={24}
                        alt={item.alt}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
