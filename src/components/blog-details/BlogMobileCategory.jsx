"use client";
import React, { useState, useEffect } from "react";
import { assets } from "../../constants/assets";
import Image from "next/image";
import Link from "next/link";
import { blogpageContent } from "@/data/blog/blog";
import { useBlogFilter } from "@/contexts/BlogFilterContext";
import ROUTES from "@/constants/routes";
import { Search } from "../svg/Icons";

const BlogMobileCategory = () => {
  const { selectedCategories, toggleCategory } = useBlogFilter();
  const selected = selectedCategories;
  const popularLink = blogpageContent.popularLinkCol;
  const categories = blogpageContent.categories;
  const latestBlog = blogpageContent.latestBlog;
  const gallery = blogpageContent.gallery;
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [filterOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {filterOpen && (
        <div
          onClick={() => setFilterOpen(false)}
          className="fixed inset-0 bg-black/50 transform transition-all duration-500 ease-in-out z-1040 xl:hidden"
        ></div>
      )}

      {/* Filter Navbar */}
      <nav
        className={`fixed top-0 left-0 w-100 max-w-full border-r border-black/75 bg-white h-screen transform transition-all duration-500 ease-in-out z-1045 
          ${filterOpen ? "translate-x-0 opacity-100 visible" : "-translate-x-full opacity-0 invisible"}`}
      >
        {/* Close button */}
        <div
          onClick={() => setFilterOpen(false)}
          className="relative flex items-center justify-end p-4"
        >
          <button>
            <Image
              src={assets.cross_icon}
              alt="filter-close"
              width={16}
              height={16}
            />
          </button>
        </div>

        {/* Sidebar Data */}
        <div className="grid grid-cols-12 gap-6 p-4 overflow-y-auto h-screen">
          {/* Search */}
          <div className="relative col-span-12 space-y-6 border border-[#E4E7E9] rounded-sm p-6">
            <h6 className="text-base text-[#191C1F] font-medium uppercase">
              Search
            </h6>
            <div className="flex items-center border border-[#E4E7E9] rounded-xs py-3 px-4">
              <input
                type="text"
                placeholder="Search for blogs..."
                className="outline-0 font-normal text-[14px] leading-5 text-[#212529] placeholder-text w-full"
              />
              <button type="button" className="cursor-pointer">
                <Search />
              </button>
            </div>
          </div>
          {/* Category */}
          <div className="space-y-4 col-span-12 border border-[#E4E7E9] rounded-sm p-6">
            <h6 className="text-base text-[#191C1F] font-medium uppercase">
              Category
            </h6>
            <div className="space-y-3">
              {categories.map((category, index) => {
                const isChecked = selected.includes(category);
                return (
                  <label
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(category)}
                      className="hidden!"
                    />
                    {/* Custom checkbox */}
                    <div
                      className={`w-5 h-5 border rounded-full flex items-center justify-center transition-all duration-300
                      ${isChecked ? "bg-[#FA8232] border-[#FA8232]" : "bg-transparent border-[#C9CFD2]"}`}
                    >
                      {isChecked && (
                        <Image
                          src={assets.Ellipse}
                          alt="check-icon"
                          width={8.5}
                          height={8.5}
                        />
                      )}
                    </div>
                    <span className="text-sm text-[#191C1F] font-medium">
                      {category}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Latest Blog */}
          <div className="space-y-4 col-span-12 border border-[#E4E7E9] rounded-sm p-6">
            <h6 className="text-base text-[#191C1F] font-medium uppercase">
              Latest Blog
            </h6>
            <div className="space-y-4">
              {latestBlog.map((blog) => {
                return (
                  <div key={blog.id} className="flex items-center gap-4">
                    <div className="relative w-26 h-20 shrink-0">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-2">
                      <Link
                        href={ROUTES.BLOG_DETAILS(blog.id)}
                        className="text-sm font-medium line-clamp-3 duration-400 ease-linear hover:text-[#FA8232]"
                      >
                        {blog.title}
                      </Link>

                      <p className="text-sm text-[#77878F]">
                        {blog.calendertext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-4 col-span-12 border border-[#E4E7E9] rounded-sm p-6">
            <h6 className="text-base text-[#191C1F] font-medium uppercase">
              Gallery
            </h6>
            <ul className="grid grid-cols-12 gap-3">
              {gallery.map((blog) => {
                return (
                  <li key={blog.id} className="col-span-3">
                    <Image
                      src={blog.image}
                      alt="blog_gallery_image"
                      width={80}
                      height={80}
                      className="rounded-xs cursor-pointer"
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="space-y-4 col-span-12 mb-28">
            <h6 className="text-base text-[#191C1F] font-medium uppercase">
              Popular Tag
            </h6>
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <ul className="flex flex-wrap gap-2">
                  {popularLink.map((link, index) => (
                    <li key={index} className="mb-2">
                      <Link
                        href="#"
                        className="bg-white py-1.5 px-2.5 border border-[#E4E7E9] text-[14px] leading-5 font-medium text-black rounded-xs duration-300 ease-linear hover:bg-[#FFF3EB] hover:border-[#FA8232] hover:text-[#FA8232]"
                      >
                        {link.populerlink}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Open Filter button */}
      <button
        className="flex items-center gap-2.5 bg-[#f2f4f5]! text-[#212529]! text-sm! font-medium! leading-5 py-2.5 px-5 rounded-sm xl:hidden"
        onClick={() => setFilterOpen(true)}
      >
        <Image
          src={assets.Filter_icon}
          alt="filter-icon"
          width={20}
          height={20}
        />
        Filter
      </button>
    </>
  );
};

export default BlogMobileCategory;
