"use client";
import React from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Cross } from "@/components/svg/Icons";

const AddCardModal = ({ open, onOpenChange }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Add Card Data:", data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[calc(100%-4rem)] xl:max-w-118 rounded-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#E4E7E9]">
          <h1 className="text-[#191C1F] text-sm font-medium uppercase">
            Add New Card
          </h1>
          <DialogClose className="cursor-pointer">
            <Cross fill="#929FA5" width={20} height={20} />
          </DialogClose>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-12 gap-4">
                {/* Name on Card */}
                <div className="col-span-12">
                  <label className="text-sm font-normal leading-5 text-[#191C1F]">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Card Number */}
                <div className="col-span-12">
                  <label className="text-sm font-normal leading-5 text-[#191C1F]">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75"
                    {...register("cardNumber", {
                      required: "Card Number is required",
                      pattern: {
                        value: /^[0-9\s-]+$/,
                        message:
                          "Card Number can only contain numbers, spaces, or dashes",
                      },
                      minLength: {
                        value: 16,
                        message: "Card Number must be at least 16 digits",
                      },
                      maxLength: {
                        value: 19,
                        message: "Card Number cannot exceed 19 digits",
                      },
                    })}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                {/* Expiry Date & CVV */}
                <div className="col-span-12 grid grid-cols-12 gap-4">
                  {/* Expiry Date */}
                  <div className="col-span-6">
                    <label className="text-sm font-normal leading-5 text-[#191C1F]">
                      Expire Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75"
                      {...register("expiryDate", {
                        required: "Expiry Date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: "Expiry Date must be in MM/YY format",
                        },
                        minLength: {
                          value: 5,
                          message: "Expiry Date must be at least 5 characters",
                        },
                        maxLength: {
                          value: 5,
                          message: "Expiry Date cannot exceed 5 characters",
                        },
                      })}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>

                  {/* CVV */}
                  <div className="col-span-6">
                    <label className="text-sm font-normal leading-5 text-[#191C1F]">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75"
                      {...register("cvv", {
                        required: "CVV is required",
                        minLength: {
                          value: 3,
                          message: "CVV must be at least 3 characters",
                        },
                        maxLength: {
                          value: 4,
                          message: "CVV cannot exceed 4 characters",
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "CVV must be a number",
                        },
                      })}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer"
              >
                Add Card
              </button>
            </form>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardModal;
