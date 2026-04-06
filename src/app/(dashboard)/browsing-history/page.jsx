"use client";
import React, { useState } from "react";
import { homepageContent } from "@/data/home/home";
import Image from "next/image";
import { Calendar, LoadMoreIcon, Search, Star } from "@/components/svg/Icons";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const page = () => {
  const [isOn, setIsOn] = useState(true);
  const products = homepageContent.featuredProducts.productsData.filter(
    (product) => product.date === "17 Oct, 2020",
  );

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-base sm:text-xl font-semibold text-[#191C1F]">
              Browsing History
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-[#191C1F] text-sm">
                Turn Browsing History on/off
              </p>
              {/* toggle button */}
              <button
                onClick={() => setIsOn(!isOn)}
                className={`w-9 h-5 rounded-full flex items-center px-1 transition-colors duration-200 ease-in-out cursor-pointer ${isOn ? "bg-[#FA8232]" : "bg-gray-300"}`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${isOn ? "translate-x-4" : "translate-x-0"}`}
                ></div>
              </button>
            </div>
          </div>
          {/* search and filters */}
          <div className="flex  items-center gap-3">
            {/* search */}
            <div className="border border-[#E4E7E9] rounded-xs py-3 px-4 w-full sm:max-w-106! flex items-center gap-3">
              <button
                type="button"
                className="cursor-pointer text-[#FA8232] border-none"
              >
                <Search />
              </button>
              <input
                type="text"
                placeholder="Search in browsing history"
                className="outline-0 font-normal text-[14px] leading-5 text-[#212529] placeholder-text w-full"
              />
            </div>
            {/* calendar */}
            <div className="border border-[#E4E7E9] rounded-xs py-3 px-4 w-full sm:max-w-78! flex items-center gap-3">
              <button
                type="button"
                className="cursor-pointer text-[#FA8232] border-none"
              >
                <Calendar />
              </button>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                className="outline-0 font-normal text-[14px] leading-5 text-[#212529] placeholder-text w-full"
              />
            </div>
          </div>
        </div>
        {/* products */}
        <div className="border border-[#E4E7E9] rounded-sm">
          <div className="px-6 py-4">
            <h3 className="text-sm font-medium uppercase">17 Oct, 2020</h3>
          </div>
          <div className="border-t border-[#E4E7E9] p-6 grid grid-cols-12 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 pr-1 bg-white border-r border-[#E4E7E9] last:border-r-0"
              >
                {/* Product Image */}
                <div className="aspect-202/172 relative mb-6">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="mx-auto"
                  />
                </div>
                {/* Product Rating */}
                <ul className="flex items-center mb-2">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <li key={i}>
                        <Star width={16} height={16} />
                      </li>
                    ))}
                  <li className="text-[12px] leading-4 font-normal text-[#77878F] ml-1 mt-0.5">
                    {product.rating}
                  </li>
                </ul>
                {/* Product Title + Price */}
                <Link
                  href={ROUTES.PRODUCT_DETAILS(product.id)}
                  className="text-[14px] line-clamp-2 leading-5 text-[#191C1F] font-normal mb-2 text-center sm:text-start duration-400 ease-linear hover:text-[#2DA5F3]"
                >
                  {product.title}
                </Link>
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
                            product.badge === "SOLD OUT"
                              ? "bg-[#929FA5]!"
                              : product.badge === "HOT"
                                ? "bg-[#EE5858]!"
                                : product.badge === "BEST DEALS"
                                  ? "bg-[#2DA5F3]!" // 🔹 Blue for Best Deals
                                  : product.badge === "SALE"
                                    ? "bg-[#EE5858]!" // 🔹 Green for Sale
                                    : product.badge.includes("% OFF")
                                      ? "bg-[#EFD33D]! text-[#191C1F]!"
                                      : "bg-[#FA8232]"
                          }`}
                  >
                    {product.badge}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* load more button */}
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 border-2 mt-2 border-[#FFE7D6] bg-transparent text-[#FA8232] py-3.5 px-8 text-[14px] leading-px uppercase font-bold rounded-[3px] cursor-pointer duration-500 ease-linear  hover:bg-[#FA8232] hover:text-white hover:border-[#FA8232]">
            <LoadMoreIcon />
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
