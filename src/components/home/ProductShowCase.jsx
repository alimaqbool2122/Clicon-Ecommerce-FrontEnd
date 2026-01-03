import React from "react";
import Link from "next/link";
import Image from "next/image";
import { homepageContent } from "../../../data/home/home";

const ProductShowCase = () => {
  const flashSale = homepageContent.shoeCase.flashSaleProducts;
  const bestSeller = homepageContent.shoeCase.bestSellers;
  const topRatedProduct = homepageContent.shoeCase.topRatedProducts;
  const newArrivalProduct = homepageContent.shoeCase.newArrivalProducts;

  return (
    <>
      <div className="py-18">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            {/* 1st column */}
            <div className="space-y-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
              <div className="">
                <h2 className="text-[16px] leading-6 font-semibold text-[#212529]">
                  FLASH SALE TODAY
                </h2>
              </div>

              {flashSale.map((showcase, index) => (
                <div key={index}>
                  <Link
                    href="#"
                    className="border border-[#E4E7E9] flex items-center gap-2 rounded-sm py-3 px-2.25 duration-500 ease-linear hover:shadow-[0px_8px_24px_rgba(25,28,31,0.12)]"
                  >
                    <div className="relative w-20 h-20 shrink-0">
                      <Image src={showcase.image} alt={showcase.title} fill />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-sm leading-5 font-normal line-clamp-2">
                        {showcase.title}
                      </h2>
                      <p className="text-sm leading-5 font-semibold text-[#2DA5F3]">
                        {showcase.price}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* 2nd column */}
            <div className="space-y-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
              <div className="">
                <h2 className="text-[16px] leading-6 font-semibold text-[#212529]">
                  BEST SELLERS
                </h2>
              </div>

              {bestSeller.map((showcase, index) => (
                <div key={index}>
                  <Link
                    href="#"
                    className="border border-[#E4E7E9] flex items-center gap-2 rounded-sm py-3 px-2.25 duration-500 ease-linear hover:shadow-[0px_8px_24px_rgba(25,28,31,0.12)]"
                  >
                    <div className="relative w-20 h-20 shrink-0">
                      <Image src={showcase.image} alt={showcase.title} fill />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-sm leading-5 font-normal line-clamp-2">
                        {showcase.title}
                      </h2>
                      <p className="text-sm leading-5 font-semibold text-[#2DA5F3]">
                        {showcase.price}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* 3rd column */}
            <div className="space-y-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
              <div className="">
                <h2 className="text-[16px] leading-6 font-semibold text-[#212529]">
                  TOP RATED
                </h2>
              </div>

              {topRatedProduct.map((showcase, index) => (
                <div key={index}>
                  <Link
                    href="#"
                    className="border border-[#E4E7E9] flex items-center gap-2 rounded-sm py-3 px-2.25 duration-500 ease-linear hover:shadow-[0px_8px_24px_rgba(25,28,31,0.12)]"
                  >
                    <div className="relative w-20 h-20 shrink-0">
                      <Image src={showcase.image} alt={showcase.title} fill />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-sm leading-5 font-normal line-clamp-2">
                        {showcase.title}
                      </h2>
                      <p className="text-sm leading-5 font-semibold text-[#2DA5F3]">
                        {showcase.price}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* 4th column */}
            <div className="space-y-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3">
              <div className="">
                <h2 className="text-[16px] leading-6 font-semibold text-[#212529]">
                  NEW ARRIVAL
                </h2>
              </div>

              {newArrivalProduct.map((showcase, index) => (
                <div key={index}>
                  <Link
                    href="#"
                    className="border border-[#E4E7E9] flex items-center gap-2 rounded-sm py-3 px-2.25 duration-500 ease-linear hover:shadow-[0px_8px_24px_rgba(25,28,31,0.12)]"
                  >
                    <div className="relative w-20 h-20 shrink-0">
                      <Image
                        src={showcase.image}
                        alt={showcase.title}
                        fill
                      />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-sm leading-5 font-normal line-clamp-2">
                        {showcase.title}
                      </h2>
                      <p className="text-sm leading-5 font-semibold text-[#2DA5F3]">
                        {showcase.price}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductShowCase;
