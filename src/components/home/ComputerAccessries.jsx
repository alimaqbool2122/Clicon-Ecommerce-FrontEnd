"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { homepageContent } from "../../../data/home/home";
import { ArrowRight } from "../svg/Icons";
import { assets } from "../../../constants/assets";

const FeaturedProducts = () => {
  // For Active state.
  const [activeIndex, setActiveIndex] = useState(0);

  // trigger re-animation
  const [refreshKey, setRefreshKey] = useState(0);
  const tabs = homepageContent.computerAccessories.tabs;
  const products = homepageContent.computerAccessories.products;
  const Discount = homepageContent.featuredProducts.discountSection;
  const salesone = homepageContent.computerAccessories.sales_one;
  const salestwo = homepageContent.computerAccessories.sales_two;
  // Filter products
  const filteredProducts =
    activeIndex === 0
      ? products
      : products.filter((p) => p.category === tabs[activeIndex]);
  return (
    <>
      <div className="py-18">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            {/* left Column */}
            <div className="col-span-12 2xl:col-span-3 2xl:order-2">
              <div className="lg:flex lg:items-center lg:justify-between lg:h-full 2xl:flex-col">
                <div>
                  {salesone.map((productdata) => (
                    <div
                      key={productdata.id}
                      className="lg:flex lg:items-center lg:justify-between lg:h-full 2xl:flex-col"
                    >
                      <div className="bg-[#F7E99E] rounded-sm py-7.5 px-5 text-center sm:px-7">
                        <div className="relative w-27 h-27 mx-auto">
                          <Image
                            src={productdata.image}
                            alt={productdata.title1}
                            className="mx-auto"
                          />
                        </div>

                        <h2 className="text-[#191C1F] text-[24px] leading-8 font-semibold mb-2 ">
                          {productdata.title1} <br /> {productdata.title2}
                        </h2>

                        <p className="text-[#475156] text-[16px] leading-6 font-normal">
                          {productdata.description}
                        </p>

                        <div className="mt-4 flex items-center justify-center">
                          <span className="text-[#475156] text-[14px] leading-5 font-normal mr-2">
                            {productdata.tag}
                          </span>
                          <span className="py-1.5 px-3 bg-white text-[#212529] rounded-sm text-[14px] leading-6 font-semibold ">
                            {productdata.price}
                          </span>
                        </div>

                        <div className="top-btnn mt-6">
                          <Link
                            href={productdata.btnLink}
                            className="inline-flex w-full items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white py-3.75 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#212529]"
                          >
                            {productdata.btnText}
                            <ArrowRight />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  {salestwo.map((data) => (
                    <div
                      key={data.id}
                      className="bg-[#124261] py-10 px-6 rounded-sm mt-6! text-center lg:mt-0"
                    >
                      <h6 className="inline-block py-1.5 px-3 text-white rounded-sm text-[14px] leading-5 font-semibold bg-[#FFFFFF1F] ">
                        {data.sale}
                      </h6>
                      <h2 className="text-[24px] leading-8 font-semibold text-white py-3 lg:text-[28px]">
                        {data.title}
                      </h2>
                      <p className="text-[18px] leading-6 font-semibold text-white">
                        {data.description}{" "}
                        <span className="text-[#EBC80C]">{data.badge}</span>{" "}
                        {data.badge2}
                      </p>
                      <div className="pro-btn mt-6">
                        <Link
                          href={data.btnLink}
                          className="inline-flex items-center justify-center gap-2 border-2 border-[#2DA5F3] bg-[#2DA5F3] text-white py-3.75 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] w-full duration-500 ease-linear hover:bg-transparent hover:text-white"
                        >
                          {data.btnText}
                          <ArrowRight />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div className="col-span-12 2xl:col-span-9 2xl:order-1">
              <div className="mb-7.5 xl:flex items-center justify-between">
                <div className="mb-3.5 text-center lg:mb-0">
                  <h2 className="text-[24px] text-[#212529] leading-8 font-semibold">
                    Featured Products
                  </h2>
                </div>

                <div className="text-center lg:flex items-center justify-center">
                  <ul className="sm:flex sm:items-center sm:justify-center">
                    {tabs.map((tab, index) => (
                      <li key={index} className="pb-2.5 sm:pb-0">
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveIndex(index);
                            setRefreshKey((prev) => prev + 1); // 🔹 force re-render animation
                          }}
                          className={`relative text-[14px] font-semibold rounded-sm leading-5 p-2 duration-300
                                                                before:content-[""] before:absolute before:left-1/2 before:bottom-0 before:-translate-x-1/2
                                                                before:h-0.5 before:bg-[#FA8232] before:duration-300 
                                                                ${
                                                                  activeIndex ===
                                                                  index
                                                                    ? "before:w-full text-[#212529]"
                                                                    : "before:w-0 text-[#5F6C72] hover:bg-[#F2F4F5] hover:text-[#212529]"
                                                                }`}
                        >
                          {tab}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 lg:mt-0 lg:ml-2">
                    <Link
                      href="#"
                      className='relative py-1 flex items-center gap-2 justify-center text-[#FA8232] text-[14px] font-semibold before:content-[""] before:absolute before:left-1/2 before:bottom-0 before:-translate-x-1/2 before:h-0.5 before:w-[0%] before:bg-[#FA8232] before:duration-400 hover:before:w-full'
                    >
                      Browse All Product
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tab Content with Animation */}
              <div
                key={refreshKey} // 🔹 ensures grid remounts on every click
                className="grid grid-cols-12 gap-4"
              >
                <AnimatePresence mode="wait">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 group p-4 bg-white border border-[#E4E7E9] mx-7.5 sm:mx-0 relative duration-500 ease-linear hover:shadow-[0px_8px_24px_rgba(25,28,31,0.12)]"
                    >
                      {/* Product Image */}
                      <div className="mb-6 relative">
                        <div className="relative aspect-202/172">
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

                      {/* Product Rating */}
                      <ul className="flex items-center mb-2">
                        {Array(5)
                          .fill(null)
                          .map((_, i) => (
                            <li key={i}>{product.startIcon}</li>
                          ))}
                        <li className="text-[12px] leading-4 font-normal text-[#77878F] ml-1 mt-0.5">
                          {product.rating}
                        </li>
                      </ul>

                      {/* Product Title + Price */}
                      <h6 className="text-[14px] leading-5 text-[#191C1F] font-normal mb-2 line-clamp-2">
                        {product.title}
                      </h6>
                      <p className="text-[#2DA5F3] text-[14px] leading-5 font-semibold">
                        {product.priceOld && (
                          <del className="text-[#929FA5] mr-1">
                            {product.priceOld}
                          </del>
                        )}
                        {product.price}
                      </p>

                      {/* Badge */}
                      {product.badge && (
                        <p
                          className={`absolute top-3 left-3 py-1.25 px-2.5 text-white bg-[#EE5858] text-[12px] leading-4 font-semibold rounded-[3px] uppercase
                                                            ${
                                                              product.badge ===
                                                              "SOLD OUT"
                                                                ? "bg-[#929FA5]!"
                                                                : product.badge ===
                                                                  "HOT"
                                                                ? "bg-[#EE5858]!"
                                                                : product.badge ===
                                                                  "BEST DEALS"
                                                                ? "bg-[#2DA5F3]!" // 🔹 Blue for Best Deals
                                                                : product.badge ===
                                                                  "SALE"
                                                                ? "bg-[#EE5858]!" // 🔹 Green for Sale
                                                                : product.badge.includes(
                                                                    "% OFF"
                                                                  )
                                                                ? "bg-[#EFD33D]! text-[#191C1F]!"
                                                                : "bg-[#FA8232]"
                                                            }`}
                        >
                          {product.badge}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
