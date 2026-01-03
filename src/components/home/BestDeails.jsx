"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "../svg/Icons";
import { homepageContent } from "../../../data/home/home";
import { assets } from "../../../constants/assets";

const BestDeails = () => {
  const featureproduct = homepageContent.bestDeals;
  const products = homepageContent.productsList;
  // 🎯 Initial values
  const [timeLeft, setTimeLeft] = useState({
    days: 16,
    hours: 21,
    minutes: 57,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="py-18">
        <div className="container">
          {/* Tobar */}
          <div className="lg:flex lg:items-center lg:justify-between mb-6">
            <div className="text-center sm:text-start sm:flex sm:items-center sm:justify-center sm:gap-6">
              <div>
                <h2 className="text-[18px] font-semibold text-[#212529] leading-[1.33333333] sm:text-[24px]">
                  Best Deals
                </h2>
              </div>

              <div className="sm:flex sm:items-center sm:gap-3">
                <div>
                  <h6 className="text-[14px] font-medium text-[#212529] leading-5 my-1.25">
                    Deals ends in
                  </h6>
                </div>
                <div className="bg-[#F3DE6D] inline-flex items-center rounded-sm py-1.5 px-3">
                  <div className="mr-3">
                    <span className="text-[16px] leading-6 font-normal text-[#212529]">
                      {timeLeft.days}
                    </span>
                    <span className="text-[16px] leading-6 font-normal text-[#212529]">
                      d
                    </span>
                    <span className="text-[16px] leading-6 font-normal text-[#212529] ml-2">
                      :
                    </span>
                  </div>

                  <div className="mr-3">
                    <span className="text-[16px] leading-6 font-normal text-[#212529]">
                      {timeLeft.hours}
                    </span>
                    <span className="text-[16px] leading-6 font-normal text-[#212529]">
                      h
                    </span>
                    <span className="text-[16px] leading-6 font-normal text-[#212529] ml-2">
                      :
                    </span>
                  </div>

                  <div className="mr-3">
                    <span className="text-[16px] leading-6 font-normal text-[#212529]">
                      {timeLeft.minutes}
                    </span>
                    <span className="text-[16px] leading-6 font-normal text-[#212529]">
                      m
                    </span>
                    <span className="text-[16px] leading-6 font-normal text-[#212529] ml-2">
                      :
                    </span>
                  </div>

                  <div>
                    <span className="text-[16px] leading-6 font-normal text-[#212529]">
                      {timeLeft.seconds}
                    </span>
                    <span className="text-[16px] leading-6 font-normal text-[#212529]">
                      s
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3">
              <Link
                href=""
                className='relative py-1 flex items-center gap-2 justify-center text-[#2DA5F3] font-medium before:content-[""] before:absolute before:left-1/2 before:bottom-0! before:-translate-x-1/2 before:h-0.5 before:w-[0%] before:bg-[#2DA5F3] before:duration-400 hover:before:w-full'
              >
                Browse All Product
                <ArrowRight />
              </Link>
            </div>
          </div>

          {/* Products Section */}
          <div className="xl:flex xl:items-stretch">
            {/* Left Column */}
            <div className="hidden lg:block w-82 lg:mx-auto xl:w-175 2xl:w-142.5 lg:mb-6 xl:mb-0">
              <div className="relative bg-white border border-[#E4E7E9] h-full py-6 ">
                {featureproduct.map((deals, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="w-70 h-67 relative cursor-pointer">
                      <Image src={deals.image} alt={deals.title} fill />
                    </div>

                    <div className="mb-6 card-data px-5">
                      <ul className="flex items-center mb-1.5 gap-0.5 xl:mt-6">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <li key={i}>{deals.startIcon}</li>
                          ))}
                        <li className="text-[14px] leading-5 font-medium text-[#77878F]">
                          {deals.rating}
                        </li>
                      </ul>

                      <h6 className="text-[16px] text-[#191C1F] leading-6 font-normal pt-1.5 pb-3 line-clamp-2">
                        {deals.title}
                      </h6>
                      <span className="text-[18px] leading-6 font-semibold text-[#2DA5F3]">
                        <del className="text-[#ADB7BC] mr-1">
                          {deals.priceOld}
                        </del>
                        {deals.priceNew}
                      </span>
                      <p className="text-[14px] leading-5 font-normal text-[#5F6C72] line-clamp-3 mt-3">
                        {deals.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        className="group/icon relative w-12 h-12 bg-[#FFE7D6] grid place-content-center rounded-[3px] border-2 border-[#FFE7D6] duration-300 hover:border-[#FA8232] hover:text-[#FA8232] tooltip"
                        data-tip="Add To Wishlist"
                        href="#"
                      >
                        <Image
                          src={assets.Heart_Black}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="transition-opacity duration-300 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Heart}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="absolute inset-0 m-auto transition-opacity duration-300 opacity-0 group-hover/icon:opacity-100"
                        />
                      </Link>
                      <Link
                        href={deals.btnLink}
                        className="group/icon relative flex items-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white h-12 px-[22.4px] text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]"
                      >
                        <Image
                          src={assets.Cart_White}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Cart_Black}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="absolute  transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                        />
                        {deals.btnText}
                      </Link>
                      <Link
                        className="group/icon relative w-12 h-12 bg-[#FFE7D6] grid place-content-center rounded-[3px] mr-2 border-2 border-[#FFE7D6] duration-300 hover:border-[#FA8232] hover:text-[#FA8232] tooltip"
                        data-tip="Add To Wishlist"
                        href="#"
                      >
                        <Image
                          src={assets.Eye_Black}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="transition-opacity duration-300 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Eye}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="absolute inset-0 m-auto transition-opacity duration-300 opacity-0 group-hover/icon:opacity-100"
                        />
                      </Link>
                    </div>

                    <div className="absolute top-4 left-4">
                      <p className="text-[#191C1F] bg-[#EBC80C] py-1.25 px-2 text-[12px] leading-4 font-semibold rounded-[3px] uppercase">
                        {deals.badgeText1}
                      </p>
                      <p className="py-1.25 px-2.5 bg-[#EE5858] text-[#ffff] text-[12px] leading-4 font-semibold rounded-[3px] uppercase mt-2.5 table">
                        {deals.badgeText2}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="grid grid-cols-12 gap-6 md:gap-0">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 group p-4 bg-white border border-[#E4E7E9] mx-7.5 sm:mx-0 relative"
                >
                  <div className="mb-2 relative">
                    <div className="aspect-216/188 relative">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="mx-auto"
                      />
                    </div>

                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 bg-black/20 flex items-center justify-center w-full h-full duration-500 ease-linear opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                      <Link
                        href="#"
                        className="group/icon relative w-12 h-12 bg-white flex items-center justify-center rounded-[50%] mx-1 duration-300 ease-linear hover:bg-[#FA8232] hover:text-white"
                      >
                        <Image
                          src={assets.Heart_Black}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="transition-opacity duration-300 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Heart_White}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="absolute inset-0 m-auto transition-opacity duration-300 opacity-0 group-hover/icon:opacity-100"
                        />
                      </Link>

                      <Link
                        href="#"
                        className="group/icon relative w-12 h-12 bg-white flex items-center justify-center rounded-[50%] mx-1 duration-300 ease-linear hover:bg-[#FA8232] hover:text-white"
                      >
                        <Image
                          src={assets.Cart_Black}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="transition-opacity duration-300 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Cart_White}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="absolute inset-0 m-auto transition-opacity duration-300 opacity-0 group-hover/icon:opacity-100"
                        />
                      </Link>

                      <Link
                        href="#"
                        className="group/icon relative w-12 h-12 bg-white flex items-center justify-center rounded-[50%] mx-1 duration-300 ease-linear hover:bg-[#FA8232] hover:text-white"
                      >
                        <Image
                          src={assets.Eye_Black}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="transition-opacity duration-300 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Eye_White}
                          alt="cart-white"
                          width={24}
                          height={24}
                          className="absolute inset-0 m-auto transition-opacity duration-300 opacity-0 group-hover/icon:opacity-100"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="">
                    <h6 className="text-[14px] line-clamp-2 leading-5 text-[#191C1F] font-normal mb-2 text-center sm:text-start">
                      {product.title}
                    </h6>
                    <p className="text-[#2DA5F3] text-[14px] leading-5 font-semibold text-center sm:text-start">
                      <del className="text-[#929FA5] mr-1]">
                        {product.priceOld}
                      </del>
                      {product.price}
                    </p>
                  </div>

                  {/* ✅ Only render badge if present */}
                  {product.badge && (
                    <p
                      className={`absolute top-3 left-3 py-1.25 px-2.5 text-white bg-[#EE5858] text-[12px] leading-4 font-semibold rounded-[3px] uppercase
                                        ${
                                          product.badge === "SOLD OUT"
                                            ? "bg-[#929FA5]!"
                                            : ""
                                        }
                                        ${
                                          product.badge === "HOT"
                                            ? "bg-[#EE5858]!"
                                            : ""
                                        }
                                        ${
                                          product.badge.includes("% OFF")
                                            ? "bg-[#EFD33D] text-[#191C1F]!"
                                            : ""
                                        }
                                        `}
                    >
                      {product.badge}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestDeails;
