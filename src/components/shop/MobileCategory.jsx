"use client";
import React, { useState, useEffect } from "react";
import { assets } from "../../../constants/assets";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "../svg/Icons";
import { shoppageContent } from "../../../data/shop/shop";
import { set } from "react-hook-form";

const MobileCategory = () => {
  const [selected, setSelected] = useState(["Electronics Devices"]);
  const [selectedPrices, setSelectedPrices] = useState(["$300 to $500"]);
  const [selectedBrands, setselectedBrands] = useState([
    "Apple",
    "Microsoft",
    "Google",
    "HP",
    "Panasonic",
    "LG",
  ]);
  const [minPrice, setMinPrice] = useState(2500);
  const [maxPrice, setMaxPrice] = useState(7500);
  const [activeThumb, setActiveThumb] = useState(null);
  const popularLink = shoppageContent.popularLinkCol;
  const categories = shoppageContent.categories;
  const priceRanges = shoppageContent.priceRanges;
  const brands = shoppageContent.brands;
  const [filterOpen, setFilterOpen] = useState(false);

  // Reset active thumb when mouse is released anywhere
  useEffect(() => {
    const handleMouseUp = () => {
      setActiveThumb(null);
    };
    const handleTouchEnd = () => {
      setActiveThumb(null);
    };

    if (activeThumb) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeThumb]);
  const toggleCategory = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

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

  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [filterOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {filterOpen && (
        <div
          onClick={() => setFilterOpen(false)}
          className="fixed inset-0 bg-black/50 transform transition-all duration-500 ease-in-out z-1040 xl:hidden"
        ></div>
      )}

      {/* Filter Navbar */}
      <nav
        className={`fixed top-0 left-0 w-100 max-w-full border-r border-black/75 bg-white h-screen transform transition-all duration-500 ease-in-out z-1045 
                        ${
                          filterOpen
                            ? "translate-x-0 opacity-100 visible"
                            : "-translate-x-full opacity-0 invisible"
                        }
                    `}
      >
        {/* Close button */}
        <div
          onClick={() => setFilterOpen(false)}
          className="relative flex items-center justify-end p-4"
        >
          <button>
            <Image
              src={assets.cross_icon}
              alt="filter-close"
              width={16}
              height={16}
            />
          </button>
        </div>

        {/* Sidebar Data */}
        <div className="grid grid-cols-12 gap-6 p-4 overflow-y-auto h-screen">
          {/* Category */}
          <div className="space-y-4 col-span-12 border-b border-[#E4E7E9] pb-6">
            <h6 className="text-base text-[#191C1F] font-medium uppercase">
              Category
            </h6>
            <div className="space-y-3.5">
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
            {/* price wrapperc */}
            <div className="slider-wrapper flex flex-col gap-6">
              <div className="relative">
                {/* Background track - gray beam */}
                <div className="slider relative h-0.5 bg-[#E4E7E9] rounded-full"></div>

                {/* Active progress bar - orange beam */}
                <div
                  className="progress absolute top-0 h-0.5 bg-[#FA8232] rounded-full"
                  style={{
                    left: `${(minPrice / 10000) * 100}%`,
                    width: `${((maxPrice - minPrice) / 10000) * 100}%`,
                  }}
                ></div>

                {/* Range inputs with custom handles */}
                <div className="range-input relative -mt-0.5">
                  {/* Min range input */}
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={minPrice}
                    step="100"
                    onChange={(e) => {
                      const newValue = Math.min(
                        Number(e.target.value),
                        maxPrice - 100
                      );
                      setMinPrice(newValue);
                    }}
                    onMouseDown={(e) => {
                      setActiveThumb("min");
                      e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                      setActiveThumb("min");
                      e.stopPropagation();
                    }}
                    className="absolute top-0 left-0 w-full h-0.5 appearance-none bg-transparent cursor-pointer range-min"
                    style={{
                      zIndex:
                        activeThumb === "min"
                          ? 5
                          : activeThumb === "max"
                          ? 2
                          : 3,
                    }}
                  />

                  {/* Max range input */}
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={maxPrice}
                    step="100"
                    onChange={(e) => {
                      const newValue = Math.max(
                        Number(e.target.value),
                        minPrice + 100
                      );
                      setMaxPrice(newValue);
                    }}
                    onMouseDown={(e) => {
                      setActiveThumb("max");
                      e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                      setActiveThumb("max");
                      e.stopPropagation();
                    }}
                    className="absolute top-0 left-0 w-full h-0.5 appearance-none bg-transparent cursor-pointer range-max"
                    style={{
                      zIndex:
                        activeThumb === "max"
                          ? 5
                          : activeThumb === "min"
                          ? 2
                          : 4,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= maxPrice) {
                      setMinPrice(Math.min(value, maxPrice - 100));
                    }
                  }}
                  className="w-37.5 h-10 bg-white border border-[#E4E7E9] rounded-[3px] outline-none px-3 placeholder-text"
                />
                <input
                  type="text"
                  value={maxPrice}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value >= minPrice && value <= 10000) {
                      setMaxPrice(Math.max(value, minPrice + 100));
                    }
                  }}
                  className="w-37.5 h-10 bg-white border border-[#E4E7E9] rounded-[3px] outline-none px-3 placeholder-text"
                />
              </div>
            </div>

            {/* Custom styles for slider handles - matching the optical component look */}
            <style jsx>{`
              .range-min::-webkit-slider-thumb,
              .range-max::-webkit-slider-thumb {
                appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: radial-gradient(
                  circle at 30% 30%,
                  #ffffff 0%,
                  #f8f8f8 40%,
                  #ffffff 100%
                );
                border: 2.5px solid #fa8232;
                cursor: pointer;
                position: relative;
                box-shadow: 0 0 0 1px rgba(250, 130, 50, 0.3),
                  0 0 4px rgba(250, 130, 50, 0.5),
                  0 0 8px rgba(250, 130, 50, 0.3),
                  inset 0 0 8px rgba(255, 255, 255, 0.9),
                  inset -2px -2px 4px rgba(255, 255, 255, 0.8);
                transition: all 0.2s ease;
              }

              .range-min::-webkit-slider-thumb:hover,
              .range-max::-webkit-slider-thumb:hover {
                box-shadow: 0 0 0 1px rgba(250, 130, 50, 0.4),
                  0 0 6px rgba(250, 130, 50, 0.6),
                  0 0 12px rgba(250, 130, 50, 0.4),
                  inset 0 0 10px rgba(255, 255, 255, 1),
                  inset -2px -2px 6px rgba(255, 255, 255, 0.9);
              }

              .range-min::-webkit-slider-thumb:active,
              .range-max::-webkit-slider-thumb:active {
                transform: scale(1.15);
                box-shadow: 0 0 0 2px rgba(250, 130, 50, 0.5),
                  0 0 8px rgba(250, 130, 50, 0.7),
                  0 0 16px rgba(250, 130, 50, 0.5),
                  inset 0 0 12px rgba(255, 255, 255, 1),
                  inset -3px -3px 8px rgba(255, 255, 255, 1);
              }

              .range-min::-moz-range-thumb,
              .range-max::-moz-range-thumb {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: radial-gradient(
                  circle at 30% 30%,
                  #ffffff 0%,
                  #f8f8f8 40%,
                  #ffffff 100%
                );
                border: 2.5px solid #fa8232;
                cursor: pointer;
                box-shadow: 0 0 0 1px rgba(250, 130, 50, 0.3),
                  0 0 4px rgba(250, 130, 50, 0.5),
                  0 0 8px rgba(250, 130, 50, 0.3),
                  inset 0 0 8px rgba(255, 255, 255, 0.9),
                  inset -2px -2px 4px rgba(255, 255, 255, 0.8);
                transition: all 0.2s ease;
              }

              .range-min::-moz-range-thumb:hover,
              .range-max::-moz-range-thumb:hover {
                box-shadow: 0 0 0 1px rgba(250, 130, 50, 0.4),
                  0 0 6px rgba(250, 130, 50, 0.6),
                  0 0 12px rgba(250, 130, 50, 0.4),
                  inset 0 0 10px rgba(255, 255, 255, 1),
                  inset -2px -2px 6px rgba(255, 255, 255, 0.9);
              }

              .range-min::-moz-range-thumb:active,
              .range-max::-moz-range-thumb:active {
                transform: scale(1.15);
                box-shadow: 0 0 0 2px rgba(250, 130, 50, 0.5),
                  0 0 8px rgba(250, 130, 50, 0.7),
                  0 0 16px rgba(250, 130, 50, 0.5),
                  inset 0 0 12px rgba(255, 255, 255, 1),
                  inset -3px -3px 8px rgba(255, 255, 255, 1);
              }
            `}</style>
            <div className="space-y-3.5">
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
            <div className="space-y-3.5 grid grid-cols-12 gap-1">
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
          <div className="col-span-12 mb-24">
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
      </nav>

      {/* Open Filter button */}
      <button
        className="flex items-center gap-2.5 bg-[#f2f4f5]! text-[#212529]! text-sm! font-medium! leading-5 py-2.5 px-5 rounded-sm"
        onClick={() => setFilterOpen(true)}
      >
        <Image
          src={assets.Filter_icon}
          alt="filter-icon"
          width={20}
          height={20}
          className=""
        />
        Filter
      </button>
    </>
  );
};

export default MobileCategory;
