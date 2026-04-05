"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { ArrowLeft, Cross, PlusIcon, Star } from "@/components/svg/Icons";
import Image from "next/image";
import { trackOrderDetailData } from "@/data/track-order-details/track-order-detail";
import { assets } from "@/constants/assets";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";

const page = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const sizeBtnRef = useRef(null);
  const options = {
    rate: [
      "5 Star Rating",
      "4 Star Rating",
      "3 Star Rating",
      "2 Star Rating",
      "1 Star Rating",
    ],
  };
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeActive, setSizeActive] = useState(false);
  const handleSizeSelect = (rate) => {
    setSelectedSize(rate);
    setValue("rating", rate, { shouldValidate: true });
    setSizeActive(false);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sizeBtnRef.current && !sizeBtnRef.current.contains(e.target)) {
        setSizeActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const {
    orderSummary,
    expectedArrival,
    expectedArrivalDate,
    progressStages,
    orderActivity,
  } = trackOrderDetailData;
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setOpenDialog(false);
  };
  // dummy order itme
  const orderItems = [
    {
      id: 1,
      image: assets.product_34,
      category: "SMARTPHONE",
      title:
        "Google Pixel 6 Pro - 5G Android Phone - Unlocked Smartphone with Advanced Pixel C...",
      price: "$899",
      quantity: "1",
      subTotal: "$899",
    },
    {
      id: 2,
      image: assets.product_46,
      category: "ACCESSORIES",
      title:
        "Tech21 Evo Clear for Google Pixel 6 Pro – Crystal Clear Phone Case with 12ft Multi-Dr...",
      price: "$39",
      quantity: "1",
      subTotal: "$39",
    },
  ];
  return (
    <>
      <div className="border border-[#E4E7E9] rounded-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <Link
            href={ROUTES.ORDER_HISTORY}
            className="text-sm text-[#191C1F] font-semibold flex items-center gap-2.5 uppercase duration-500 ease-linear hover:text-[#FA8232]"
          >
            <ArrowLeft width={22} height={22} />
            Order Details
          </Link>
          <button
            className="text-sm text-[#FA8232] font-semibold flex items-center gap-2 duration-500 ease-linear cursor-pointer hover:text-[#2DA5F3]"
            onClick={() => setOpenDialog(true)}
          >
            Leave a Rating
            <PlusIcon />
          </button>
        </div>
        <div className="p-6 space-y-6 border-b border-t border-[#E4E7E9]">
          {/* order-details */}
          <div className="bg-[#FDFAE7] border border-[#F7E99E] p-6 rounded-sm flex flex-wrap items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl text-[#191C1F]">{orderSummary.orderId}</h3>
              <p className="text-[#475156] text-sm">{orderSummary.details}</p>
            </div>
            <p className="text-xl md:text-[28px] font-semibold text-[#2DA5F3] mt-3 md:mt-0">
              {orderSummary.totalPrice}
            </p>
          </div>
          {/* expectedArrivalDate */}
          <p className="text-[#475156] text-sm">
            {expectedArrival}{" "}
            <span className="text-[#191C1F] font-semibold">
              {expectedArrivalDate}
            </span>
          </p>
          {/* Progress bars */}
          <div
            className="relative w-full max-w-178 mx-auto"
            style={{ height: "24px" }}
          >
            {/* Background full line (inactive) */}
            <div
              className="absolute top-1/2 left-3 right-3 -translate-y-1/2 bg-[#FA8232] opacity-30"
              style={{ height: "8px" }}
            />
            {/* Active line — grows from left based on how many stages are completed/active */}
            {(() => {
              const lastActiveIndex = progressStages.reduce(
                (acc, stage, i) =>
                  stage.status === "completed" || stage.status === "active"
                    ? i
                    : acc,
                -1,
              );
              if (lastActiveIndex <= 0) return null;
              const pct = (lastActiveIndex / (progressStages.length - 1)) * 100;
              return (
                <div
                  className="absolute top-1/2 left-3 -translate-y-1/2 bg-[#FA8232]"
                  style={{ height: "8px", width: `calc(${pct}% - 6px)` }}
                />
              );
            })()}
            {/* Circles absolutely positioned over the line */}
            {progressStages.map((progressStage, index) => {
              const pct = (index / (progressStages.length - 1)) * 100;
              return (
                <div
                  key={progressStage.id}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                  style={{ left: `${pct}%` }}
                >
                  {progressStage.status === "completed" ? (
                    <div className="w-6 h-6 bg-[#FA8232] rounded-full flex items-center justify-center">
                      <Image
                        src={assets.Check_white}
                        alt="tick"
                        width={12}
                        height={12}
                      />
                    </div>
                  ) : progressStage.status === "active" ? (
                    <div className="w-6 h-6 bg-[#FA8232] rounded-full" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-[#FA8232] rounded-full bg-white" />
                  )}
                </div>
              );
            })}
          </div>
          {/* progress stages */}
          <div className="grid grid-cols-12 space-y-4 md:space-y-0">
            {progressStages.map((progressStage, index) => (
              <div
                key={progressStage.id}
                className={`col-span-6 md:col-span-3 ${index >= 2 ? "opacity-50" : ""}`}
              >
                <div className="space-y-3">
                  <Image
                    src={progressStage.icon}
                    alt={progressStage.title}
                    width={32}
                    height={32}
                    className="mx-auto"
                  />
                  <p className="text-sm text-[#191C1F] font-medium text-center">
                    {progressStage.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* order activity */}
        <div className="space-y-6 p-6 border-b border-[#E4E7E9]">
          <h3 className="text-lg font-medium">Order Activity</h3>
          <div className="grid grid-cols-12 gap-4">
            {orderActivity.map((item) => (
              <div key={item.id} className="col-span-12">
                <div className="flex flex-col sm:flex-row text-center sm:text-left items-center justify-center sm:justify-start gap-4">
                  <div
                    className={`w-12 h-12 ${item.bgColor} border ${item.borderColor} rounded-xs grid place-content-center shrink-0`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.message}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">{item.message}</p>
                    <p className="text-sm text-[#77878F]">
                      {item.date} {item.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Order products */}
        <div className="py-8 border-b border-[#E4E7E9]">
          <h6 className="text-lg text-[#191C1F] leading-6 font-medium px-6">
            Product <span className="text-[#5F6C72] font-normal">(02)</span>
          </h6>
          <div className="overflow-x-auto mt-5">
            <table className="w-full">
              {/* table header */}
              <thead>
                <tr className="flex items-center gap-6 bg-[#F2F4F5] border-t border-b border-[#E4E7E9] py-2.5 px-6">
                  <th className="w-100 text-left text-[#475156] text-[12px] font-medium uppercase">
                    Products
                  </th>
                  <th className="w-31 text-[#475156] text-[12px] font-medium uppercase text-left">
                    Price
                  </th>
                  <th className="w-31 text-[#475156] text-[12px] font-medium uppercase text-left">
                    Quantity
                  </th>
                  <th className="w-48 text-[#475156] text-[12px] font-medium uppercase text-left">
                    Sub-Total
                  </th>
                </tr>
              </thead>
              {/* table body */}
              <tbody className="flex flex-col pt-6 px-6">
                {orderItems.map((item) => (
                  <tr
                    key={item.id}
                    className="flex items-center gap-6 border-b border-[#E4E7E9] pb-4 mb-4 last:border-0 last:pb-0 last:mb-0"
                  >
                    <td className="w-100">
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-20 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <h6 className="text-[#2DA5F3] text-[12px] font-semibold">
                            {item.category}
                          </h6>
                          <h6 className="text-sm text-[#191C1F] line-clamp-2">
                            {item.title}
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="w-31">
                      <p className="text-[#191C1F] text-[14px] leading-5">
                        {item.price}
                      </p>
                    </td>
                    <td className="w-31">
                      <p className="text-[#191C1F] text-[14px] leading-5">
                        x{item.quantity}
                      </p>
                    </td>
                    <td className="w-48">
                      <p className="text-[#191C1F] text-[14px] leading-5">
                        {item.subTotal}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* order address */}
        <div className="py-8 px-6 grid grid-cols-12 gap-6">
          {/* Billing Address */}
          <div className="space-y-3 col-span-4 border-r border-[#E4E7E9] pr-5">
            <h3 className="text-lg font-medium capitalize">Billing address</h3>
            <ul className="space-y-1">
              <li className="flex  flex-col space-y-2">
                <span className="text-sm text-[#191C1F] font-medium">
                  Kevin Gilbert
                </span>
                <span className="text-sm text-[#5F6C72]">
                  East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                  1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
                </span>
              </li>
              <li>
                <span className="text-sm text-[#191C1F]">Phone Number:</span>{" "}
                <span className="text-sm text-[#5F6C72]">+1-202-555-0118</span>
              </li>
              <li>
                <span className="text-sm text-[#191C1F]">Email:</span>{" "}
                <span className="text-sm text-[#5F6C72]">
                  kevin.gilbert@gmail.com
                </span>
              </li>
            </ul>
          </div>
          {/* Shipping Address */}
          <div className="space-y-3 col-span-4 border-r border-[#E4E7E9] pr-5">
            <h3 className="text-lg font-medium capitalize">Shipping Address</h3>
            <ul className="space-y-1">
              <li className="flex  flex-col space-y-2">
                <span className="text-sm text-[#191C1F] font-medium">
                  Kevin Gilbert
                </span>
                <span className="text-sm text-[#5F6C72]">
                  East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                  1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
                </span>
              </li>
              <li>
                <span className="text-sm text-[#191C1F]">Phone Number:</span>{" "}
                <span className="text-sm text-[#5F6C72]">+1-202-555-0118</span>
              </li>
              <li>
                <span className="text-sm text-[#191C1F]">Email:</span>{" "}
                <span className="text-sm text-[#5F6C72]">
                  kevin.gilbert@gmail.com
                </span>
              </li>
            </ul>
          </div>
          {/* order notes */}
          <div className="space-y-3 col-span-4">
            <h3 className="text-lg font-medium capitalize">Order Notes</h3>
            <ul className="space-y-1">
              <li className="flex  flex-col space-y-2">
                <span className="text-sm text-[#5F6C72]">
                  Donec ac vehicula turpis. Aenean sagittis est eu arcu ornare,
                  eget venenatis purus lobortis. Aliquam erat volutpat. Aliquam
                  magna odio.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* rating dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className={
            "w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] xl:max-w-118 rounded-sm"
          }
        >
          {/* Dialog header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E7E9]">
            <h1 className="text-[#191C1F] text-sm font-medium uppercase">
              Billing address
            </h1>
            {/* Dialog Close */}
            <DialogClose className="cursor-pointer">
              <Cross fill="#929FA5" width={20} height={20} />
            </DialogClose>
          </div>
          {/* Dialog Content */}
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-12">
                  {/* Rating */}
                  <div className="col-span-12">
                    <p className="text-sm text-[#191C1F] mb-2">Rating</p>
                    <div className="relative" ref={sizeBtnRef}>
                      <button
                        type="button"
                        onClick={() => setSizeActive(!sizeActive)}
                        className="border! border-[#E4E7E9]! rounded-xs flex items-center justify-between h-11 px-3 w-full cursor-pointer"
                      >
                        {selectedSize ? (
                          <span className="text-sm! text-[#475156] flex items-center gap-2">
                            <span className="flex items-center">
                              {Array(parseInt(selectedSize.split(" ")[0]) || 0)
                                .fill(null)
                                .map((_, i) => (
                                  <Star key={i} width={16} height={16} />
                                ))}
                            </span>
                            <span>{selectedSize}</span>
                          </span>
                        ) : (
                          <span className="text-sm! text-[#ADB7BC]">
                            Share your rating
                          </span>
                        )}
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
                          {options.rate.map((rate, index) => (
                            <li key={index}>
                              <button
                                type="button"
                                onClick={() => handleSizeSelect(rate)}
                                className={`w-full text-left text-sm! font-medium leading-5 py-2.5 px-5 flex items-center justify-between cursor-pointer hover:bg-[#F2F4F5]! ${
                                  selectedSize === rate
                                    ? "bg-[#F2F4F5]! font-semibold! text-[#212529]!"
                                    : "text-[#6c757d]! hover:text-[#212529]!"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="flex items-center">
                                    {Array(parseInt(rate.split(" ")[0]) || 0)
                                      .fill(null)
                                      .map((_, i) => (
                                        <Star key={i} width={16} height={16} />
                                      ))}
                                  </span>
                                  <span className="text-sm text-[#475156]">
                                    {rate}
                                  </span>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Hidden input for RHF validation */}
                  <input
                    type="hidden"
                    {...register("rating", {
                      required: "Select at least one rating",
                    })}
                    value={selectedSize}
                  />
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-1 col-span-12">
                      {errors.rating.message}
                    </p>
                  )}
                  {/* Feedback */}
                  <div className="col-span-12 mt-4">
                    <label
                      htmlFor="feedback"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Feedback
                    </label>
                    <textarea
                      id="feedback"
                      rows={4}
                      className="w-full rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 py-3 placeholder-text resize-none"
                      {...register("feedback", {
                        required: "Feedback is required",
                      })}
                      placeholder="Write down your feedback about our product & services"
                    />
                    {errors.feedback && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.feedback.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* publish review button */}
                <button
                  type="submit"
                  className="border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer"
                >
                  Publish Review
                </button>
              </form>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default page;
