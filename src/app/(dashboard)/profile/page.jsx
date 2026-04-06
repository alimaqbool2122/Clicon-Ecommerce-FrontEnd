"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";

const page = () => {
  const [profileImage, setProfileImage] = useState(assets.Profile_img);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <>
      <div className="col-span-4 border border-[#E4E7E9] rounded-sm">
        <div className="px-6 py-4">
          <h3 className="text-sm font-medium uppercase">Profile Setting</h3>
        </div>
        <div className="border-t border-[#E4E7E9] p-6 pt-5.5 flex gap-6">
          {/* user img */}
          <motion.div 
            className="relative w-44 h-44 shrink-0 overflow-hidden rounded-full cursor-pointer"
            initial="initial"
            whileHover="hover"
            onClick={handleImageClick}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <Image
              src={profileImage}
              alt="user"
              fill
              className="rounded-full object-cover"
            />
            {/* upload overlay */}
            <motion.div 
              variants={{
                initial: { y: "100%", opacity: 0 },
                hover: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-44 h-44 bg-black/50 flex flex-col items-center justify-center space-y-4 rounded-full"
            >
              <Image
                src={assets.UploadSimple}
                alt="upload"
                width={24}
                height={24}
              />
              <p className="text-white text-sm font-medium">Upload Image</p>
            </motion.div>
          </motion.div>
          {/* user info */}
          <div className="w-full max-w-184">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-12 gap-4">
                {/* Display name */}
                <div className="col-span-6">
                  <label
                    htmlFor="displayName"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("displayName", {
                      required: "Display Name is required",
                      minLength: {
                        value: 3,
                        message: "Display Name must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message:
                          "Display Name can only contain letters and spaces",
                      },
                    })}
                    placeholder="Kevin"
                  />
                  {errors.displayName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.displayName.message}
                    </p>
                  )}
                </div>
                {/* Username */}
                <div className="col-span-6">
                  <label
                    htmlFor="username"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message:
                          "Username can only contain letters, numbers, and underscores",
                      },
                    })}
                    placeholder="Display name"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                {/* Full Name */}
                <div className="col-span-6">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("fullName", {
                      required: "Full Name is required",
                      minLength: {
                        value: 3,
                        message: "Full Name must be at least 3 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z ]+$/,
                        message:
                          "Full Name can only contain letters and spaces",
                      },
                    })}
                    placeholder="Kevin Gilbert"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div className="col-span-6">
                  <label
                    htmlFor="email"
                    className="text-sm font-normal leading-5 text-[#191C1F] text-start mt-4.5"
                  >
                    Email
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
                    placeholder="Kevin.gilbert@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* Secondary Email */}
                <div className="col-span-6">
                  <label
                    htmlFor="secondaryEmail"
                    className="text-sm font-normal leading-5 text-[#191C1F] text-start mt-4.5"
                  >
                    Secondary Email
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("secondaryEmail", {
                      required: "Secondary Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address including @",
                      },
                    })}
                    placeholder="kevin12345@gmail.com"
                  />
                  {errors.secondaryEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.secondaryEmail.message}
                    </p>
                  )}
                </div>
                {/* Phone Number */}
                <div className="col-span-6">
                  <label
                    htmlFor="phoneNumber"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                      minLength: {
                        value: 11,
                        message: "Phone Number must be at least 11 characters",
                      },
                      maxLength: {
                        value: 11,
                        message: "Phone Number must be at most 11 characters",
                      },
                      pattern: {
                        value: /^[0-9+-]+$/,
                        message: "Phone Number can only contain numbers",
                      },
                    })}
                    placeholder="+1-202-555-0118"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
              {/* submit button */}
              <button
                type="submit"
                className="border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
