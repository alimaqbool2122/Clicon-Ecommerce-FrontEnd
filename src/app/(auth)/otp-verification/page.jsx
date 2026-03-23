"use client";
import React, { useState, useRef, useEffect } from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import ROUTES from "@/constants/routes";
import { useForm, Controller } from "react-hook-form";
import { assets } from "@/constants/assets";
import { ArrowRight } from "@/components/svg/Icons";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft === 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleResend = () => {
    // Trigger actual resend logic here if needed
    setTimeLeft(60);
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.some(isNaN)) return;

    const newOtp = [...otp];
    pastedData.forEach((char, index) => {
      newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastFilledIndex = pastedData.length - 1;
    if (lastFilledIndex < 6 && lastFilledIndex >= 0) {
      inputRefs.current[lastFilledIndex].focus();
    }
  };

  const onSubmit = (data) => {
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      // Return early or show error
      return;
    }
    console.log("Form Data:", { ...data, otp: finalOtp });
    router.push(ROUTES.RESET_PASSWORD);
  };
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "Sign Up", href: ROUTES.SIGNUP },
          {
            label: "Email Verification",
            href: ROUTES.OTP_VERIFICATION,
            active: true,
          },
        ]}
      />
      {/* forget password */}
      <div className="container py-25">
        <div className="w-full max-w-106 mx-auto bg-white shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] border border-[#E4E7E9] rounded-sm p-6 sm:p-8 space-y-7">
          {/* form header */}
          <div className="text-center space-y-3">
            <h1 className="text-[#191C1F] text-xl font-semibold">
              Verify Your Email Address
            </h1>
            <p className="text-sm text-[#5F6C72]">
              Enter your OTP which send to{" "}
              <span className="text-[#2DA5F3] font-medium">
                cas1200@gmil.com
              </span>
            </p>
          </div>
          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-12 space-y-5"
          >
            {/* Verification Code */}
            <div className="col-span-12">
              <div className="flex items-center justify-between">
                <label className="text-sm font-normal leading-5 text-[#191C1F]">
                  Verification Code
                </label>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timeLeft > 0}
                  className={`text-sm font-semibold leading-5 ${
                    timeLeft > 0
                      ? "text-[#77878F] cursor-not-allowed"
                      : "text-[#2DA5F3] cursor-pointer"
                  }`}
                >
                  {timeLeft > 0 ? `Resend Code (${timeLeft}s)` : "Resend Code"}
                </button>
              </div>
              <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    name="otp"
                    maxLength="1"
                    className="w-12 h-12 flex items-center justify-center text-center rounded-xs border border-[#E4E7E9] outline-0 text-[#191C1F] text-xl font-semibold focus:border-[#FA8232]"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                  />
                ))}
              </div>
              {otp.join("").length > 0 && otp.join("").length < 6 && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter all 6 digits
                </p>
              )}
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="col-span-12 flex items-center justify-center gap-2 border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] mt-1 duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer"
            >
              Verify me
              <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
