"use client";
import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import { blogdetailContent } from "@/data/blog-detail/blog-detail";
import { Calender, Chat, UserCircle } from "@/components/svg/Icons";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { BlogFilterProvider } from "@/contexts/BlogFilterContext";
import BlogCategory from "@/components/blog-details/BlogCategory";

const page = () => {
  const [visibleComments, setVisibleComments] = React.useState(5);

  const handleLoadMore = () => {
    setVisibleComments((prev) => prev + 5);
  };
  const blogDetailData = blogdetailContent.blogDetail;
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  // submit form
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <>
      <BlogFilterProvider>
        {/* Top Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", icon: assets.House, href: ROUTES.HOME },
            { label: "Pages", href: ROUTES.HOME },
            { label: "Blog", href: ROUTES.BLOG },
            { label: "Blog Detail", href: "#", active: true },
          ]}
        />
        <div className="container py-18">
          <div className="grid grid-cols-12 gap-6 2xl:gap-12">
            {/* blog image */}
            <div className="col-span-12 relative w-full h-49 sm:h-72 md:h-97 lg:h-131 xl:h-157 2xl:h-185 rounded-sm">
              <Image
                src={blogDetailData.image}
                alt={blogDetailData.title}
                fill
                className="object-contain rounded-sm"
              />
            </div>
            {/* blog content */}
            <div className="col-span-12 xl:col-span-8">
              {/* blog info */}
              <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                <div className="flex items-center space-x-1.5">
                  <Image
                    src={assets.Stack}
                    alt="Stack"
                    width={24}
                    height={24}
                  />
                  <span className="text-sm text-[#475156]">
                    {blogDetailData.category}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <UserCircle />
                  <span className="text-sm text-[#475156]">
                    {blogDetailData.author}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Calender />
                  <span className="text-sm text-[#475156]">
                    {blogDetailData.date}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Chat />
                  <span className="text-sm text-[#475156]">
                    {blogDetailData.comments}
                  </span>
                </div>
              </div>
              {/* blog title */}
              <h1 className="text-xl sm:text-[32px] font-semibold text-[#191C1F] sm:leading-10 mt-4">
                {blogDetailData.title}
              </h1>
              {/* blog user */}
              <div className="flex flex-col md:flex-row items-centerd justify-center md:justify-between space-y-4 md:space-y-0 mt-6">
                {/* user info */}
                <div className="flex items-center justify-center gap-3">
                  <Image
                    src={blogDetailData.user.avatar}
                    alt={blogDetailData.user.name}
                    width={40}
                    height={40}
                  />
                  <span className="text-[#191C1F] font-medium text-base">
                    {blogDetailData.user.name}
                  </span>
                </div>
                {/* social links */}
                <div className="flex items-center justify-center gap-2">
                  {blogDetailData.socialLinks.map((link) => (
                    <Link
                      key={link.id}
                      href={link.link}
                      className={`w-10 h-10 rounded-full grid place-items-center ${link.bg}`}
                    >
                      <Image
                        src={link.icon}
                        alt={link.id}
                        width={16}
                        height={16}
                      />
                    </Link>
                  ))}
                </div>
              </div>
              <p className="text-[#475156] text-base mt-8">
                {blogDetailData.description1}
              </p>
              {/* Blog Quote */}
              <div className="bg-[#FFF3EB] flex items-start gap-6 p-4 lg:p-10 border-l-4 border-[#FA8232] mt-8">
                <Image
                  src={assets.double_quotes}
                  alt="Quote"
                  width={56}
                  height={56}
                  className="shrink-0"
                />
                <p className="text-[#191C1F] text-base lg:text-xl">
                  {blogDetailData.quote}
                </p>
              </div>
              <p className="text-[#475156] text-base mt-8">
                {blogDetailData.description2}
              </p>
              <p className="text-[#475156] text-base mt-4">
                {blogDetailData.description3}
              </p>
              {/* blog  images*/}
              <div className="grid grid-cols-12 gap-6 mt-8">
                {blogDetailData.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative col-span-12 md:col-span-6 w-full h-87.5 sm:h-106 md:h-84.5"
                  >
                    <Image
                      src={image.image}
                      alt={image.image}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
              <p className="text-[#475156] text-base mt-8">
                {blogDetailData.description4}
              </p>
              {/* leave commends */}
              <div className="mt-6 xl:mt-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="col-span-12">
                    <h2 className="text-xl font-medium text-[#191C1F]">
                      Leave a Comments
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    {/* first name */}
                    <div className="col-span-12 md:col-span-6">
                      <label
                        htmlFor="full_name"
                        className="text-sm font-normal leading-5 text-[#191C1F]"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder-text"
                        {...register("full_name", {
                          required: "Full name is required",
                          minLength: {
                            value: 3,
                            message: "Full name must be at least 3 characters",
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
                        className="text-sm font-normal leading-5 text-[#191C1F]"
                      >
                        Email Address
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
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    {/* Description */}
                    <div className="col-span-12">
                      <label
                        htmlFor="description"
                        className="text-sm font-normal leading-5 text-[#191C1F]"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        className="w-full rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 py-3 placeholder-text resize-none"
                        {...register("description", {
                          required: "Description is required",
                          minLength: {
                            value: 10,
                            message:
                              "Description must be at least 10 characters",
                          },
                        })}
                        placeholder="What’s your thought about this blog..."
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* submit button */}
                  <button
                    type="submit"
                    className="flex items-center justify-center border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer"
                  >
                    post Comments
                  </button>
                </form>
              </div>
              {/* comments list */}
              <div className="mt-6 xl:mt-12 space-y-6">
                <h2 className="text-xl font-medium text-[#191C1F]">Comments</h2>
                <div className="grid grid-cols-12">
                  <AnimatePresence>
                    {blogDetailData.commentsList
                      .slice(0, visibleComments)
                      .map((comment, index) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{
                            duration: 0.4,
                            delay: (index % 5) * 0.1,
                          }}
                          className="col-span-12 flex items-start gap-3 border-b border-[#E4E7E9] last:border-0 pb-6 last:pb-0 mb-6 last:mb-0"
                        >
                          <div className="relative w-10 h-10 rounded-full shrink-0">
                            <Image
                              src={comment.avatar}
                              alt={comment.avatar}
                              fill
                              className="rounded-full shrink-0"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center">
                              <h3 className="text-sm font-medium text-[#191C1F]">
                                {comment.name}
                              </h3>
                              <div className="w-1 h-1 bg-[#77878F] rounded-full mx-1.5"></div>
                              <p className="text-sm text-[#77878F]">
                                {comment.date}
                              </p>
                            </div>
                            <p className="text-sm text-[#475156]">
                              {comment.text}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
                {/* load more button  */}
                {visibleComments < blogDetailData.commentsList.length && (
                  <button
                    onClick={handleLoadMore}
                    className="group/icon relative inline-flex items-center gap-2 border-2 mt-2 border-[#FFE7D6] bg-transparent text-[#FA8232] py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] cursor-pointer duration-500 ease-linear  hover:bg-[#FA8232] hover:text-white hover:border-[#FA8232]"
                  >
                    <Image
                      src={assets.ArrowsClockwise_Yellow}
                      alt="cart-white"
                      width={20}
                      height={20}
                      className="transition-opacity duration-500 opacity-100 group-hover/icon:opacity-0"
                    />
                    <Image
                      src={assets.ArrowsClockwise_White}
                      alt="cart-white"
                      width={20}
                      height={20}
                      className="absolute  transition-opacity duration-500 opacity-0 group-hover/icon:opacity-100"
                    />
                    Load More
                  </button>
                )}
              </div>
            </div>
            {/* Blog Category Sidebar */}
            <div className="col-span-12 xl:col-span-4">
              <BlogCategory />
            </div>
          </div>
        </div>
      </BlogFilterProvider>
    </>
  );
};

export default page;
