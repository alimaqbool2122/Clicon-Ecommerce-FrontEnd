import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import CheckOut from "@/components/checkout/CheckOut";

const page = () => {
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "Shopping Card", href: ROUTES.SHOPING_CARD },
          { label: "Checkout", href: ROUTES.CHECK_OUT, active: true },
        ]}
      />
      {/* Check Out */}
      <CheckOut />
    </>
  );
};

export default page;
