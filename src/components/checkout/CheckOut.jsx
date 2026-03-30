"use client";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { ArrowRight } from "../svg/Icons";

const parsePrice = (value) =>
  parseFloat(String(value ?? "0").replace(/[^0-9.]/g, "")) || 0;

const formatMoney = (n) =>
  `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const itemLineKey = (item) =>
  `${item.id}-${item.selectedSize ?? ""}-${item.selectedColor ?? ""}`;

const CheckOut = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [shipDifferentAddress, setShipDifferentAddress] = useState(false);

  const paymentOptions = [
    { id: 1, name: "Cash on Delivery", icon: assets.CurrencyDollar },
    { id: 2, name: "Venmo", icon: assets.venmo },
    { id: 3, name: "Paypal", icon: assets.paypall },
    { id: 4, name: "Amazon Pay", icon: assets.AmazonPay },
    { id: 5, name: "Debid/Credit Card", icon: assets.CreditCardicon },
  ];
  const [selectedPayment, setSelectedPayment] = useState(null);

  const togglePaymentOption = (option) => {
    setSelectedPayment(option);
    setValue("payment_option", option.id, { shouldValidate: true });
  };

  const cartItems = useSelector((state) => state.cart.cartItems);

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
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    router.push(ROUTES.CHECK_OUT_SUCCESS);
  };
  return (
    <>
      <div className="container py-18">
        <div className="grid grid-cols-12 gap-6">
          {/* checkout form */}
          <div className="col-span-12 lg:col-span-8">
            <form
              id="checkout-form"
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-12"
            >
              <div className="col-span-12 mb-6">
                <h2 className="text-lg font-medium text-[#191C1F]">
                  Billing Information
                </h2>
              </div>
              {/* Biliing infromation */}
              <div className="col-span-12">
                {/* Username, Last Name, Company Name */}
                <div className="grid grid-cols-12 gap-4">
                  {/* first name */}
                  <div className="col-span-12 md:col-span-6 lg:col-span-3">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...register("first_name", {
                        required: "First name is required",
                        minLength: {
                          value: 3,
                          message: "First name must be at least 3 characters",
                        },
                      })}
                      placeholder="First name"
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  {/* Last name */}
                  <div className="col-span-12 md:col-span-6 lg:col-span-3">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...register("last_name", {
                        required: "Last name is required",
                        minLength: {
                          value: 3,
                          message: "Last name must be at least 3 characters",
                        },
                      })}
                      placeholder="Last name"
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                  {/* Company name */}
                  <div className="col-span-12 md:col-span-6 lg:col-span-6">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Company Name{" "}
                      <span className="text-[#929FA5]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...register("company_name")}
                      placeholder="Company name"
                    />
                  </div>
                </div>
              </div>
              {/* address */}
              <div className="col-span-12 mt-4">
                <label
                  htmlFor="email"
                  className="text-sm font-normal leading-5 text-[#191C1F]"
                >
                  Address
                </label>
                <input
                  type="text"
                  className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 3,
                      message: "Address must be at least 3 characters",
                    },
                  })}
                  placeholder="Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              {/* State infromation */}
              <div className="col-span-12 mt-4">
                {/* country, state, city, zip code */}
                <div className="grid grid-cols-12 gap-4">
                  {/* country name */}
                  <div className="col-span-12 md:col-span-6 lg:col-span-3">
                    <label
                      htmlFor="country"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...register("country", {
                        required: "Country is required",
                        minLength: {
                          value: 3,
                          message: "Country must be at least 3 characters",
                        },
                      })}
                      placeholder="Country"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                  {/* Region/State */}
                  <div className="col-span-12 md:col-span-6 lg:col-span-3">
                    <label
                      htmlFor="state"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Region/State
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...register("state", {
                        required: "State is required",
                        minLength: {
                          value: 3,
                          message: "State must be at least 3 characters",
                        },
                      })}
                      placeholder="State"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  {/* City */}
                  <div className="col-span-12 md:col-span-6 lg:col-span-3">
                    <label
                      htmlFor="city"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...register("city", {
                        required: "City is required",
                        minLength: {
                          value: 3,
                          message: "City must be at least 3 characters",
                        },
                      })}
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  {/* Zip Code */}
                  <div className="col-span-12 md:col-span-6 lg:col-span-3">
                    <label
                      htmlFor="zip_code"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...register("zip_code", {
                        required: "Zip code is required",
                        pattern: {
                          value: /^\d{5}(?:[-\s]\d{4})?$/,
                          message:
                            "Please enter a valid Zip code (e.g., 12345 or 12345-6789)",
                        },
                      })}
                      placeholder="Zip code"
                    />
                    {errors.zip_code && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.zip_code.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Email and Phone Number */}
              <div className="col-span-12 mt-4">
                <div className="grid grid-cols-12 gap-4">
                  {/* Email */}
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Email
                    </label>
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
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  {/* Phone Number */}
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="phone"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: "Enter a valid 11-digit phone number",
                        },
                      })}
                      placeholder="Phone Number"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Ship different address */}
              <div className="col-span-12 mt-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shipDifferentAddress}
                      onChange={() =>
                        setShipDifferentAddress(!shipDifferentAddress)
                      }
                      className="hidden!"
                    />

                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border border-[#C9CFD2] rounded-xs flex items-center justify-center transition-all duration-300 ${
                        shipDifferentAddress
                          ? "bg-[#FA8232] border-[#FA8232]"
                          : "bg-transparent border-[#C9CFD2]"
                      }`}
                    >
                      {shipDifferentAddress && (
                        <Image
                          src={assets.Check_white}
                          alt="check-icon"
                          width={14}
                          height={14}
                        />
                      )}
                    </div>

                    <span className="text-sm text-[#475156]">
                      Ship into different address
                    </span>
                  </label>
                </div>
              </div>
              {/* paymnet options */}
              <div className="col-span-12 mt-10">
                <div className="border border-[#E4E7E9] rounded-sm">
                  <div className="py-5 px-8">
                    <h2 className="text-lg font-medium text-[#191C1F]">
                      Payment Option
                    </h2>
                  </div>
                  {/* payment options list */}
                  <div className="border-t border-[#E4E7E9]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                      {paymentOptions.map((option) => {
                        const isChecked = selectedPayment?.id === option.id;

                        return (
                          <label
                            key={option.id}
                            className="border-r border-[#E4E7E9] col-span-1 flex flex-col items-center justify-between py-6 last:border-r-0 cursor-pointer"
                          >
                            <div className="flex flex-col items-center justify-center">
                              <div className="h-8 flex items-center justify-center mb-3">
                                <Image
                                  src={option.icon}
                                  alt={option.name}
                                  width={32}
                                  height={32}
                                  className="object-contain"
                                />
                              </div>

                              <span className="text-sm text-[#191C1F] font-medium mb-4 text-center">
                                {option.name}
                              </span>
                            </div>

                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => togglePaymentOption(option)}
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
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {/* Hidden input to track validation */}
              <input
                type="hidden"
                {...register("payment_option", {
                  required: "Please select at least one payment option",
                })}
              />
              {errors.payment_option && (
                <div className="col-span-12">
                  <p className="text-red-500 text-sm mt-1">
                    {errors.payment_option.message}
                  </p>
                </div>
              )}
              {/* Additional Notes */}
              <div className="col-span-12 mt-10">
                <h2 className="text-lg font-medium text-[#191C1F] mb-6">
                  Additional Information
                </h2>
                {/* Company name */}
                <div className="col-span-6">
                  <label
                    htmlFor="email"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Order Notes{" "}
                    <span className="text-[#929FA5]">(Optional)</span>
                  </label>
                  <textarea
                    id="order_notes"
                    rows={4}
                    className="w-full rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 py-3 placeholder-text resize-none"
                    {...register("order_notes")}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                </div>
              </div>
            </form>
          </div>
          {/* Order Summary */}
          <div className="col-span-12 lg:col-span-4">
            <div className="border border-[#E4E7E9] rounded-sm space-y-6 p-6">
              <h2 className="text-lg font-medium text-[#191C1F] mb-6">
                Order Summery
              </h2>
              {/* cart item */}
              <div className="grid grid-cols-12 gap-4">
                {cartItems.map((cart) => (
                  <div
                    key={itemLineKey(cart)}
                    className="col-span-12 flex items-center gap-4"
                  >
                    <div className="relative w-16 h-16 shrink-0">
                      <Image
                        src={cart.image}
                        alt={cart.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-sm leading-5 text-[#212529] font-normal line-clamp-1">
                        {cart.title}
                      </p>
                      <span>
                        <span className="text-[#5F6C72] text-sm leading-5 font-normal">
                          {cart.quantity} x
                        </span>
                        <span className="text-sm leading-5 font-semibold text-[#2DA5F3] ml-1">
                          {cart.price}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* cart total */}
              <div>
                <div className="space-y-3 border-b border-[#E4E7E9] pb-4 mb-4">
                  {cartTotal.map((total) => (
                    <div
                      key={total.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-[#191C1F] text-sm leading-5 font-normal">
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
              <button
                type="submit"
                form="checkout-form"
                className="w-full flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white h-12 text-[14px] leading-px uppercase font-bold rounded-[3px] cursor-pointer duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F] hover:border-[#FA8232]"
              >
                Place order
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
