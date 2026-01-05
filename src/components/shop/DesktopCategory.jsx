"use client";
import React, { useState, useEffect } from "react";
import { assets } from "../../../constants/assets";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "../svg/Icons";
import { shoppageContent } from "../../../data/shop/shop";
import { useId } from "react";
import { useSliderInput } from "@/hooks/use-slider-input";
import { Slider, SliderThumb } from "@/components/ui/slider";
import { useShopFilter } from "@/contexts/ShopFilterContext";

const items = [
  { id: 1, price: 80 },
  { id: 2, price: 95 },
  { id: 3, price: 110 },
  { id: 4, price: 125 },
  { id: 5, price: 130 },
  { id: 120, price: 900 },
];

const DesktopCategory = () => {
  const { selectedCategories, toggleCategory } = useShopFilter();
  const selected = selectedCategories;
  const [selectedPrices, setSelectedPrices] = useState([""]);
  const [selectedBrands, setselectedBrands] = useState([
    "Apple",
    "Microsoft",
    "Google",
    "HP",
    "Panasonic",
    "LG",
  ]);
  const popularLink = shoppageContent.popularLinkCol;
  const categories = shoppageContent.categories;
  const priceRanges = shoppageContent.priceRanges;
  const brands = shoppageContent.brands;
  const id = useId();
  const minValue = Math.min(...items.map((item) => item.price));
  const maxValue = Math.max(...items.map((item) => item.price));
  const {
    sliderValues,
    inputValues,
    handleSliderChange,
    handleInputChange,
    validateAndUpdateValue,
  } = useSliderInput({
    minValue,
    maxValue,
    initialValue: [200, 800],
  });

  const togglePrice = (price) => {
    if (price === "All Price") {
      if (selectedPrices.includes("All Price")) {
        // Deselect all.
        setSelectedPrices([]);
      } else {
        // Select all prices
        setSelectedPrices([...priceRanges]);
      }
    } else {
      if (selectedPrices.includes(price)) {
        const updated = selectedPrices.filter((item) => item !== price);
        setSelectedPrices(updated.filter((item) => item !== "All Price")); // Remove "All Price" if any other is deselected
      } else {
        const updated = [...selectedPrices, price];
        // If all other prices are selected, automatically select "All Price"
        if (updated.length === priceRanges.length - 1) {
          setSelectedPrices([...priceRanges]);
        } else {
          setSelectedPrices(updated);
        }
      }
    }
  };

  const togglebrands = (brand) => {
    if (selectedBrands.includes(brand)) {
      setselectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setselectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* Category */}
        <div className="space-y-4 col-span-12 border-b border-[#E4E7E9] pb-6">
          <h6 className="text-base text-[#191C1F] font-medium uppercase">
            Category
          </h6>
          <div className="space-y-3">
            {categories.map((category, index) => {
              const isChecked = selected.includes(category);

              return (
                <label
                  key={index}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(category)}
                    className="hidden!"
                  />

                  {/* Custom checkbox */}
                  <div
                    className={`w-5 h-5 border rounded-full flex items-center justify-center transition-all duration-300
                                                ${
                                                  isChecked
                                                    ? "bg-[#FA8232] border-[#FA8232]"
                                                    : "bg-transparent border-[#C9CFD2]"
                                                }`}
                  >
                    {isChecked && (
                      <Image
                        src={assets.Ellipse}
                        alt="check-icon"
                        width={8.5}
                        height={8.5}
                      />
                    )}
                  </div>

                  <span className="text-sm text-[#191C1F] font-medium">
                    {category}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* price range */}
        <div className="space-y-4 col-span-12 border-b border-[#E4E7E9] pb-6">
          <h6 className="text-base text-[#191C1F] font-medium uppercase">
            Price Range
          </h6>
          {/* price wrapper */}
          <div className="space-y-3.5">
            {/* Slider */}
            <div className="flex flex-col gap-2.5">
              <Slider
                value={sliderValues}
                onValueChange={handleSliderChange}
                min={minValue}
                max={maxValue}
                step={10}
                aria-label="Price Range Slider"
              >
                <SliderThumb />
                <SliderThumb />
              </Slider>
            </div>
            {/* Inputs */}
            <div className="flex items-center gap-3">
              <div>
                <input
                  id={`${id}-min`}
                  type="text"
                  readOnly
                  value={inputValues[0]}
                  onChange={(e) => handleInputChange(e, 0)}
                  onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
                  placeholder={`$${minValue}`}
                  className="w-37.5 h-10 bg-white border border-[#E4E7E9] rounded-[3px] outline-none px-3 placeholder-text"
                />
              </div>
              <div>
                <input
                  id={`${id}-max`}
                  type="text"
                  readOnly
                  value={inputValues[1]}
                  onChange={(e) => handleInputChange(e, 1)}
                  onBlur={() => validateAndUpdateValue(inputValues[1], 1)}
                  placeholder={`$${maxValue}`}
                  className="w-37.5 h-10 bg-white border border-[#E4E7E9] rounded-[3px] outline-none px-3 placeholder-text"
                />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {priceRanges.map((range, index) => {
              const isChecked = selectedPrices.includes(range);

              return (
                <label
                  key={index}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => togglePrice(range)}
                    className="hidden!"
                  />

                  {/* Custom checkbox */}
                  <div
                    className={`w-5 h-5 border rounded-full flex items-center justify-center transition-all duration-300
                                                ${
                                                  isChecked
                                                    ? "bg-[#FA8232] border-[#FA8232]"
                                                    : "bg-transparent border-[#C9CFD2]"
                                                }`}
                  >
                    {isChecked && (
                      <Image
                        src={assets.Ellipse}
                        alt="check-icon"
                        width={8.5}
                        height={8.5}
                      />
                    )}
                  </div>

                  <span className="text-sm text-[#191C1F] font-medium">
                    {range}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* popular brands */}
        <div className="space-y-4 col-span-12 border-b border-[#E4E7E9] pb-6">
          <h6 className="text-base text-[#191C1F] font-medium uppercase">
            popular Brands
          </h6>
          <div className="space-y-3 grid grid-cols-12 gap-1">
            {brands.map((brand, index) => {
              const isChecked = selectedBrands.includes(brand);

              return (
                <label
                  key={index}
                  className="col-span-6 flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => togglebrands(brand)}
                    className="hidden!"
                  />

                  {/* Custom checkbox */}
                  <div
                    className={`w-5 h-5 border rounded-xs flex items-center justify-center transition-all duration-300
                                                ${
                                                  isChecked
                                                    ? "bg-[#FA8232] border-[#FA8232]"
                                                    : "bg-transparent border-[#C9CFD2]"
                                                }`}
                  >
                    {isChecked && (
                      <Image
                        src={assets.Check_white}
                        alt="check-icon"
                        width={14}
                        height={14}
                      />
                    )}
                  </div>

                  <span className="text-sm text-[#191C1F] font-medium">
                    {brand}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* popular tags */}
        <div className="space-y-4 col-span-12">
          <h6 className="text-base text-[#191C1F] font-medium uppercase">
            Popular Tag
          </h6>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <ul className="flex flex-wrap gap-2">
                {popularLink.map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href="#"
                      className="bg-white py-1.5 px-2.5 border border-[#E4E7E9] text-[14px] leading-5 font-medium text-black rounded-xs duration-300 ease-linear hover:bg-[#FFF3EB] hover:border-[#FA8232] hover:text-[#FA8232]"
                    >
                      {link.populerlink}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Brand Watch */}
        <div className="col-span-12">
          <div className="p-8 border-4 border-[#FFE7D6] rounded-sm space-y-6">
            <Image
              src={assets.apple_watch}
              width={180}
              height={180}
              alt="logo-pic"
              className="mx-auto"
            />

            <div>
              <Image
                src={assets.watch_7}
                width={132}
                height={51}
                alt="logo-pic"
                className="mx-auto"
              />
              <h2 className="mt-3 mb-2 text-2xl text-[#212529] font-bold leading-8 text-center">
                Heavy on Features. <br /> Light on Price.
              </h2>
              <span className="mt-4  flex items-center justify-center text-center">
                <span className="text-sm text-[#475156] font-extralight mr-2 text-center">
                  Only for:
                </span>
                <span className="py-1.5 px-3 bg-[#F3DE6D] text-[#212529] text-[16px] leading-6 font-semibold rounded-[3px] text-center">
                  $299 USD
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="group/icon relative flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white py-3.25 px-[22.4px] text-[14px] uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]"
              >
                {/* ICON WRAPPER — FIXED SIZE */}
                <span className="relative w-6 h-6 flex items-center justify-center">
                  <Image
                    src={assets.Cart_White}
                    alt="cart-white"
                    fill
                    className="object-contain transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                  />
                  <Image
                    src={assets.Cart_Black}
                    alt="cart-black"
                    fill
                    className="object-contain absolute transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                  />
                </span>
                Add to Cart
              </Link>

              <Link
                href="#"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-transparent text-[#FA8232] py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear  hover:bg-[#FA8232] hover:text-white"
              >
                View Details
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopCategory;
