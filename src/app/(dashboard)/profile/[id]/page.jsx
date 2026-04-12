"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/constants/assets";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import {
  useUpdateProfileMutation,
  useDeleteAccountMutation,
  useGetProfileQuery,
} from "@/redux/services/auth/authApiSlice";
import { useAuth } from "@/contexts/authProvider";
import { toast } from "react-toastify";
import ROUTES from "@/constants/routes";

const page = () => {
  const [profileImage, setProfileImage] = useState(assets.Profile_img);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { user, logout } = useAuth();
  const userId = user?._id || user?.id;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Update profile mutation
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  // Delete account mutation
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  // Get profile mutation
  const { data: profile, isLoading } = useGetProfileQuery(userId);
  const userData = profile?.data || user;

  // set profile data
  useEffect(() => {
    if (!userData) return;

    reset({
      name: userData.name || "",
      username: userData.username || "",
      full_name: userData.name || "",
      email: userData.email || "",
      secondary_email: userData.secondary_email || "",
      phone_number: userData.phone_number || "",
      country: userData.country || "",
      state: userData.state || "",
      zipcode: userData.zipcode || "",
    });

    if (userData.profile_image) {
      setProfileImage(userData.profile_image);
    }
  }, [profile, user, reset]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // update profile
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // append normal fields safely
      formData.append("name", data.name || "");
      formData.append("username", data.username || "");
      formData.append("email", data.email || "");
      formData.append("secondary_email", data.secondary_email || "");
      formData.append("phone_number", data.phone_number || "");
      formData.append("country", data.country || "");
      formData.append("state", data.state || "");
      formData.append("zipcode", data.zipcode || "");

      // IMPORTANT: match backend field name
      formData.append("profile_image", selectedFile || "");

      const response = await updateProfile({
        id: userId,
        data: formData,
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        setSelectedFile(null);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };
  // delete account
  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount(userId).unwrap();
      console.log("Success Response:", response);

      if (response.success) {
        toast.success(response.message);
        setTimeout(() => {
          logout();
          router.push(ROUTES.SIGIN);
        }, 1000);
      }
    } catch (error) {
      console.log("Error Response:", error);
      const message =
        error?.data?.message || error?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  return (
    <>
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-12 gap-4">
                {/* Display name */}
                <div className="col-span-12 md:col-span-6">
                  <label
                    htmlFor="name"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("name", {
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
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
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
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                {/* Full Name */}
                <div className="col-span-12 md:col-span-6">
                  <label
                    htmlFor="full_name"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("full_name", {
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
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.full_name.message}
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address including @",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                {/* Secondary Email */}
                <div className="col-span-12 md:col-span-6">
                  <label
                    htmlFor="secondary_email"
                    className="text-sm font-normal leading-5 text-[#191C1F] text-start mt-4.5"
                  >
                    Secondary Email
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("secondary_email", {
                      required: "Secondary Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address including @",
                      },
                    })}
                  />
                  {errors.secondary_email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.secondary_email.message}
                    </p>
                  )}
                </div>
                {/* Phone Number */}
                <div className="col-span-12 md:col-span-6">
                  <label
                    htmlFor="phone_number"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                    {...register("phone_number", {
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
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone_number.message}
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
                        {...register("country", {
                          required: "Country is required",
                          minLength: {
                            value: 3,
                            message: "Country must be at least 3 characters",
                          },
                        })}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country.message}
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
                        {...register("state", {
                          required: "State is required",
                          minLength: {
                            value: 3,
                            message: "State must be at least 3 characters",
                          },
                        })}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    {/* Zip Code */}
                    <div className="col-span-12 md:col-span-3">
                      <label
                        htmlFor="zipcode"
                        className="text-sm font-normal leading-5 text-[#191C1F]"
                      >
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-[#FA8232] mt-2 text-[#191C1F] px-3.75 placeholder-text"
                        {...register("zipcode", {
                          required: "Zip code is required",
                          pattern: {
                            value: /^\d{5}(?:[-\s]\d{4})?$/,
                            message:
                              "Please enter a valid Zip code (e.g., 12345 or 12345-6789)",
                          },
                        })}
                      />
                      {errors.zipcode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.zipcode.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* submit button */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Saving" : "Save Changes"}
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteAccount}
                  className="border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? "Deleting" : "Delete Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
