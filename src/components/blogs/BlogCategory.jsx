"use client";
import React from "react";
import BlogMobileCategory from "./BlogMobileCategory";
import BlogDesktopCategory from "./BlogDesktopCategory";

const BlogCategory = () => {
  return (
    <>
      <div className="xl:hidden">
        <BlogMobileCategory />
      </div>
      <div className="hidden xl:block">
        <BlogDesktopCategory />
      </div>
    </>
  );
};

export default BlogCategory;
