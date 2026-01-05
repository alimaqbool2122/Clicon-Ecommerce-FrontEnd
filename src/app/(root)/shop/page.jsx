"use client";
import React from "react";
import Link from "next/link";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { assets } from "../../../../constants/assets";
import ROUTES from "../../../../constants/routes";
import ShopCategory from "@/components/shop/ShopCategory";
import ShopProducts from "@/components/shop/ShopProducts";
import { ShopFilterProvider } from "@/contexts/ShopFilterContext";

const page = () => {
  return (
    <>
      <ShopFilterProvider>
        <div>
          {/* Top Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Home", icon: assets.House, href: ROUTES.HOME },
              { label: "Shop", href: ROUTES.SHOP },
              { label: "Shop Grid", href: ROUTES.SHOP },
              { label: "Electronics Devices", href: "#", active: true },
            ]}
          />
          {/* Main Content */}
          <div className="pt-10">
            <div className="container">
              <div className="grid grid-cols-12 gap-6">
                {/* Shop Category */}
                <div className="col-span-12 xl:col-span-3">
                  <ShopCategory />
                </div>

                {/* Shop product */}
                <div className="col-span-12 xl:col-span-9">
                  <ShopProducts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShopFilterProvider>
    </>
  );
};

export default page;
