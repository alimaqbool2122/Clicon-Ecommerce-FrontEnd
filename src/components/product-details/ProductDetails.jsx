"use client";
import React, { useState } from "react";
import { assets } from "../../../constants/assets";
import Image from "next/image";
import {
  Star,
  ArrowLeft,
  ArrowRight,
  Facebook,
  Twitter,
  Pineterest,
} from "../svg/Icons";
import shopDetailData from "../../../data/shop-detail/shop-detail.js";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedMemory, setSelectedMemory] = useState(
    shopDetailData.options.memory
  );
  const [selectedStorage, setSelectedStorage] = useState(
    shopDetailData.options.storage
  );
  const [selectedDisplay, setSelectedDisplay] = useState(
    shopDetailData.options.display
  );

  const { product, images, options, quantity: qtyData } = shopDetailData;

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > qtyData.min) {
      setQuantity(quantity - 1);
    }
  };

  const thumbnailImages = [
    assets.macbook,
    assets.gallery_01,
    assets.gallery_02,
    assets.gallery_03,
    assets.gallery_04,
    assets.gallery_05,
  ];

  return (
    <>
      <div className="container pt-8 pb-40">
        <div className="grid grid-cols-12 gap-14">
          {/* Product Image Section */}
          <div className="col-span-12 lg:col-span-6">
            {/* Main Image */}
            <div className="p-10 border border-[#E4E7E9] rounded-[4px] mb-4">
              <Image
                src={thumbnailImages[selectedImage]}
                alt="main-img"
                width={514}
                height={316}
                className="w-full h-auto object-contain m-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="relative flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-[#FA8232] flex items-center justify-center text-white hover:bg-[#e6731f] transition-colors">
                <ArrowLeft width={16} height={16} />
              </button>
              <div className="flex gap-2 overflow-x-auto flex-1">
                {thumbnailImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`min-w-[80px] h-[80px] border-2 rounded cursor-pointer transition-all ${
                      selectedImage === index
                        ? "border-[#FA8232]"
                        : "border-[#E4E7E9]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`thumbnail-${index}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                ))}
              </div>
              <button className="w-8 h-8 rounded-full bg-[#FA8232] flex items-center justify-center text-white hover:bg-[#e6731f] transition-colors">
                <ArrowRight width={16} height={16} />
              </button>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="col-span-12 lg:col-span-6">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star key={i} width={18} height={18} />
                  ))}
              </div>
              <span className="text-sm text-[#191C1F] font-medium">
                {product.rating.stars}
              </span>
              <span className="text-sm text-[#77878F]">
                {product.rating.totalReviews}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl text-[#191C1F] font-semibold mb-4">
              {product.title}
            </h1>

            {/* SKU, Brand, Availability, Category */}
            <div className="space-y-2 mb-4">
              <p className="text-sm text-[#6c757d]">
                <span className="text-[#191C1F] font-medium">SKU:</span>{" "}
                {product.sku}
              </p>
              <p className="text-sm text-[#6c757d]">
                <span className="text-[#191C1F] font-medium">Brand:</span>{" "}
                {product.brand}
              </p>
              <p className="text-sm text-[#6c757d]">
                <span className="text-[#191C1F] font-medium">
                  Availability:
                </span>{" "}
                <span className="text-green-600">{product.availability}</span>
              </p>
              <p className="text-sm text-[#6c757d]">
                <span className="text-[#191C1F] font-medium">Category:</span>{" "}
                {product.category}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl text-[#2DA5F3] font-semibold">
                ${product.price.current}
              </span>
              <del className="text-lg text-[#929FA5]">
                ${product.price.original}.00
              </del>
              <span className="bg-[#EFD33D] text-[#191C1F] text-sm font-semibold px-2 py-1 rounded">
                {product.price.discount}
              </span>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm text-[#191C1F] font-medium mb-2">
                Color
              </label>
              <div className="flex gap-3">
                {options.color.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === index
                        ? "border-[#FA8232]"
                        : "border-[#E4E7E9]"
                    } ${
                      color === "Space Gray" ? "bg-gray-600" : "bg-gray-200"
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Memory Dropdown */}
            <div className="mb-4">
              <label className="block text-sm text-[#191C1F] font-medium mb-2">
                Memory
              </label>
              <select
                value={selectedMemory}
                onChange={(e) => setSelectedMemory(e.target.value)}
                className="w-full border border-[#E4E7E9] rounded px-4 py-2.5 text-sm text-[#475156] focus:outline-none focus:border-[#FA8232]"
              >
                <option value={options.memory}>{options.memory}</option>
                <option value="8GB Unified Memory">8GB Unified Memory</option>
                <option value="32GB Unified Memory">32GB Unified Memory</option>
              </select>
            </div>

            {/* Size Dropdown */}
            <div className="mb-4">
              <label className="block text-sm text-[#191C1F] font-medium mb-2">
                Size
              </label>
              <select
                value={selectedDisplay}
                onChange={(e) => setSelectedDisplay(e.target.value)}
                className="w-full border border-[#E4E7E9] rounded px-4 py-2.5 text-sm text-[#475156] focus:outline-none focus:border-[#FA8232]"
              >
                <option value={options.display}>{options.display}</option>
                <option value="14-inch Liquid Retina XDR display">
                  14-inch Liquid Retina XDR display
                </option>
                <option value="16-inch Liquid Retina XDR display">
                  16-inch Liquid Retina XDR display
                </option>
              </select>
            </div>

            {/* Storage Dropdown */}
            <div className="mb-4">
              <label className="block text-sm text-[#191C1F] font-medium mb-2">
                Storage
              </label>
              <select
                value={selectedStorage}
                onChange={(e) => setSelectedStorage(e.target.value)}
                className="w-full border border-[#E4E7E9] rounded px-4 py-2.5 text-sm text-[#475156] focus:outline-none focus:border-[#FA8232]"
              >
                <option value={options.storage}>{options.storage}</option>
                <option value="256GB SSD Storage">256GB SSD Storage</option>
                <option value="512GB SSD Storage">512GB SSD Storage</option>
                <option value="2TB SSD Storage">2TB SSD Storage</option>
              </select>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm text-[#191C1F] font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="w-10 h-10 border border-[#E4E7E9] rounded flex items-center justify-center text-[#191C1F] hover:bg-[#F2F4F5]"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity.toString().padStart(2, "0")}
                  readOnly
                  className="w-16 h-10 border border-[#E4E7E9] rounded text-center text-sm text-[#191C1F]"
                />
                <button
                  onClick={() => handleQuantityChange("increment")}
                  className="w-10 h-10 border border-[#E4E7E9] rounded flex items-center justify-center text-[#191C1F] hover:bg-[#F2F4F5]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button className="flex items-center justify-center gap-2 bg-[#FA8232] text-white px-6 py-3 rounded font-semibold hover:bg-[#e6731f] transition-colors">
                <Image
                  src={assets.Cart_White}
                  alt="cart"
                  width={20}
                  height={20}
                />
                ADD TO CARD
              </button>
              <button className="bg-[#FFE7D6] text-[#FA8232] px-6 py-3 rounded font-semibold hover:bg-[#FFD9B8] transition-colors">
                BUY NOW
              </button>
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-4 mb-6">
              <button className="flex items-center gap-2 text-sm text-[#191C1F] hover:text-[#FA8232] transition-colors">
                <Image
                  src={assets.Heart_Black}
                  alt="wishlist"
                  width={16}
                  height={16}
                />
                Add to Wishlist
              </button>
              <button className="flex items-center gap-2 text-sm text-[#191C1F] hover:text-[#FA8232] transition-colors">
                <Image
                  src={assets.Eye_Black}
                  alt="compare"
                  width={16}
                  height={16}
                />
                Add to Compare
              </button>
            </div>

            {/* Share Product */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-[#191C1F] font-medium">
                Share product:
              </span>
              <button className="w-8 h-8 rounded-full bg-[#F2F4F5] flex items-center justify-center hover:bg-[#E4E7E9] transition-colors">
                <Image src={assets.x} alt="copy" width={14} height={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#F2F4F5] flex items-center justify-center hover:bg-[#E4E7E9] transition-colors">
                <Facebook
                  width={16}
                  height={16}
                  fill="#191C1F"
                  background="transparent"
                />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#F2F4F5] flex items-center justify-center hover:bg-[#E4E7E9] transition-colors">
                <Twitter
                  width={16}
                  height={16}
                  fill="#191C1F"
                  background="transparent"
                />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#F2F4F5] flex items-center justify-center hover:bg-[#E4E7E9] transition-colors">
                <Pineterest
                  width={16}
                  height={16}
                  fill="#191C1F"
                  background="transparent"
                />
              </button>
            </div>

            {/* Guarantee and Payment */}
            <div className="border-t border-[#E4E7E9] pt-6">
              <p className="text-sm text-[#191C1F] font-medium mb-3">
                {shopDetailData.guarantee}
              </p>
              <Image
                src={assets.payment_method}
                alt="payment methods"
                width={300}
                height={40}
                className="w-auto h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
