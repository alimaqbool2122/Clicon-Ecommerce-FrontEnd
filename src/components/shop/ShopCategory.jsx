"use client";
import React from "react";
import MobileCategory from "./MobileCategory";
import DesktopCategory from "./DesktopCategory";

const ShopCategory = () => {
  return (
    <>
      <div className="xl:hidden">
        <MobileCategory />
      </div>
      <div className="hidden xl:block">
        <DesktopCategory />
      </div>
    </>
  );
};

export default ShopCategory;
