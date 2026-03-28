"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/services/cartSlice";
import { removeFromWishlist } from "@/redux/services/wishlistSlice";

const WishListTable = () => {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    const { inStock: _inStock, ...product } = item;
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <>
      <div className="container py-18">
        <div className="w-full border border-[#E4E7E9] rounded-sm overflow-x-auto">
          <h6 className="text-lg font-medium text-[#191C1F] py-5 px-6">
            Wishlist
          </h6>
          <table className="w-full">
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
            <tbody className="flex flex-col p-6 space-y-6">
              {items.length === 0 ? (
                <tr className="flex">
                  <td className="w-full py-10 text-center text-sm text-[#6c757d]">
                    Your wishlist is empty.{" "}
                    <Link
                      href={ROUTES.SHOP}
                      className="text-[#2DA5F3] font-medium"
                    >
                      Continue shopping
                    </Link>
                  </td>
                </tr>
              ) : (
                items.map((item) => {
                  const inStock = item.inStock !== false;
                  return (
                    <tr key={item.id} className="flex items-center">
                      <td className="w-144.75">
                        <div className="flex items-center gap-4 pr-18">
                          <div className="relative w-18 h-18 shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title ?? "Product"}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h6 className="text-sm text-[#475156] line-clamp-1">
                              {item.title}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td className="w-50">
                        <p className="text-[#191C1F] text-[14px] leading-5 font-semibold">
                          {item.priceOld && (
                            <del className="text-[#929FA5] mr-1">
                              {item.priceOld}
                            </del>
                          )}
                          {item.price}
                        </p>
                      </td>
                      <td className="w-50">
                        <p
                          className={`text-[14px] leading-5 font-semibold uppercase ${
                            inStock ? "text-[#2DB224]" : "text-[#EE5858]"
                          }`}
                        >
                          {inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </td>
                      <td className="w-50">
                        <div className="flex items-center gap-6">
                          <button
                            type="button"
                            disabled={!inStock}
                            onClick={() => handleAddToCart(item)}
                            className="group/icon relative flex items-center justify-center shrink-0 gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white text-sm w-44 h-12 cursor-pointer leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F] disabled:opacity-50 disabled:pointer-events-none"
                          >
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
                                height={20}
                                className="absolute top-0 left-0 transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                              />
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(removeFromWishlist(item.id))
                            }
                            className="cursor-pointer shrink-0"
                            aria-label="Remove from wishlist"
                          >
                            <Image
                              src={assets.XCircle}
                              alt="Remove"
                              width={24}
                              height={24}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default WishListTable;
