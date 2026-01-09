import Breadcrumb from "@/components/shop/Breadcrumb";
import React from "react";
import { assets } from "../../../../../constants/assets";
import ROUTES from "../../../../../constants/routes";
import ProductDetails from "@/components/product-details/ProductDetails";

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
      </div>
    </>
  );
};

export default page;
