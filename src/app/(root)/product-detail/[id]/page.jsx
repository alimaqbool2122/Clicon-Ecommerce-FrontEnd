import Breadcrumb from "@/components/common/Breadcrumb";
import React from "react";
import { assets } from "../../../../constants/assets";
import ROUTES from "../../../../constants/routes";
import ProductDetails from "@/components/product-details/ProductDetails";
import ProductShowCase from "@/components/home/ProductShowCase";
import ProductTabs from "@/components/product-details/ProductTabs";

const page = () => {
  return (
    <>
      <div>
        {/* Top Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", icon: assets.House, href: ROUTES.HOME },
            { label: "Shop", href: ROUTES.SHOP },
            { label: "Shop Grid", href: ROUTES.SHOP },
            { label: "Electronics Devices", href: "#" },
            { label: "Macbook Pro", href: "#", active: true },
          ]}
        />
        {/* Product Detail */}
        <ProductDetails />
        {/* Product Tabs */}
        <ProductTabs />
        {/* Showcase Product */}
        <ProductShowCase />
      </div>
    </>
  );
};

export default page;
