import React from "react";
import Image from "next/image";
import { assets } from "@/constants/assets";

const WishListTable = () => {
  return (
    <>
      <div className="container py-18">
        <div className="w-full border border-[#E4E7E9] rounded-sm overflow-x-auto">
          <h6 className="text-lg font-medium text-[#191C1F] py-5 px-6">
            Wishlist
          </h6>
          <table className="w-full">
            {/* table header */}
            <thead>
              <tr className="flex bg-[#F2F4F5] border-t border-b border-[#E4E7E9] py-2.5 px-6">
                <th className="w-144.75 text-left text-[#475156] text-[12px] font-medium uppercase">
                  Products
                </th>
                <th className="w-50 text-[#475156] text-[12px] font-medium uppercase text-left">
                  Price
                </th>
                <th className="w-50 text-[#475156] text-[12px] font-medium uppercase text-left">
                  Stock Status
                </th>
                <th className="w-50 text-[#475156] text-[12px] font-medium uppercase text-left">
                  Action
                </th>
              </tr>
            </thead>
            {/* table body */}
            <tbody className="flex flex-col p-6 space-y-6">
              <tr className="flex items-center">
                <td className="w-144.75">
                  <div className="flex items-center gap-4 pr-18">
                    <div className="relative w-18 h-18 shrink-0">
                      <Image
                        src={assets.product_1}
                        alt="product"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h6 className="text-sm text-[#475156]">
                        Bose Sport Earbuds - Wireless Earphones - Bluetooth In
                        Ear Headphones for Workouts and Running, Triple Black
                      </h6>
                    </div>
                  </div>
                </td>
                <td className="w-50">
                  <p className="text-[#191C1F] text-[14px] leading-5 font-semibold">
                    <del className="text-[#929FA5] mr-1">$1299</del>
                    $999
                  </p>
                </td>
                <td className="w-50">
                  <p className="text-[#2DB224] text-[14px] leading-5 font-semibold uppercase">
                    In Stock
                  </p>
                </td>
                <td className="w-50">
                  <div className="flex items-center gap-6">
                    <button className="group/icon relative flex items-center justify-center shrink-0 gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white text-sm w-44 h-12 cursor-pointer leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]">
                      Add to Cart
                      <div className="relative w-6 h-6">
                        <Image
                          src={assets.Cart_White}
                          alt="cart-white"
                          width={20}
                          height={20}
                          className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Cart_Black}
                          alt="cart-black"
                          width={20}
                          height={2420}
                          className="absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                        />
                      </div>
                    </button>
                    <button className="cursor-pointer shrink-0">
                      <Image
                        src={assets.XCircle}
                        alt="XCircle"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="flex items-center">
                <td className="w-144.75">
                  <div className="flex items-center gap-4 pr-18">
                    <div className="relative w-18 h-18 shrink-0">
                      <Image src={assets.product_4} alt="product" fill />
                    </div>
                    <div>
                      <h6 className="text-sm text-[#475156]">
                        Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone
                      </h6>
                    </div>
                  </div>
                </td>
                <td className="w-50">
                  <p className="text-[#191C1F] text-[14px] leading-5 font-semibold">
                    $2,300.00
                  </p>
                </td>
                <td className="w-50">
                  <p className="text-[#2DB224] text-[14px] leading-5 font-semibold uppercase">
                    In Stock
                  </p>
                </td>
                <td className="w-50">
                  <div className="flex items-center gap-6">
                    <button className="group/icon relative flex items-center justify-center shrink-0 gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white text-sm w-44 h-12 cursor-pointer leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]">
                      Add to Cart
                      <div className="relative w-6 h-6">
                        <Image
                          src={assets.Cart_White}
                          alt="cart-white"
                          width={20}
                          height={20}
                          className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Cart_Black}
                          alt="cart-black"
                          width={20}
                          height={2420}
                          className="absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                        />
                      </div>
                    </button>
                    <button className="cursor-pointer shrink-0">
                      <Image
                        src={assets.XCircle}
                        alt="XCircle"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="flex items-center">
                <td className="w-144.75">
                  <div className="flex items-center gap-4 pr-18">
                    <div className="relative w-18 h-18 shrink-0">
                      <Image src={assets.product_17} alt="product" fill />
                    </div>
                    <div>
                      <h6 className="text-sm text-[#475156]">
                        Portable Wshing Machine, 11lbs capacity Model 18NMFIAM
                      </h6>
                    </div>
                  </div>
                </td>
                <td className="w-50">
                  <p className="text-[#191C1F] text-[14px] leading-5 font-semibold">
                    $70.00
                  </p>
                </td>
                <td className="w-50">
                  <p className="text-[#2DB224] text-[14px] leading-5 font-semibold uppercase">
                    In Stock
                  </p>
                </td>
                <td className="w-50">
                  <div className="flex items-center gap-6">
                    <button className="group/icon relative flex items-center justify-center shrink-0 gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white text-sm w-44 h-12 cursor-pointer leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]">
                      Add to Cart
                      <div className="relative w-6 h-6">
                        <Image
                          src={assets.Cart_White}
                          alt="cart-white"
                          width={20}
                          height={20}
                          className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Cart_Black}
                          alt="cart-black"
                          width={20}
                          height={2420}
                          className="absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                        />
                      </div>
                    </button>
                    <button className="cursor-pointer shrink-0">
                      <Image
                        src={assets.XCircle}
                        alt="XCircle"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="flex items-center">
                <td className="w-144.75">
                  <div className="flex items-center gap-4 pr-18">
                    <div className="relative w-18 h-18 shrink-0">
                      <Image src={assets.ps5} alt="product" fill />
                    </div>
                    <div>
                      <h6 className="text-sm text-[#475156]">
                        TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch
                        Control with Wireless Charging Case IPX8 Waterproof
                        Stereo Earphones in-Ear
                      </h6>
                    </div>
                  </div>
                </td>
                <td className="w-50">
                  <p className="text-[#191C1F] text-[14px] leading-5 font-semibold">
                    <del className="text-[#929FA5] mr-1">$250.00</del>
                    $220.00
                  </p>
                </td>
                <td className="w-50">
                  <p className="text-[#2DB224] text-[14px] leading-5 font-semibold uppercase">
                    In Stock
                  </p>
                </td>
                <td className="w-50">
                  <div className="flex items-center gap-6">
                    <button className="group/icon relative flex items-center justify-center shrink-0 gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white text-sm w-44 h-12 cursor-pointer leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]">
                      Add to Cart
                      <div className="relative w-6 h-6">
                        <Image
                          src={assets.Cart_White}
                          alt="cart-white"
                          width={20}
                          height={20}
                          className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Cart_Black}
                          alt="cart-black"
                          width={20}
                          height={2420}
                          className="absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                        />
                      </div>
                    </button>
                    <button className="cursor-pointer shrink-0">
                      <Image
                        src={assets.XCircle}
                        alt="XCircle"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="flex items-center">
                <td className="w-144.75">
                  <div className="flex items-center gap-4 pr-18">
                    <div className="relative w-18 h-18 shrink-0">
                      <Image src={assets.product_7} alt="product" fill />
                    </div>
                    <div>
                      <h6 className="text-sm text-[#475156]">
                        Wyze Cam Pan v2 1080p Pan/Tilt/Zoom Wi-Fi Indoor Smart
                        Home Camera with Color Night Vision, 2-Way Audio
                      </h6>
                    </div>
                  </div>
                </td>
                <td className="w-50">
                  <p className="text-[#191C1F] text-[14px] leading-5 font-semibold">
                    $1,499.99
                  </p>
                </td>
                <td className="w-50">
                  <p className="text-[#2DB224] text-[14px] leading-5 font-semibold uppercase">
                    In Stock
                  </p>
                </td>
                <td className="w-50">
                  <div className="flex items-center gap-6">
                    <button className="group/icon relative flex items-center justify-center shrink-0 gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white text-sm w-44 h-12 cursor-pointer leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F]">
                      Add to Cart
                      <div className="relative w-6 h-6">
                        <Image
                          src={assets.Cart_White}
                          alt="cart-white"
                          width={20}
                          height={20}
                          className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                        />
                        <Image
                          src={assets.Cart_Black}
                          alt="cart-black"
                          width={20}
                          height={2420}
                          className="absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                        />
                      </div>
                    </button>
                    <button className="cursor-pointer shrink-0">
                      <Image
                        src={assets.XCircle}
                        alt="XCircle"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WishListTable;
