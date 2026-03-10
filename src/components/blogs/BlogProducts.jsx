"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BlogSearchFilter from "./BlogSearchFilter";
import { assets } from "../../constants/assets";
import { blogpageContent } from "@/data/blog/blog";
import ROUTES from "../../constants/routes";
import CustomPagination from "../ui/CustomPagination";
import { useBlogFilter } from "@/contexts/BlogFilterContext";
import { ArrowRight, Calender, Chat, UserCircle } from "../svg/Icons";

const BlogProducts = () => {
  const products = blogpageContent.blogList;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const { selectedCategories } = useBlogFilter();
  const totalPages = 6;

  // Clear active search when input is cleared
  useEffect(() => {
    if (searchQuery === "") {
      setActiveSearchQuery("");
    }
  }, [searchQuery]);

  const filteredBlogs = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(activeSearchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedCategories.length === 0) return true;

    return product.category && selectedCategories.includes(product.category);
  });

  const handleSearch = () => {
    setActiveSearchQuery(searchQuery);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-12 space-y-6">
          {/* Search & Filter */}
          <BlogSearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />

          {/* All Blogs */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-12 gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="col-span-12 md:col-span-6 group bg-white border border-[#E4E7E9] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.04)] rounded-sm py-7.5 px-5 lg:p-8 flex flex-col"
                >
                  <Link
                    className="relative mb-6 overflow-hidden rounded-sm aspect-360/248 shrink-0"
                    href={ROUTES.BLOG_DETAILS(blog.id)}
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-sm duration-300 ease-linear group-hover:scale-110"
                    />
                  </Link>

                  <div className="flex flex-col flex-1">
                    <div className="flex items-center flex-wrap gap-x-4">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <UserCircle />
                        <span className="text-[14px] text-[#475156] font-medium">
                          {blog.usertext}
                        </span>
                      </div>

                      <Link
                        href="#"
                        className="flex items-center gap-1.5 shrink-0"
                      >
                        <Calender />
                        <span className="text-[14px] text-[#475156] font-medium">
                          {blog.calendertext}
                        </span>
                      </Link>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Chat />
                        <span className="text-[14px] text-[#475156] font-medium">
                          {blog.smstext}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <Link
                        href={ROUTES.BLOG_DETAILS(blog.id)}
                        className="text-[18px] leading-6 font-medium mb-3 mt-2 line-clamp-2 duration-400 ease-linear hover:text-[#FA8232] block"
                      >
                        {blog.title}
                      </Link>

                      <p className="text-[16px] leading-6 font-normal text-[#77878F] line-clamp-3">
                        {blog.description}
                      </p>
                    </div>

                    <div className="Blog-btn mt-6">
                      <Link
                        href={ROUTES.BLOG_DETAILS(blog.id)}
                        className="inline-flex items-center gap-2 border-2 border-[#FFE7D6] bg-transparent text-[#FA8232] py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear  hover:bg-[#FA8232] hover:text-white hover:border-[#FA8232]"
                      >
                        {blog.btnText}
                        <ArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-12 text-center py-10">
              <p className="text-lg text-gray-500">No Blog found.</p>
            </div>
          )}

          {/* Custom Pagination */}
          <div className="pt-5 flex items-center justify-center">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogProducts;
