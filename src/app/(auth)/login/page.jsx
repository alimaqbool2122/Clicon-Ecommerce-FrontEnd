import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import Login from "@/components/auth/Login";

const page = () => {
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "User Account", href: ROUTES.SIGIN },
          { label: "Sign In", href: ROUTES.SIGIN, active: true },
        ]}
      />
      {/* Sign In */}
      <Login />
    </>
  );
};

export default page;
