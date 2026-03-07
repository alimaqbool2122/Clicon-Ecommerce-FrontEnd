"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "../../../constants/assets";
import ROUTES from "../../../constants/routes";
import { ArrowRight } from "@/components/svg/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // Validate on blur (when user leaves the field)
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    router.push(ROUTES.TRACK_ORDER_DETAILS);
  };
  return (
    <>
      <div>
        {/* Top Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", icon: assets.House, href: ROUTES.HOME },
            { label: "Pages", href: ROUTES.HOME },
            { label: "Track Order", href: ROUTES.TRACK_ORDER, active: true },
          ]}
        />
        {/* track-order */}
        <div className="container pt-12 pb-31">
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Title */}
              <h1 className="text-[32px] font-semibold text-[#191C1F]">
                Track Order
              </h1>
              {/* descriptio */}
              <p className="text-sm lg:text-base text-[#5F6C72] max-w-190">
                To track your order please enter your order ID in the input
                field below and press the “Track Order” button. this was given
                to you on your receipt and in the confirmation email you should
                have received.
              </p>
            </div>
            {/* Tracking form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-12 gap-6"
            >
              {/* Order ID */}
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <label
                  htmlFor="order"
                  className="text-[14px] font-normal leading-5 text-[#191C1F] text-start"
                >
                  Order ID
                </label>
                <input
                  type="text"
                  className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                  {...register("order", {
                    required:
                      "Order ID that we sended to your in your email address.",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Order ID must contain only numbers",
                    },
                  })}
                  placeholder="ID..."
                />
                <AnimatePresence>
                  {errors.order && (
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-[#5F6C72] text-sm mt-4 flex items-center gap-1.5"
                    >
                      <Image
                        src={assets.Info}
                        alt="info"
                        width={24}
                        height={24}
                      />
                      {errors.order.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              {/* Billing Email */}
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <label
                  htmlFor="email"
                  className="text-[14px] font-normal leading-5 text-[#191C1F] text-start"
                >
                  Billing Email
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
                  placeholder="Email address"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-[#5F6C72] text-sm mt-4 flex items-center gap-1.5"
                    >
                      <Image
                        src={assets.Info}
                        alt="info"
                        width={24}
                        height={24}
                      />
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              {/* submit button */}
              <button
                type="submit"
                className="col-span-12 flex items-center justify-center gap-2 border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 w-54.25 h-14 text-sm! leading-px uppercase font-bold! rounded-[3px] mb-4.5 cursor-pointer duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] mt-2"
              >
                Track Order
                <ArrowRight />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
