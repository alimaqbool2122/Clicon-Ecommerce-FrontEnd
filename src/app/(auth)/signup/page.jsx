import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import Register from "@/components/auth/Register";

const page = () => {
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "User Account", href: ROUTES.SIGIN },
          { label: "Sign Up", href: ROUTES.SIGNUP, active: true },
        ]}
      />
      {/* Register Form */}
      <Register />
    </>
  );
};

export default page;
