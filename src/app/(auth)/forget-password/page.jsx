"use client";
import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ROUTES from "@/constants/routes";
import { useForm, Controller } from "react-hook-form";
import { assets } from "@/constants/assets";
import { ArrowRight } from "@/components/svg/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgetPasswordMutation } from "@/redux/services/auth/authApiSlice";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await forgetPassword(data).unwrap();
      console.log("Success Response:", response);

      if (response.success) {
        toast.success(response.message);
        localStorage.setItem("resetEmail", data.email);
        setTimeout(() => {
          router.push(ROUTES.OTP_VERIFICATION);
        }, 2000);
      }
    } catch (error) {
      console.log("Error Response:", error);
      toast.error(error.data.message);
    }
  };
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "User Account", href: ROUTES.SIGIN },
          { label: "Sign In", href: ROUTES.SIGIN },
          {
            label: "Forget Password",
            href: ROUTES.FORGET_PASSWORD,
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
              Forget Password
            </h1>
            <p className="text-sm text-[#5F6C72]">
              Enter the email address or mobile phone number associated with
              your Clicon account.
            </p>
          </div>
          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 space-y-5"
          >
            {/* Email */}
            <div className="col-span-12">
              <label
                htmlFor="email"
                className="text-sm font-normal leading-5 text-[#191C1F] text-start mt-4.5"
              >
                Email Address
              </label>
              <input
                type="text"
                className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
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

            {/* submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="col-span-12 flex items-center justify-center gap-2 border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] mt-1 duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer"
            >
              {isLoading ? "Sending Code" : "Send Code"}
              <ArrowRight />
            </button>
          </form>
          {/* alreday account */}
          <div className="space-y-2 border-b border-[#E4E7E9] pb-6">
            <p className="text-sm text-[#5F6C72]">
              Already have account?{" "}
              <Link href={ROUTES.SIGIN} className="text-[#2DA5F3] font-medium">
                Sign In
              </Link>
            </p>
            <p className="text-sm text-[#5F6C72]">
              Don’t have account?{" "}
              <Link href={ROUTES.SIGIN} className="text-[#2DA5F3] font-medium">
                Sign Up
              </Link>
            </p>
          </div>
          {/* help service */}
          <p className="text-sm text-[#475156]">
            You may contact{" "}
            <Link
              href={ROUTES.CUSTOMER_SUPPORT}
              className="text-[#FA8232] font-medium"
            >
              Customer Service
            </Link>{" "}
            for help restoring access to your account.
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
