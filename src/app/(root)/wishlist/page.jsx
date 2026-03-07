import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import WishListTable from "@/components/wishlist/WishListTable";

const page = () => {
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "Wishlist", href: ROUTES.WISHLIST, active: true },
        ]}
      />
      {/* Wishlist */}
      <WishListTable />
    </>
  );
};

export default page;
