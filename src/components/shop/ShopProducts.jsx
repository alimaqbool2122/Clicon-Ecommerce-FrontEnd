"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import { ArrowLeft, ArrowRight, Cross } from "../svg/Icons";
import { assets } from "../../../constants/assets";
import { shoppageContent } from "../../../data/shop/shop";
import ROUTES from "../../../constants/routes";
import CustomPagination from "../ui/CustomPagination";
import { useShopFilter } from "@/contexts/ShopFilterContext";

const ShopProducts = () => {
  const products = shoppageContent.productsList;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const { selectedCategories, selectedPriceRanges, selectedBrands } = useShopFilter();
  const totalPages = 6;

  // Helper function to parse price string to number
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    // Remove $ and commas, then parse to number
    return parseFloat(priceString.replace(/[$,]/g, "")) || 0;
  };

  // Helper function to check if price matches a price range checkbox
  const matchesPriceRangeCheckbox = (productPrice) => {
    // If no checkboxes selected, show all products (don't filter by price checkboxes)
    if (selectedPriceRanges.length === 0) return true;

    return selectedPriceRanges.some((range) => {
      if (range === "All Price") return true;
      
      if (range === "Under $20") {
        return productPrice < 20;
      } else if (range === "$25 to $100") {
        return productPrice >= 25 && productPrice <= 100;
      } else if (range === "$100 to $300") {
        return productPrice >= 100 && productPrice <= 300;
      } else if (range === "$300 to $500") {
        return productPrice >= 300 && productPrice <= 500;
      } else if (range === "$500 to $1000") {
        return productPrice >= 500 && productPrice <= 1000;
      } else if (range === "$1,000 to $10,000") {
        return productPrice >= 1000 && productPrice <= 10000;
      }
      return false;
    });
  };

  // Clear active search when input is cleared
  useEffect(() => {
    if (searchQuery === "") {
      setActiveSearchQuery("");
    }
  }, [searchQuery]);

  const filteredProducts = products.filter((product) => {
    // Filter by search query
    const matchesSearch = product.title
      .toLowerCase()
      .includes(activeSearchQuery.toLowerCase());

    // Filter by categories - works independently
    // If no categories selected, don't filter by category (show all)
    let matchesCategory = true;
    if (selectedCategories.length > 0) {
      matchesCategory =
        product.category && selectedCategories.includes(product.category);
    }

    // Filter by price range checkboxes - works independently
    // If no price ranges selected, don't filter by price (show all)
    const productPrice = parsePrice(product.price);
    const matchesPriceCheckbox = matchesPriceRangeCheckbox(productPrice);

    // Filter by brands - works independently
    // If no brands selected, don't filter by brand (show all)
    let matchesBrand = true;
    if (selectedBrands.length > 0) {
      matchesBrand = product.brand && selectedBrands.includes(product.brand);
    }

    // All filters work independently:
    // - If only category selected → filter by category only
    // - If only price selected → filter by price only
    // - If only brand selected → filter by brand only
    // - If multiple selected → filter by all (AND logic)
    // - If none selected → show all products
    return matchesSearch && matchesCategory && matchesPriceCheckbox && matchesBrand;
  });

  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          {/* Search & Filter */}
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />

          {/* Active Filter */}
          <div className="bg-[#f2f4f5] flex flex-wrap items-center md:justify-between gap-3 py-3 px-6 mt-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-[#6c757d]">Active Filters:</p>
              <p className="text-sm text-[#212529] flex items-center gap-1.5">
                Electronics Devices
                <Image
                  src={assets.x}
                  alt="x"
                  width={13}
                  height={13}
                  className="cursor-pointer"
                />
              </p>
              <p className="text-sm text-[#212529] flex items-center gap-1.5">
                5 Star Rating
                <Image
                  src={assets.x}
                  alt="x"
                  width={13}
                  height={13}
                  className="cursor-pointer"
                />
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <p className="text-sm text-[#212529] font-semibold">
                {filteredProducts.length}
              </p>
              {filteredProducts.length > 0 && (
                <p className="text-sm text-[#6c757d]">
                  {filteredProducts.length > 1
                    ? "Results found."
                    : "Result found."}
                </p>
              )}
            </div>
          </div>

          {/* All Products */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-12 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 group p-4 bg-white border border-[#E4E7E9] mx-7.5 sm:mx-0 relative duration-500 ease-linear hover:shadow-[0px_8px_24px_rgba(25,28,31,0.12)]"
                >
                  {/* Product Image */}
                  <div className="mb-3 relative">
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
                  <Link href={ROUTES.PRODUCT_DETAILS(product.id)}>
                    <h6 className="text-[14px] leading-5 text-[#191C1F] font-normal mb-2 line-clamp-2">
                      {product.title}
                    </h6>
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
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-12 text-center py-10">
              <p className="text-lg text-gray-500">No product found.</p>
            </div>
          )}
          {/* custom pagination */}
          <div className="py-10 flex items-center justify-center">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopProducts;
