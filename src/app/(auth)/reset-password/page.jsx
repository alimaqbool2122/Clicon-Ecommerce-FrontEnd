"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ROUTES from "@/constants/routes";
import { useForm, Controller } from "react-hook-form";
import { assets } from "@/constants/assets";
import { ArrowRight } from "@/components/svg/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    router.push(ROUTES.SIGIN);
  };
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "User Account", href: ROUTES.SIGIN },
          { label: "Sign In", href: ROUTES.SIGIN },
          { label: "Forget Password", href: ROUTES.FORGET_PASSWORD },
          {
            label: "Reset Password",
            href: ROUTES.RESET_PASSWORD,
            active: true,
          },
        ]}
      />
      {/* forget password */}
      <div className="container py-25">
        <div className="w-full max-w-106 mx-auto bg-white shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] border border-[#E4E7E9] rounded-sm p-6 sm:p-8 space-y-6">
          {/* form header */}
          <div className="text-center space-y-3">
            <h1 className="text-[#191C1F] text-xl font-semibold">
              Reset Password
            </h1>
            <p className="text-sm text-[#5F6C72]">
              Set your new password which must be 8 character
            </p>
          </div>
          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 space-y-5"
          >
            {/* Password */}
            <div className="col-span-12">
              <label
                htmlFor="password"
                className="text-sm font-normal leading-5 text-[#191C1F]"
              >
                Password
              </label>
              <div className="w-full h-11 flex items-center rounded-xs border border-[#E4E7E9] mt-2 text-[#191C1F] px-3.75">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full outline-0 text-[#191C1F] placeholder-text"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                      message:
                        "Must contain uppercase, lowercase, number & special character",
                    },
                  })}
                  placeholder="8+ characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  <Image
                    src={showPassword ? assets.EyeSlash : assets.Eye_Black}
                    alt="eye-icon"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Confirm Password */}
            <div className="col-span-12">
              <label
                htmlFor="password"
                className="text-sm font-normal leading-5 text-[#191C1F]"
              >
                Confirm Password
              </label>
              <div className="w-full h-11 flex items-center rounded-xs border border-[#E4E7E9] mt-2 text-[#191C1F] px-3.75">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full outline-0 text-[#191C1F] placeholder-text"
                  {...register("confirm_password", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 8,
                      message: "Confirm Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                      message:
                        "Must contain uppercase, lowercase, number & special character",
                    },
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer"
                >
                  <Image
                    src={
                      showConfirmPassword ? assets.EyeSlash : assets.Eye_Black
                    }
                    alt="eye-icon"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="col-span-12 flex items-center justify-center gap-2 border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] mt-1 duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer"
            >
              Reset Password
              <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
