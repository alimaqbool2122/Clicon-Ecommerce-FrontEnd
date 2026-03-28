"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { shopDetailData } from "../../data/shop-detail/shop-detail.js";
import Image from "next/image";
import Link from "next/link.js";
import { ArrowLeft, ArrowRight } from "../svg/Icons.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { assets } from "../../constants/assets.js";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart, updateQuantity } from "@/redux/services/cartSlice";
import { toggleWishlistItem } from "@/redux/services/wishlistSlice";
import {
  toggleCompareItem,
  MAX_COMPARE_ITEMS,
} from "@/redux/services/compareSlice";
import ROUTES from "@/constants/routes";

const ProductDetails = () => {
  const {
    product,
    images,
    actions,
    shareProduct,
    guarantee,
    paymentMethod,
    options,
  } = shopDetailData;
  const { id: productId, title, rating, facts, price } = product;
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(images.mainImage);
  const [isFading, setIsFading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [sizeActive, setSizeActive] = useState(false);
  const [selectedSize, setSelectedSize] = useState(options.size[0]);
  const [memoryActive, setMemoryActive] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(options.memory[0]);
  const [storageActive, setStorageActive] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState(options.storage[0]);
  const allImages = [images.mainImage, ...images.thumbnails];
  const swiperRef = useRef(null);
  const sizeBtnRef = useRef(null);
  const memoryBtnRef = useRef(null);
  const storageBtnRef = useRef(null);
  const prevVariantKeyRef = useRef("");

  const variantSize = useMemo(
    () => `${selectedSize} · ${selectedMemory} · ${selectedStorage}`,
    [selectedSize, selectedMemory, selectedStorage],
  );
  const colorName = useMemo(
    () => options.colors[selectedColor]?.name ?? "",
    [options.colors, selectedColor],
  );

  const cartItems = useSelector((state) => state.cart.cartItems);
  const compareItems = useSelector((state) => state.compare.items);

  useEffect(() => {
    const key = `${productId}|${variantSize}|${colorName}`;
    const variantChanged = prevVariantKeyRef.current !== key;
    prevVariantKeyRef.current = key;

    const line = cartItems.find(
      (i) =>
        i.id === productId &&
        i.selectedSize === variantSize &&
        i.selectedColor === colorName,
    );
    if (variantChanged) {
      setQuantity(line ? Math.max(1, Number(line.quantity) || 1) : 1);
      return;
    }
    if (line) {
      setQuantity(Math.max(1, Number(line.quantity) || 1));
    }
  }, [cartItems, productId, variantSize, colorName]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (sizeBtnRef.current && !sizeBtnRef.current.contains(e.target)) {
        setSizeActive(false);
      }
      if (memoryBtnRef.current && !memoryBtnRef.current.contains(e.target)) {
        setMemoryActive(false);
      }
      if (storageBtnRef.current && !storageBtnRef.current.contains(e.target)) {
        setStorageActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleIncrement = (e) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    const next = quantity + 1;
    setQuantity(next);
    const line = cartItems.find(
      (i) =>
        i.id === productId &&
        i.selectedSize === variantSize &&
        i.selectedColor === colorName,
    );
    if (line) {
      dispatch(
        updateQuantity({
          id: productId,
          selectedSize: variantSize,
          selectedColor: colorName,
          quantity: next,
        }),
      );
    }
  };

  const handleDecrement = (e) => {
    e?.stopPropagation?.();
    e?.preventDefault?.();
    if (quantity <= 1) return;
    const next = quantity - 1;
    setQuantity(next);
    const line = cartItems.find(
      (i) =>
        i.id === productId &&
        i.selectedSize === variantSize &&
        i.selectedColor === colorName,
    );
    if (line) {
      dispatch(
        updateQuantity({
          id: productId,
          selectedSize: variantSize,
          selectedColor: colorName,
          quantity: next,
        }),
      );
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSizeActive(false);
  };

  const handleMemorySelect = (memory) => {
    setSelectedMemory(memory);
    setMemoryActive(false);
  };

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
    setStorageActive(false);
  };

  const updateMainImage = (image) => {
    if (image === selectedImage) return;

    setIsFading(true);
    setTimeout(() => {
      setSelectedImage(image);
      requestAnimationFrame(() => {
        setIsFading(false);
      });
    }, 300);
  };

  const handleAddToCart = () => {
    const priceStr = `$${Number(price.current).toLocaleString("en-US")}`;
    const priceOldStr = price.original
      ? `$${parseFloat(price.original).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : undefined;
    dispatch(
      addToCart({
        id: productId,
        image: selectedImage,
        title,
        price: priceStr,
        priceOld: priceOldStr,
        quantity: Number(quantity) || 1,
        selectedSize: variantSize,
        selectedColor: colorName,
      }),
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(ROUTES.SHOPING_CARD);
  };

  const handleToggleWishlist = () => {
    const priceStr = `$${Number(price.current).toLocaleString("en-US")}`;
    const priceOldStr = price.original
      ? `$${parseFloat(price.original).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : undefined;
    const availabilityTitle =
      facts.find((f) => f.label === "Availability:")?.title ?? "";
    const inStock = !availabilityTitle.toLowerCase().includes("out");
    dispatch(
      toggleWishlistItem({
        id: productId,
        image: selectedImage,
        title,
        price: priceStr,
        priceOld: priceOldStr,
        inStock,
      }),
    );
  };

  const handleToggleCompare = () => {
    const exists = compareItems.some((i) => i.id === productId);
    if (!exists && compareItems.length >= MAX_COMPARE_ITEMS) {
      window.alert(
        `You can compare up to ${MAX_COMPARE_ITEMS} products. Remove one on the compare page to add another.`,
      );
      return;
    }
    const priceStr = `$${Number(price.current).toLocaleString("en-US")}`;
    const priceOldStr = price.original
      ? `$${parseFloat(price.original).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : undefined;
    dispatch(
      toggleCompareItem({
        id: productId,
        image: selectedImage,
        title,
        price: priceStr,
        priceOld: priceOldStr,
        facts: facts.map((f) => ({ label: f.label, title: f.title })),
        ratingStars: rating.stars,
        ratingReviews: rating.totalReviews,
        variantSummary: variantSize,
        colorName,
      }),
    );
  };

  const handleThumbnailClick = (image, index) => {
    // Immediately update the main image when clicking thumbnail
    updateMainImage(image);

    // Navigate swiper to the clicked thumbnail
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleSlideChange = (swiper) => {
    const activeIndex =
      swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;
    const activeImage = allImages[activeIndex];

    // Update main image when slide changes (from arrow buttons or swipe)
    if (activeImage) {
      updateMainImage(activeImage);
    }
  };

  const swiperBreakpoints = useMemo(
    () => ({
      320: { slidesPerView: 4, spaceBetween: 8 },
      480: { slidesPerView: 5, spaceBetween: 8 },
      768: { slidesPerView: 6, spaceBetween: 12 },
      1024: { slidesPerView: 5, spaceBetween: 12 },
      1280: { slidesPerView: 6, spaceBetween: 12 },
    }),
    [],
  );

  return (
    <>
      <div className="container pt-8">
        <div className="grid grid-cols-12 gap-7.5 lg:gap-14">
          {/* Product Image Section */}
          <div className="col-span-12 xl:col-span-6 flex flex-col gap-4 sm:gap-6">
            {/* Main Image */}
            <div className="relative w-full aspect-square sm:aspect-515/317 border border-[#E4E7E9] rounded-sm bg-white overflow-hidden">
              <div className="absolute inset-4 sm:inset-8">
                <Image
                  key={allImages.indexOf(selectedImage)}
                  src={selectedImage}
                  alt={title}
                  fill
                  className={`object-contain transition-opacity duration-300 ease-in-out ${
                    isFading ? "opacity-0" : "opacity-100"
                  }`}
                  priority={selectedImage === images.mainImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={8}
                slidesPerView={4.5}
                navigation={false}
                pagination={false}
                speed={800}
                loop={false}
                className="product-details-swiper"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={handleSlideChange}
                breakpoints={swiperBreakpoints}
              >
                {allImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => handleThumbnailClick(image, index)}
                      className={`w-full aspect-square p-2 flex items-center justify-center border rounded-xs cursor-pointer transition-colors ${
                        selectedImage === image
                          ? "border-[#FA8232] border-2"
                          : "border-[#E4E7E9]"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="hidden md:block">
                <div
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="bg-[#FA8232] w-12 h-12 flex items-center justify-center border-[3px] border-white rounded-[50%] text-white absolute top-1/2 -translate-y-1/2 -left-6 z-50 cursor-pointer hover:bg-[#E0752C] transition-colors"
                >
                  <ArrowLeft width={24} height={24} />
                </div>
                <div
                  onClick={() => swiperRef.current?.slideNext()}
                  className="bg-[#FA8232] w-12 h-12 flex items-center justify-center border-[3px] border-white rounded-[50%] text-white absolute top-1/2 -translate-y-1/2 -right-6 z-50 cursor-pointer hover:bg-[#E0752C] transition-colors"
                >
                  <ArrowRight width={24} height={24} />
                </div>
              </div>
            </div>
          </div>
          {/* Product Info Section */}
          <div className="col-span-12 xl:col-span-6">
            {/* Rating */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3 sm:mb-2">
              <ul className="flex items-center gap-0.5">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <li key={i}>{rating.startIcon}</li>
                  ))}
              </ul>
              <p className="text-sm font-semibold">{rating.stars}</p>
              <p className="text-sm text-[#5F6C72] mt-1 lg:mt-0">
                {rating.totalReviews}
              </p>
            </div>
            {/* Product Title */}
            <h1 className="text-xl font-normal text-[#191C1F]">{title}</h1>
            {/* Product Facts */}
            <div className="grid grid-cols-12 gap-2 mt-4">
              {facts.map((fact, index) => (
                <div
                  key={index}
                  className="col-span-12 sm:col-span-6 flex items-center gap-1"
                >
                  <p className="text-sm text-[#5F6C72]">{fact.label}</p>
                  <p className="text-sm text-[#191C1F] font-semibold">
                    {fact.title}
                  </p>
                </div>
              ))}
            </div>
            {/* Product Price */}
            <div className="flex items-center gap-3 border-b border-[#E4E7E9] pb-6 mt-6">
              <div className="flex items-center gap-1">
                <p className="text-2xl font-semibold text-[#2DA5F3]">
                  ${price.current}
                </p>
                <p className="text-lg text-[#77878F] line-through">
                  ${price.original}
                </p>
              </div>
              <p className="py-1.25 px-2.5 bg-[#EFD33D] text-[#191C1F] text-sm font-semibold rounded-xs">
                {price.discount}
              </p>
            </div>
            {/* Product Options */}
            <div className="grid grid-cols-12 gap-4 lg:gap-x-6 lg:gap-y-4 mt-6">
              {/* color options */}
              <div className="col-span-12 sm:col-span-6">
                <p className="text-sm text-[#191C1F] mb-2">Color</p>
                <div className="flex items-center gap-3">
                  {options.colors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-11 h-11 rounded-full grid place-content-center cursor-pointer transition-colors ${
                        selectedColor === index
                          ? "border-2 border-[#FA8232]"
                          : "border-2 border-transparent"
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: color.value }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              {/* size options */}
              <div className="col-span-12 sm:col-span-6">
                <p className="text-sm text-[#191C1F] mb-2">Size</p>
                <div className="relative" ref={sizeBtnRef}>
                  <button
                    onClick={() => setSizeActive(!sizeActive)}
                    className="border-2! border-[#E4E7E9]! rounded-xs flex items-center justify-between h-11 px-3 w-full cursor-pointer"
                  >
                    <span className="text-sm! text-[#475156]">
                      {selectedSize}
                    </span>
                    <Image
                      src={assets.CaretDown_Gray}
                      width={16}
                      height={16}
                      alt=""
                      className={`transition-transform duration-300 ${
                        sizeActive ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-12 w-full z-10 bg-white border border-[#E4E7E9] 
                      rounded-[5px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)]
                      transition-all duration-400 ease-out origin-top
                      ${
                        sizeActive
                          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                  >
                    <ul>
                      {options.size.map((size, index) => (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => handleSizeSelect(size)}
                            className={`w-full text-left text-sm! font-medium leading-5 py-2.5 px-5 flex items-center justify-between cursor-pointer hover:bg-[#F2F4F5]! ${
                              selectedSize === size
                                ? "bg-[#F2F4F5]! font-semibold! text-[#212529]!"
                                : "text-[#6c757d]! hover:text-[#212529]!"
                            }`}
                          >
                            {size}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* memory options */}
              <div className="col-span-12 sm:col-span-6">
                <p className="text-sm text-[#191C1F] mb-2">Memory</p>
                <div className="relative" ref={memoryBtnRef}>
                  <button
                    onClick={() => setMemoryActive(!memoryActive)}
                    className="border-2! border-[#E4E7E9]! rounded-xs flex items-center justify-between h-11 px-4 w-full cursor-pointer"
                  >
                    <span className="text-sm! text-[#475156]">
                      {selectedMemory}
                    </span>
                    <Image
                      src={assets.CaretDown_Gray}
                      width={16}
                      height={16}
                      alt=""
                      className={`transition-transform duration-300 ${
                        memoryActive ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-12 w-full z-10 bg-white border border-[#E4E7E9] 
                      rounded-[5px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)]
                      transition-all duration-400 ease-out origin-top
                      ${
                        memoryActive
                          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                  >
                    <ul>
                      {options.memory.map((memory, index) => (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => handleMemorySelect(memory)}
                            className={`w-full text-left text-sm! font-medium leading-5 py-2.5 px-5 flex items-center justify-between cursor-pointer hover:bg-[#F2F4F5]! ${
                              selectedMemory === memory
                                ? "bg-[#F2F4F5]! font-semibold! text-[#212529]!"
                                : "text-[#6c757d]! hover:text-[#212529]!"
                            }`}
                          >
                            {memory}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* storage options */}
              <div className="col-span-12 sm:col-span-6">
                <p className="text-sm text-[#191C1F] mb-2">Storage</p>
                <div className="relative" ref={storageBtnRef}>
                  <button
                    onClick={() => setStorageActive(!storageActive)}
                    className="border-2! border-[#E4E7E9]! rounded-xs flex items-center justify-between h-11 px-4 w-full cursor-pointer"
                  >
                    <span className="text-sm! text-[#475156]">
                      {selectedStorage}
                    </span>
                    <Image
                      src={assets.CaretDown_Gray}
                      width={16}
                      height={16}
                      alt=""
                      className={`transition-transform duration-300 ${
                        storageActive ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute top-12 w-full z-10 bg-white border border-[#E4E7E9] 
                      rounded-[5px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)]
                      transition-all duration-400 ease-out origin-top
                      ${
                        storageActive
                          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }`}
                  >
                    <ul>
                      {options.storage.map((storage, index) => (
                        <li key={index}>
                          <button
                            type="button"
                            onClick={() => handleStorageSelect(storage)}
                            className={`w-full text-left text-sm! font-medium leading-5 py-2.5 px-5 flex items-center justify-between cursor-pointer hover:bg-[#F2F4F5]! ${
                              selectedStorage === storage
                                ? "bg-[#F2F4F5]! font-semibold! text-[#212529]!"
                                : "text-[#6c757d]! hover:text-[#212529]!"
                            }`}
                          >
                            {storage}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Quantity */}
            <div className="grid grid-cols-12 gap-4 w-full mt-6">
              {/* Quantity Button */}
              <div className="col-span-12 sm:col-span-3 flex items-center justify-between h-14 py-4 px-5 border-2! border-[#E4E7E9]! rounded-[3px]!">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="cursor-pointer"
                  disabled={quantity <= 1}
                >
                  <Image
                    src={assets.Minus}
                    alt="decrease quantity"
                    width={16}
                    height={16}
                    className={quantity <= 1 ? "opacity-50" : ""}
                  />
                </button>
                <span className="text-base text-[#475156]">
                  {quantity.toString().padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="cursor-pointer"
                >
                  <Image
                    src={assets.Plus}
                    alt="increase quantity"
                    width={16}
                    height={16}
                  />
                </button>
              </div>
              {/* Add to cart button */}
              <div className="col-span-12 sm:col-span-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="group/icon relative w-full flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white h-14 text-base leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F] cursor-pointer"
                >
                  Add to Cart
                  <div className="relative w-6 h-6">
                    <Image
                      src={assets.Cart_White}
                      alt="cart-white"
                      width={24}
                      height={24}
                      className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                    />
                    <Image
                      src={assets.Cart_Black}
                      alt="cart-black"
                      width={24}
                      height={24}
                      className="absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                    />
                  </div>
                </button>
              </div>
              {/* buy now button */}
              <div className="col-span-12 sm:col-span-3">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-transparent text-[#FA8232] h-14 text-base leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-[#FA8232] hover:text-white cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-y-2.5 sm:gap-y-0 mt-6">
              <div className="flex items-center gap-6">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex items-center gap-1.5 cursor-pointer"
                    onClick={() => {
                      if (action.label === "Add to Wishlist") {
                        handleToggleWishlist();
                      }
                      if (action.label === "Add to Compare") {
                        handleToggleCompare();
                      }
                    }}
                  >
                    <Image
                      src={action.icon}
                      alt={action.label}
                      width={24}
                      height={24}
                    />
                    <span className="text-sm text-[#475156]">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
              {/* Share Product */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#475156]">
                  {shareProduct.label}
                </span>
                <div className="flex items-center gap-3">
                  {shareProduct.icons.map((icon, iconIndex) => (
                    <Image
                      key={iconIndex}
                      src={icon}
                      alt={shareProduct.label}
                      width={iconIndex === 0 ? 24 : 16}
                      height={iconIndex === 0 ? 24 : 16}
                      className="cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Product Guarantee */}
            <div className="flex flex-col gap-3 border border-[#E4E7E9] rounded-[3px] p-5 mt-6">
              <p>{guarantee}</p>
              <Image
                src={paymentMethod}
                alt="payment-method"
                width={312}
                height={18}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
