import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import ShopingCard from "@/components/shoping-card/ShopingCard";

const page = () => {
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "Shoping Card", href: ROUTES.SHOPING_CARD, active: true },
        ]}
      />
      {/* Shoping Card */}
      <ShopingCard />
    </>
  );
};

export default page;
