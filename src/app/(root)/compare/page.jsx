import React from "react";
import Breadcrumb from "@/components/common/Breadcrumb";
import { assets } from "@/constants/assets";
import ROUTES from "@/constants/routes";
import CopmareTable from "@/components/compare/CopmareTable";

const page = () => {
  return (
    <>
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", icon: assets.House, href: ROUTES.HOME },
          { label: "Compare", href: ROUTES.COMPARE, active: true },
        ]}
      />
      {/* Compare */}
      <CopmareTable />
    </>
  );
};

export default page;
