"use client";
import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import Image from "next/image";

const page = () => {
  return (
    <>
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
        {/* blog image */}
        <div className="relative w-full h-49 sm:h-72 md:h-97 lg:h-131 xl:h-157 2xl:h-185 rounded-sm">
          <Image
            src={assets.Blog_detail_banner}
            alt="belog-detail"
            fill
            className="object-contain rounded-sm"
          />
        </div>
      </div>
    </>
  );
};

export default page;
