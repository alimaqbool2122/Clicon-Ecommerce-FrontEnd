import React from "react";
import Link from "next/link";
import Image from "next/image";
import { homepageContent } from "../../../data/home/home";
import { ArrowRight, Calender, Chat, UserCircle } from "../svg/Icons";

const Blog = () => {
  const blogContent = homepageContent.blog;
  return (
    <>
      <div className="bg-[#F2F4F5] py-18">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 text-center mb-2">
              <h2 className="text-[32px] leading-10 font-semibold text-[#212529]">
                Latest News
              </h2>
            </div>
            {/* Blog Card */}
            {blogContent.map((blog) => (
              <div
                key={blog.id}
                className="col-span-12 md:col-span-6 group xl:col-span-4 bg-white border border-[#E4E7E9] rounded-sm py-7.5 px-5 lg:p-8"
              >
                <div className="relative mb-6 overflow-hidden rounded-sm aspect-360/248">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover rounded-sm duration-300 ease-linear cursor-pointer group-hover:scale-110"
                  />
                </div>

                <div className="">
                  <div className="flex items-center flex-wrap gap-4">
                    <div className="flex items-center gap-1.5">
                      <UserCircle />
                      <span className="text-[14px] leading-5 text-[#475156] font-medium">
                        {blog.usertext}
                      </span>
                    </div>

                    <Link href="#" className="flex items-center gap-1.5">
                      <Calender />
                      <span className="text-[14px] leading-5 text-[#475156] font-medium">
                        {blog.calendertext}
                      </span>
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <Chat />
                      <span className="text-[14px] leading-5 text-[#475156] font-medium">
                        {blog.smstext}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Link href="#">
                      <h2 className="text-[18px] leading-6 font-medium mb-3 mt-2 line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="text-[16px] leading-6 font-normal text-[#77878F] line-clamp-3">
                      {blog.description}
                    </p>
                  </div>

                  <div className="Blog-btn mt-6">
                    <Link
                      href={blog.btnLink}
                      className="inline-flex items-center gap-2 border-2 border-[#FA8232] bg-transparent text-[#FA8232] py-3.5 px-6 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear  hover:bg-[#FA8232] hover:text-white"
                    >
                      {blog.btnText}
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
