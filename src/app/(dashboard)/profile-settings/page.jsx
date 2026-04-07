"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { assets } from "@/constants/assets";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";

const page = () => {
  const [profileImage, setProfileImage] = useState(assets.Profile_img);
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

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
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const {
    register: registerBilling,
    handleSubmit: handleSubmitBilling,
    formState: { errors: errorsBilling },
  } = useForm();

  const {
    register: registerShipping,
    handleSubmit: handleSubmitShipping,
    formState: { errors: errorsShipping },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleChangePassword = (data) => {
    console.log("Password Data:", data);
  };

  const handleBillingAddress = (data) => {
    console.log("Billing Address Data:", data);
  };

  const handleShippingAddress = (data) => {
    console.log("Shipping Address Data:", data);
  };

  return (
    <>
      <div className="space-y-6">
        {/* profile setting */}
        <div className="border border-[#E4E7E9] rounded-sm">
          <div className="p-4 md:px-6 md:py-4">
            <h3 className="text-sm font-medium uppercase">Profile Setting</h3>
          </div>
          <div className="border-t border-[#E4E7E9] p-4 md:p-6 md:pt-5.5 flex flex-col items-center lg:items-start lg:flex-row gap-6">
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
                  hover: { y: 0, opacity: 1 },
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
            <div className="w-full 2xl:max-w-184">
              <form
                onSubmit={handleSubmitProfile(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-12 gap-4">
                  {/* Display name */}
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="displayName"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Display Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerProfile("displayName", {
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
                    {errorsProfile.displayName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsProfile.displayName.message}
                      </p>
                    )}
                  </div>
                  {/* Username */}
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="username"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerProfile("username", {
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
                    {errorsProfile.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsProfile.username.message}
                      </p>
                    )}
                  </div>
                  {/* Full Name */}
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="fullName"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerProfile("fullName", {
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
                    {errorsProfile.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsProfile.fullName.message}
                      </p>
                    )}
                  </div>
                  {/* Email */}
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F] text-start mt-4.5"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerProfile("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address including @",
                        },
                      })}
                      placeholder="Kevin.gilbert@gmail.com"
                    />
                    {errorsProfile.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsProfile.email.message}
                      </p>
                    )}
                  </div>
                  {/* Secondary Email */}
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="secondaryEmail"
                      className="text-sm font-normal leading-5 text-[#191C1F] text-start mt-4.5"
                    >
                      Secondary Email
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerProfile("secondaryEmail", {
                        required: "Secondary Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address including @",
                        },
                      })}
                      placeholder="kevin12345@gmail.com"
                    />
                    {errorsProfile.secondaryEmail && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsProfile.secondaryEmail.message}
                      </p>
                    )}
                  </div>
                  {/* Phone Number */}
                  <div className="col-span-12 md:col-span-6">
                    <label
                      htmlFor="phoneNumber"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerProfile("phoneNumber", {
                        required: "Phone Number is required",
                        minLength: {
                          value: 11,
                          message:
                            "Phone Number must be at least 11 characters",
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
                    {errorsProfile.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsProfile.phoneNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-12">
                    {/* country, state, zip code */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* country name */}
                      <div className="col-span-12 md:col-span-6">
                        <label
                          htmlFor="country"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          Country/Region
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerProfile("country", {
                            required: "Country is required",
                            minLength: {
                              value: 3,
                              message: "Country must be at least 3 characters",
                            },
                          })}
                          placeholder="Bangladesh"
                        />
                        {errorsProfile.country && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsProfile.country.message}
                          </p>
                        )}
                      </div>
                      {/* Region/State */}
                      <div className="col-span-12 md:col-span-3">
                        <label
                          htmlFor="state"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          States
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerProfile("state", {
                            required: "State is required",
                            minLength: {
                              value: 3,
                              message: "State must be at least 3 characters",
                            },
                          })}
                          placeholder="Dhaka"
                        />
                        {errorsProfile.state && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsProfile.state.message}
                          </p>
                        )}
                      </div>
                      {/* Zip Code */}
                      <div className="col-span-12 md:col-span-3">
                        <label
                          htmlFor="zip_code"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          Zip Code
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerProfile("zip_code", {
                            required: "Zip code is required",
                            pattern: {
                              value: /^\d{5}(?:[-\s]\d{4})?$/,
                              message:
                                "Please enter a valid Zip code (e.g., 12345 or 12345-6789)",
                            },
                          })}
                          placeholder="1207"
                        />
                        {errorsProfile.zip_code && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsProfile.zip_code.message}
                          </p>
                        )}
                      </div>
                    </div>
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
        {/* Billing & Shipping address */}
        <div className="grid grid-cols-12 gap-6">
          {/* Billing address */}
          <div className="col-span-12 lg:col-span-6 border border-[#E4E7E9] rounded-sm">
            <div className="p-4 md:px-6 md:py-4">
              <h3 className="text-sm font-medium uppercase">Billing Address</h3>
            </div>
            <div className="border-t border-[#E4E7E9] p-4 md:p-6 md:pt-5.5">
              <form
                onSubmit={handleSubmitBilling(handleBillingAddress)}
                className="space-y-6"
              >
                <div className="grid grid-cols-12 gap-3">
                  {/* Biliing infromation */}
                  <div className="col-span-12">
                    {/* Username, Last Name, Company Name */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* first name */}
                      <div className="col-span-12 md:col-span-6">
                        <label
                          htmlFor="email"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerBilling("first_name", {
                            required: "First name is required",
                            minLength: {
                              value: 3,
                              message:
                                "First name must be at least 3 characters",
                            },
                          })}
                          placeholder="Kevin"
                        />
                        {errorsBilling.first_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsBilling.first_name.message}
                          </p>
                        )}
                      </div>
                      {/* Last name */}
                      <div className="col-span-12 md:col-span-6">
                        <label
                          htmlFor="email"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerBilling("last_name", {
                            required: "Last name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Last name must be at least 3 characters",
                            },
                          })}
                          placeholder="Gilbert"
                        />
                        {errorsBilling.last_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsBilling.last_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Company name */}
                  <div className="col-span-12">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Company Name{" "}
                      <span className="text-[#929FA5]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerBilling("company_name")}
                    />
                  </div>
                  {/* address */}
                  <div className="col-span-12">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerBilling("address", {
                        required: "Address is required",
                        minLength: {
                          value: 3,
                          message: "Address must be at least 3 characters",
                        },
                      })}
                      placeholder="Road No. 13/x, House no. 1320/C, Flat No. 5D"
                    />
                    {errorsBilling.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsBilling.address.message}
                      </p>
                    )}
                  </div>
                  {/* country name */}
                  <div className="col-span-12">
                    <label
                      htmlFor="country"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerBilling("country", {
                        required: "Country is required",
                        minLength: {
                          value: 3,
                          message: "Country must be at least 3 characters",
                        },
                      })}
                      placeholder="Bangladesh"
                    />
                    {errorsBilling.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsBilling.country.message}
                      </p>
                    )}
                  </div>
                  {/* Region/State */}
                  <div className="col-span-12">
                    <label
                      htmlFor="state"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Region/State
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerBilling("state", {
                        required: "State is required",
                        minLength: {
                          value: 3,
                          message: "State must be at least 3 characters",
                        },
                      })}
                      placeholder="Select..."
                    />
                    {errorsBilling.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsBilling.state.message}
                      </p>
                    )}
                  </div>
                  {/* city and zip code */}
                  <div className="col-span-12">
                    <div className="grid grid-cols-12 gap-4">
                      {/* City */}
                      <div className="col-span-12 md:col-span-6">
                        <label
                          htmlFor="city"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerBilling("city", {
                            required: "City is required",
                            minLength: {
                              value: 3,
                              message: "City must be at least 3 characters",
                            },
                          })}
                          placeholder="Dhaka"
                        />
                        {errorsBilling.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsBilling.city.message}
                          </p>
                        )}
                      </div>
                      {/* Zip Code */}
                      <div className="col-span-12 md:col-span-6">
                        <label
                          htmlFor="zip_code"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          Zip Code
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerBilling("zip_code", {
                            required: "Zip code is required",
                            pattern: {
                              value: /^\d{5}(?:[-\s]\d{4})?$/,
                              message:
                                "Please enter a valid Zip code (e.g., 12345 or 12345-6789)",
                            },
                          })}
                          placeholder="1207"
                        />
                        {errorsBilling.zip_code && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsBilling.zip_code.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="col-span-12">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerBilling("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address including @",
                        },
                      })}
                      placeholder="kevin12345@gmail.com"
                    />
                    {errorsBilling.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsBilling.email.message}
                      </p>
                    )}
                  </div>
                  {/* Phone Number */}
                  <div className="col-span-12">
                    <label
                      htmlFor="phone"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerBilling("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: "Enter a valid 11-digit phone number",
                        },
                      })}
                      placeholder="+1-202-555-0118"
                    />
                    {errorsBilling.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsBilling.phone.message}
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
          {/* Shipping address */}
          <div className="col-span-12 lg:col-span-6 border border-[#E4E7E9] rounded-sm">
            <div className="p-4 md:px-6 md:py-4">
              <h3 className="text-sm font-medium uppercase">
                Shipping Address
              </h3>
            </div>
            <div className="border-t border-[#E4E7E9] p-4 md:p-6 md:pt-5.5">
              <form
                onSubmit={handleSubmitShipping(handleShippingAddress)}
                className="space-y-6"
              >
                <div className="grid grid-cols-12 gap-3">
                  {/* Biliing infromation */}
                  <div className="col-span-12">
                    {/* Username, Last Name, Company Name */}
                    <div className="grid grid-cols-12 gap-4">
                      {/* first name */}
                      <div className="col-span-12 md:col-span-6">
                        <label
                          htmlFor="email"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerShipping("first_name", {
                            required: "First name is required",
                            minLength: {
                              value: 3,
                              message:
                                "First name must be at least 3 characters",
                            },
                          })}
                          placeholder="Kevin"
                        />
                        {errorsShipping.first_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsShipping.first_name.message}
                          </p>
                        )}
                      </div>
                      {/* Last name */}
                      <div className="col-span-12 md:col-span-6">
                        <label
                          htmlFor="email"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerShipping("last_name", {
                            required: "Last name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Last name must be at least 3 characters",
                            },
                          })}
                          placeholder="Gilbert"
                        />
                        {errorsShipping.last_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsShipping.last_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Company name */}
                  <div className="col-span-12">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Company Name{" "}
                      <span className="text-[#929FA5]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerShipping("company_name")}
                    />
                  </div>
                  {/* address */}
                  <div className="col-span-12">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerShipping("address", {
                        required: "Address is required",
                        minLength: {
                          value: 3,
                          message: "Address must be at least 3 characters",
                        },
                      })}
                      placeholder="Road No. 13/x, House no. 1320/C, Flat No. 5D"
                    />
                    {errorsShipping.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsShipping.address.message}
                      </p>
                    )}
                  </div>
                  {/* country name */}
                  <div className="col-span-12">
                    <label
                      htmlFor="country"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerShipping("country", {
                        required: "Country is required",
                        minLength: {
                          value: 3,
                          message: "Country must be at least 3 characters",
                        },
                      })}
                      placeholder="Bangladesh"
                    />
                    {errorsShipping.country && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsShipping.country.message}
                      </p>
                    )}
                  </div>
                  {/* Region/State */}
                  <div className="col-span-12">
                    <label
                      htmlFor="state"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Region/State
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerShipping("state", {
                        required: "State is required",
                        minLength: {
                          value: 3,
                          message: "State must be at least 3 characters",
                        },
                      })}
                      placeholder="Select..."
                    />
                    {errorsShipping.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsShipping.state.message}
                      </p>
                    )}
                  </div>
                  {/* city and zip code */}
                  <div className="col-span-12">
                    <div className="grid grid-cols-12 gap-4">
                      {/* City */}
                      <div className="col-span-12 md:col-span-6">
                        <label
                          htmlFor="city"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerShipping("city", {
                            required: "City is required",
                            minLength: {
                              value: 3,
                              message: "City must be at least 3 characters",
                            },
                          })}
                          placeholder="Dhaka"
                        />
                        {errorsShipping.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsShipping.city.message}
                          </p>
                        )}
                      </div>
                      {/* Zip Code */}
                      <div className="col-span-12 md:col-span-6">
                        <label
                          htmlFor="zip_code"
                          className="text-sm font-normal leading-5 text-[#191C1F]"
                        >
                          Zip Code
                        </label>
                        <input
                          type="text"
                          className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                          {...registerShipping("zip_code", {
                            required: "Zip code is required",
                            pattern: {
                              value: /^\d{5}(?:[-\s]\d{4})?$/,
                              message:
                                "Please enter a valid Zip code (e.g., 12345 or 12345-6789)",
                            },
                          })}
                          placeholder="1207"
                        />
                        {errorsShipping.zip_code && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsShipping.zip_code.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="col-span-12">
                    <label
                      htmlFor="email"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerShipping("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address including @",
                        },
                      })}
                      placeholder="kevin12345@gmail.com"
                    />
                    {errorsShipping.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsShipping.email.message}
                      </p>
                    )}
                  </div>
                  {/* Phone Number */}
                  <div className="col-span-12">
                    <label
                      htmlFor="phone"
                      className="text-sm font-normal leading-5 text-[#191C1F]"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                      {...registerShipping("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: "Enter a valid 11-digit phone number",
                        },
                      })}
                      placeholder="+1-202-555-0118"
                    />
                    {errorsShipping.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsShipping.phone.message}
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
        {/* Change Password */}
        <div className="border border-[#E4E7E9] rounded-sm">
          <div className="p-4 md:px-6 md:py-4">
            <h3 className="text-sm font-medium uppercase">Change Password</h3>
          </div>
          <div className="border-t border-[#E4E7E9] p-4 md:p-6 md:pt-5.5">
            <form
              onSubmit={handleSubmitPassword(handleChangePassword)}
              className="space-y-6"
            >
              <div className="grid grid-cols-12 gap-4">
                {/* Current Password */}
                <div className="col-span-12">
                  <label
                    htmlFor="current_password"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Current Password
                  </label>
                  <div className="w-full h-11 flex items-center rounded-xs border border-[#E4E7E9] mt-2 text-[#191C1F] px-3.75">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      className="w-full outline-0 text-[#191C1F] placeholder-text"
                      {...registerPassword("current_password", {
                        required: "Current Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Current Password must be at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                          message:
                            "Must contain uppercase, lowercase, number & special character",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="cursor-pointer"
                    >
                      <Image
                        src={
                          showCurrentPassword
                            ? assets.EyeSlash
                            : assets.Eye_Black
                        }
                        alt="eye-icon"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                  {errorsPassword.current_password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsPassword.current_password.message}
                    </p>
                  )}
                </div>
                {/* New Password */}
                <div className="col-span-12">
                  <label
                    htmlFor="new_password"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    New Password
                  </label>
                  <div className="w-full h-11 flex items-center rounded-xs border border-[#E4E7E9] mt-2 text-[#191C1F] px-3.75">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full outline-0 text-[#191C1F] placeholder-text"
                      {...registerPassword("new_password", {
                        required: "New Password is required",
                        minLength: {
                          value: 8,
                          message: "New Password must be at least 8 characters",
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
                  {errorsPassword.new_password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsPassword.new_password.message}
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
                      {...registerPassword("confirm_password", {
                        required: "Confirm Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Confirm Password must be at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                          message:
                            "Must contain uppercase, lowercase, number & special character",
                        },
                        validate: (value) =>
                          value === watchPassword("new_password") ||
                          "Passwords do not match",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="cursor-pointer"
                    >
                      <Image
                        src={
                          showConfirmPassword
                            ? assets.EyeSlash
                            : assets.Eye_Black
                        }
                        alt="eye-icon"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                  {errorsPassword.confirm_password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsPassword.confirm_password.message}
                    </p>
                  )}
                </div>
              </div>
              {/* submit button */}
              <button
                type="submit"
                className="border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
