"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { ArrowLeft, ArrowRight } from "../svg/Icons";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/services/cartSlice";

const parsePrice = (value) =>
  parseFloat(String(value ?? "0").replace(/[^0-9.]/g, "")) || 0;

const formatMoney = (n) =>
  `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const itemLineKey = (item) =>
  `${item.id}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`;

const ShopingCard = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const subtotalValue = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + parsePrice(item.price) * item.quantity,
        0,
      ),
    [cartItems],
  );

  const cartTotal = useMemo(
    () => [
      { id: 1, title: "Subtotal", price: formatMoney(subtotalValue) },
      { id: 2, title: "Shipping", price: "Free" },
      { id: 3, title: "Discount", price: formatMoney(0) },
      { id: 4, title: "Tax", price: formatMoney(0) },
    ],
    [subtotalValue],
  );

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity <= 1) return;
    dispatch(
      updateQuantity({
        id: item.id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        quantity: item.quantity - 1,
      }),
    );
  };

  const handleRemove = (item) => {
    dispatch(
      removeFromCart({
        id: item.id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      }),
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <>
      <div className="container py-18">
        <div className="grid grid-cols-12 gap-6">
          {/* shopping card */}
          <div className="col-span-12 lg:col-span-8">
            <div className="w-full border border-[#E4E7E9] rounded-sm overflow-x-auto">
              <h6 className="text-lg font-medium text-[#191C1F] py-5 px-6">
                Shopping Card
              </h6>
              <table className="w-full">
                {/* table header */}
                <thead>
                  <tr className="flex items-center gap-4.5 bg-[#F2F4F5] border-t border-b border-[#E4E7E9] py-2.5 px-6">
                    <th className="w-95 text-left text-[#475156] text-[12px] font-medium uppercase">
                      Products
                    </th>
                    <th className="w-22 text-[#475156] text-[12px] font-medium uppercase text-left">
                      Price
                    </th>
                    <th className="w-43 text-[#475156] text-[12px] font-medium uppercase text-left">
                      Quantity
                    </th>
                    <th className="w-28 text-[#475156] text-[12px] font-medium uppercase text-left">
                      Sub-Total
                    </th>
                  </tr>
                </thead>
                {/* table body */}
                <tbody className="flex flex-col border-b border-[#E4E7E9] p-6 space-y-6">
                  {cartItems.length === 0 ? (
                    <tr className="flex">
                      <td className="w-full py-8 text-center text-sm text-[#6c757d]">
                        Your cart is empty.{" "}
                        <Link
                          href={ROUTES.SHOP}
                          className="text-[#2DA5F3] font-medium"
                        >
                          Continue shopping
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    cartItems.map((item) => (
                      <tr
                        key={itemLineKey(item)}
                        className="flex items-center gap-4.5"
                      >
                        <td className="w-95">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleRemove(item)}
                              className="cursor-pointer shrink-0"
                              aria-label="Remove item"
                            >
                              <Image
                                src={assets.XCircle}
                                alt="Remove"
                                width={24}
                                height={24}
                              />
                            </button>
                            <div className="relative w-18 h-18 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.title ?? "Product"}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <h6 className="text-sm text-[#191C1F] line-clamp-2">
                              {item.title}
                            </h6>
                          </div>
                        </td>
                        <td className="w-22">
                          <p className="text-[#191C1F] text-[14px] leading-5">
                            {item.priceOld && (
                              <del className="text-[#929FA5] mr-1">
                                {item.priceOld}
                              </del>
                            )}
                            {item.price}
                          </p>
                        </td>
                        <td className="w-43 pr-6">
                          <div className="flex items-center justify-between h-14 py-3 px-5 border-2! border-[#E4E7E9]! rounded-[3px]!">
                            <button
                              type="button"
                              onClick={() => handleDecrement(item)}
                              className="cursor-pointer"
                              disabled={item.quantity <= 1}
                            >
                              <Image
                                src={assets.Minus}
                                alt="decrease quantity"
                                width={16}
                                height={16}
                                className={
                                  item.quantity <= 1 ? "opacity-50" : ""
                                }
                              />
                            </button>
                            <span className="text-base text-[#475156]">
                              {item.quantity.toString().padStart(2, "0")}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleIncrement(item)}
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
                        </td>
                        <td className="w-28">
                          <p className="text-[#191C1F] text-[14px] leading-5">
                            {formatMoney(
                              parsePrice(item.price) * item.quantity,
                            )}
                          </p>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                {/* table footer */}
                <tfoot>
                  <tr>
                    <td className="flex items-center justify-between p-6">
                      <Link
                        href={ROUTES.SHOP}
                        className="inline-flex items-center gap-2 border-2 border-[#2DA5F3] bg-transparent text-[#2DA5F3] px-6 h-13 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear  hover:bg-[#2DA5F3] hover:text-white"
                      >
                        <ArrowLeft />
                        Return to Shop
                      </Link>
                      <Link
                        href={ROUTES.SHOPING_CARD}
                        className="inline-flex items-center gap-2 border-2 border-[#2DA5F3] bg-transparent text-[#2DA5F3] px-6 h-13 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear  hover:bg-[#2DA5F3] hover:text-white"
                      >
                        Update cart
                      </Link>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          {/* card total */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="border border-[#E4E7E9] rounded-sm space-y-6 p-6">
              <h2 className="text-lg font-medium text-[#191C1F] mb-6">
                Card Totals
              </h2>
              {/* cart total */}
              <div>
                <div className="space-y-3 border-b border-[#E4E7E9] pb-4 mb-4">
                  {cartTotal.map((total) => (
                    <div
                      key={total.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[#5F6C72] text-sm leading-5 font-normal">
                        {total.title}:
                      </span>
                      <span className="text-[#191C1F] text-sm leading-5 font-medium">
                        {total.price}
                      </span>
                    </div>
                  ))}
                </div>
                {/* total */}
                <div className="flex items-center justify-between">
                  <span className="text-[#191C1F] text-sm leading-5 font-normal">
                    Total
                  </span>
                  <span className="text-[#191C1F] text-sm leading-5 font-medium">
                    {formatMoney(subtotalValue)} USD
                  </span>
                </div>
              </div>
              <Link
                href={ROUTES.CHECK_OUT}
                className="flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white h-12 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F] hover:border-[#FA8232]"
              >
                Proceed to Checkout
                <ArrowRight />
              </Link>
            </div>
            {/* card coupon */}
            <div className="border border-[#E4E7E9] rounded-sm">
              <h2 className="text-lg font-medium text-[#191C1F] border-b border-[#E4E7E9] py-4.5 px-6">
                Coupon Code
              </h2>
              {/* coupon field */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
                {/* Email */}
                <div>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address including @",
                      },
                    })}
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* submit button */}
                <button
                  type="submit"
                  className="inline-flex items-center cursor-pointer gap-2 border-2 border-[#2DA5F3] bg-[#2DA5F3] text-white px-6 h-13 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear  hover:bg-transparent hover:text-[#2DA5F3]"
                >
                  Apply Coupon
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopingCard;
